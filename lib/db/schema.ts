import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  uniq_name: text("uniq_name").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type UsersMod = typeof users.$inferSelect;
