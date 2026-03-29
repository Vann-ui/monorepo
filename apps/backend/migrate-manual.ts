import { createClient } from "@libsql/client";
import { readFileSync } from "fs";
import { join } from "path";

const client = createClient({
  url: "file:./prisma/dev.db",
});

const sql = readFileSync(join(__dirname, "baseline.sql"), "utf-8");

const statements = sql
  .split(";")
  .map((s) => s.trim())
  .filter((s) => s.length > 0);

for (const statement of statements) {
  await client.execute(statement);
  console.log("✓ Executed:", statement.substring(0, 60) + "...");
}

console.log("\n✅ Migration completed successfully!");
