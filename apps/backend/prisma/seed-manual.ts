import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DB_AUTH_TOKEN,
});

async function main() {
  await client.execute({
    sql: `INSERT OR IGNORE INTO "User" (id, email, name) VALUES 
      (1, 'leo@example.com', 'Leo Tobing'),
      (2, 'john@example.com', 'John Doe'),
      (3, 'jane@example.com', 'Jane Smith')
    `,
    args: []
  });
  
  console.log("✅ Seed completed successfully!");
}

main().finally(() => client.close());
