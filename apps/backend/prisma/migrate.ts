import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";

// Use LibSQL client directly for migrations
const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DB_AUTH_TOKEN,
});

const sql = readFileSync(join(__dirname, "../baseline.sql"), "utf-8");

const statements = sql
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

for (const statement of statements) {
  await client.execute(statement);
  console.log("Executed:", statement.substring(0, 50) + "...");
}

console.log("Migration completed successfully!");
