import { createClient } from "@libsql/client";

// Create LibSQL client for Turso/SQLite
export const libsql = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DB_AUTH_TOKEN, // Optional for local SQLite
});

// Helper function untuk execute queries
export async function executeQuery<T>(sql: string, params?: any[]): Promise<T> {
  const result = await libsql.execute({ sql, args: params || [] });
  return result.rows as unknown as T;
}
