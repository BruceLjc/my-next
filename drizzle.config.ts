// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle", // 迁移文件放这里
  schema: "./lib/db/schema.ts", // 表定义文件（下面会创建）
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true, // 方便看日志
});
