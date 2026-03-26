import fs from "node:fs/promises";
import path from "node:path";

import bcrypt from "bcryptjs";
import { Database, open } from "sqlite";
import sqlite3 from "sqlite3";

import { env } from "./env";

const dataDirectory = path.resolve(__dirname, "../../data");
const databasePath = path.join(dataDirectory, "app.db");

type SqliteDatabase = Database;

let database: SqliteDatabase | null = null;

async function seedDefaultUser(db: SqliteDatabase): Promise<void> {
  const existingUser = await db.get<{ id: number }>(
    "SELECT id FROM users WHERE email = ?",
    env.defaultUserEmail,
  );

  if (existingUser) {
    return;
  }

  const passwordHash = await bcrypt.hash(env.defaultUserPassword, 10);

  await db.run(
    `
      INSERT INTO users (email, password_hash, name)
      VALUES (?, ?, ?)
    `,
    env.defaultUserEmail,
    passwordHash,
    "Admin",
  );
}

export async function getDatabase(): Promise<SqliteDatabase> {
  if (!database) {
    throw new Error("Database has not been initialized yet.");
  }

  return database;
}

export async function initializeDatabase(): Promise<SqliteDatabase> {
  if (database) {
    return database;
  }

  await fs.mkdir(dataDirectory, { recursive: true });

  database = await open({
    filename: databasePath,
    driver: sqlite3.Database,
  });

  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await seedDefaultUser(database);

  return database;
}

export { databasePath };
