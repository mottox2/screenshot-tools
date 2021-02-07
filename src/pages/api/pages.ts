import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  const db = await open({
    filename: "./sqlite.db",
    driver: sqlite3.Database,
  });
  if (method === "GET") {
    await db.run(`CREATE TABLE IF NOT EXISTS tbl (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT
    )`);

    const result = await db.all("SELECT * FROM tbl");
    res.status(200).json({ items: result });
  }

  if (method === "POST") {
    const result = await db.run(
      "INSERT INTO tbl (content) VALUES (?)",
      new Date().toISOString()
    );
    res.status(200).json({ lastID: result.lastID });
  }
};
