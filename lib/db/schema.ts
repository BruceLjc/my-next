import {
  pgTable,
  serial,
  text,
  timestamp,
  bigserial,
  bigint,
  varchar,
  jsonb,
  boolean,
  index,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  uniq_name: text("uniq_name").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export type UsersMod = typeof users.$inferSelect;
export type UsersInsert = typeof users.$inferInsert;

export const talks = pgTable(
  "t_talk",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
    userId: bigint("user_id", { mode: "number" }).notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    contents: jsonb("contents").default([]).notNull(),
    translated: boolean("translated").default(false).notNull(),
  },
  (table) => ({
    deletedAtIdx: index("idx_t_talk_deleted_at").on(table.deletedAt),
    userIdIdx: index("idx_t_talk_user_id").on(table.userId),
  }),
);

export type TalksMod = typeof talks.$inferSelect;
export type TalksInsert = typeof talks.$inferInsert;
