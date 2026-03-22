"use server";

import { hashPassword } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";

export async function register(
  uniq_name: string,
  username: string,
  password: string,
) {
  // 加密
  const password2 = await hashPassword(password);

  try {
    // 校验唯一性
    const record = await db
      .select({ count: count() })
      .from(users)
      .where(eq(users.uniq_name, uniq_name))
      .limit(1);

    console.log(record.values.length);

    if (record && record.values.length > 0) {
      throw new Error("用户已存在");
    }

    // 插入
    await db.insert(users).values({
      uniq_name: uniq_name,
      username: uniq_name,
      password: password2,
    });
  } catch (e) {
    throw e;
  }
}
