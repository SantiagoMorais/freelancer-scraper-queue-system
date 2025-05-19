// src/storage.ts
import { promises as fs } from "fs";
import path from "path";

const DB_PATH = path.resolve(__dirname, "data", "database.json");

export async function loadDatabase(): Promise<any[]> {
  try {
    const data = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveDatabase(data: any[]) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}
