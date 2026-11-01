import os from "node:os";
import express from "express";
import cors from "cors";
import multer from "multer";
import { login, requireAdmin } from "./auth.js";
import { readContent, writeContent } from "./db.js";
import { publicContent } from "./content.js";
import { uploadsDir } from "./paths.js";
import { handleUpload, upload } from "./upload.js";

const app = express();
const port = Number(process.env.PORT || 4000);

app.set("trust proxy", 1);
app.disable("x-powered-by");

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400,
  }),
);

app.use(express.json({ limit: "3mb" }));

app.use(
  "/uploads",
  express.static(uploadsDir, {
    maxAge: "30d",
    immutable: true,
    index: false,
    dotfiles: "deny",
  }),
);

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/content", (req, res) => {
  const { content, updatedAt } = readContent();
  res.json({ ...publicContent(content), updatedAt });
});

app.post("/api/admin/login", login);

app.get("/api/admin/content", requireAdmin, (req, res) => {
  const { content, updatedAt } = readContent();
  res.json({ ...content, updatedAt });
});

app.put("/api/admin/content", requireAdmin, (req, res) => {
  const payload = req.body?.content ?? req.body;
  const { content, updatedAt } = writeContent(payload);
  res.json({ ...content, updatedAt });
});

app.post(
  "/api/admin/upload",
  requireAdmin,
  upload.single("file"),
  handleUpload,
);

app.use("/api", (req, res) => {
  res.status(404).json({ error: "Not found." });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = Number(error.status || error.statusCode || 500);

  if (status >= 500) {
    console.error(error);
  }

  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "Images must be under 15 MB." });
  }

  if (error instanceof multer.MulterError) {
    return res.status(400).json({ error: "Upload one image at a time." });
  }

  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON body." });
  }

  return res.status(status).json({
    error: status >= 500 ? "Server error." : error.message,
  });
});

const server = app.listen(port, "0.0.0.0", () => {
  const interfaces = os.networkInterfaces();
  const lan = Object.values(interfaces)
    .flat()
    .find(
      (entry) =>
        entry && entry.family === "IPv4" && !entry.internal,
    );

  console.log(`Mandy API running at http://localhost:${port}`);
  if (lan) {
    console.log(`On your network: http://${lan.address}:${port}`);
  }
});

function shutdown() {
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5000).unref();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
