import crypto from "node:crypto";
import path from "node:path";
import multer from "multer";
import sharp from "sharp";
import { uploadsDir } from "./paths.js";

const allowedFormats = new Set(["jpeg", "png", "webp", "avif", "heif"]);

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024,
    files: 1,
  },
  fileFilter(req, file, callback) {
    if (!file.mimetype.startsWith("image/")) {
      const error = new Error("Only image files are allowed.");
      error.status = 415;
      callback(error);
      return;
    }
    callback(null, true);
  },
});

export async function handleUpload(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: "Choose an image to upload." });
  }

  try {
    const image = sharp(req.file.buffer, { failOn: "error" });
    const metadata = await image.metadata();

    if (!metadata.format || !allowedFormats.has(metadata.format)) {
      return res.status(415).json({
        error: "Use a JPG, PNG, WebP, AVIF, or HEIC image.",
      });
    }

    const filename = `${crypto.randomUUID()}.webp`;
    const destination = path.join(uploadsDir, filename);

    await image
      .rotate()
      .resize({
        width: 2600,
        height: 2600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 84 })
      .toFile(destination);

    return res.status(201).json({
      url: `/uploads/${filename}`,
      width: metadata.width ?? null,
      height: metadata.height ?? null,
    });
  } catch (error) {
    console.error("Image upload failed.", error);
    return res.status(415).json({
      error: "That image could not be read. Try a JPG or PNG.",
    });
  }
}
