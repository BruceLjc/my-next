"use server";

import { comparePassword, signToken } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function loginServer(
  uniq_name: string,
  password: string,
): Promise<string> {
  // 查数据库
  const data = await db
    .select()
    .from(users)
    .where(eq(users.uniq_name, uniq_name))
    .limit(1);
  if (!data || data.length === 0) {
    throw "查无此人";
  }
  // 比对账密
  if (!comparePassword(password, data[0].password)) {
    throw "密码错误";
  }

  // 生成 token
  const token = await signToken(data[0].id);
  return token;
}
