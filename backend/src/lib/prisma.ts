import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { PrismaClient } from "../generated/prisma/client";

// prisma.config.ts doesn't inject the adapter at runtime for us, so we construct
// PrismaClient with the SQLite adapter explicitly.
export const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL as string,
  }),
});

