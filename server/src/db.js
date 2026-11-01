import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { defaultContent, normalizeContent } from "./content.js";
import { dataDir, ensureDataDirs } from "./paths.js";

ensureDataDirs();

const db = new DatabaseSync(path.join(dataDir, "mandy.sqlite"));

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA busy_timeout = 5000;
  CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    json TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

const selectContent = db.prepare(
  "SELECT json, updated_at FROM content WHERE id = 1",
);
const upsertContent = db.prepare(`
  INSERT INTO content (id, json, updated_at)
  VALUES (1, ?, ?)
  ON CONFLICT(id) DO UPDATE SET
    json = excluded.json,
    updated_at = excluded.updated_at
`);

export function readContent() {
  const row = selectContent.get();

  if (!row) {
    return writeContent(defaultContent());
  }

  try {
    return {
      content: normalizeContent(JSON.parse(row.json)),
      updatedAt: row.updated_at,
    };
  } catch (error) {
    console.error("Stored content could not be read. Resetting to defaults.", error);
    return writeContent(defaultContent());
  }
}

export function writeContent(input) {
  const content = normalizeContent(input);
  const updatedAt = new Date().toISOString();
  upsertContent.run(JSON.stringify(content), updatedAt);
  return { content, updatedAt };
}
