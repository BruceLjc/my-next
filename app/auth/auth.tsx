"use server";

import { verifyToken } from "@/lib/auth/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export interface User {
  //   isAdmin: boolean;
  id: number;
}

export default async function Auth(token: string): Promise<User> {
  // 解密 token 取出 id
  const id = await verifyToken(token);

  // 查数据库
  const data = await db.select().from(users).where(eq(users.id, id)).limit(1);

  if (data.length === 0) {
    throw new Error("用户不存在");
  }

  return {
    id: data[0].id,
  };
}


