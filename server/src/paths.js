import fs from "node:fs";
import path from "node:path";

const serverRoot = path.resolve(import.meta.dirname, "..");

export const dataDir = path.resolve(
  serverRoot,
  process.env.DATA_DIR || "data",
);

export const uploadsDir = path.join(dataDir, "uploads");

export function ensureDataDirs() {
  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(uploadsDir, { recursive: true });
}
