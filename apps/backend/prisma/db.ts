import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import { PrismaClient } from "@prisma/client";

// Use LibSQL client for both Turso and local SQLite
const libsqlClient = createClient({
  url: process.env.DATABASE_URL!,
  authToken: process.env.DB_AUTH_TOKEN,
});

const adapter = new PrismaLibSql(libsqlClient);

export const prisma = new PrismaClient({ adapter });
