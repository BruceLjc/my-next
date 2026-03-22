import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

console.log("DATABASE_URL from env:", process.env.DATABASE_URL); // ← 加这行！！

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

export const db = drizzle(pool, { schema, logger: true });
