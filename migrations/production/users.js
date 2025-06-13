import fs from "fs";
import { Client } from "pg";

export default async function migrate(client) {
  const sql = fs.readFileSync(
    new URL("./users.sql", import.meta.url),
    "utf8"
  );
  await client.query(sql);
}