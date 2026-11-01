import crypto from "node:crypto";

const TTL_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 15 * 60 * 1000;

const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !process.env.ADMIN_PASSWORD) {
  throw new Error("ADMIN_PASSWORD is required in production.");
}

if (isProduction && !process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET is required in production.");
}

const adminPassword = process.env.ADMIN_PASSWORD || "mandy-admin";
const secret =
  process.env.SESSION_SECRET || crypto.randomBytes(32).toString("hex");

if (!process.env.ADMIN_PASSWORD) {
  console.warn(
    'ADMIN_PASSWORD is not set. Using the development password "mandy-admin".',
  );
}

if (!process.env.SESSION_SECRET) {
  console.warn(
    "SESSION_SECRET is not set. Admin sessions will expire when the server restarts.",
  );
}

const attempts = new Map();

function digest(value) {
  return crypto.createHash("sha256").update(value).digest();
}

function passwordMatches(candidate) {
  const expected = digest(adminPassword);
  const actual = digest(candidate);
  return (
    expected.length === actual.length &&
    crypto.timingSafeEqual(expected, actual)
  );
}

function signature(payload) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

export function createToken() {
  const payload = Buffer.from(
    JSON.stringify({ role: "admin", exp: Date.now() + TTL_MS }),
  ).toString("base64url");
  return `${payload}.${signature(payload)}`;
}

export function verifyToken(token) {
  const [payload, received] = token.split(".");
  if (!payload || !received) return false;

  const expected = signature(payload);
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  if (
    receivedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(receivedBuffer, expectedBuffer)
  ) {
    return false;
  }

  try {
    const data = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    return data.role === "admin" && Number(data.exp) > Date.now();
  } catch {
    return false;
  }
}

function clientKey(req) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function rateState(key) {
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    const next = { count: 0, resetAt: now + WINDOW_MS };
    attempts.set(key, next);
    return next;
  }

  return current;
}

export function login(req, res) {
  const key = clientKey(req);
  const state = rateState(key);

  if (state.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((state.resetAt - Date.now()) / 1000);
    res.set("Retry-After", String(retryAfter));
    return res.status(429).json({
      error: "Too many attempts. Try again later.",
    });
  }

  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!password || !passwordMatches(password)) {
    state.count += 1;
    return res.status(401).json({ error: "Wrong password." });
  }

  attempts.delete(key);
  return res.json({ token: createToken(), expiresIn: TTL_MS });
}

export function requireAdmin(req, res, next) {
  const header = req.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!token || !verifyToken(token)) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  return next();
}
