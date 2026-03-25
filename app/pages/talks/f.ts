"use server";

import Auth from "@/app/auth/auth";
import { db } from "@/lib/db";
import { talks, TalksMod } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function getTalksByUserId(token: string): Promise<TalksMod[]> {
  const user = await Auth(token); // ⚠️ Auth 是 async，要 await

  const list = await db.select().from(talks).where(eq(talks.userId, user.id)); // ⚠️ 是 user.id，不是 userId

  return list;
}

export async function getTalkByID(
  token: string,
  id: number,
): Promise<TalksMod> {
  const user = await Auth(token); // 注意await

  const list = await db // 注意await
    .select()
    .from(talks)
    .where(
      and(
        // ⚠️ 两个 where 要用 and() 包起来
        eq(talks.id, id),
        eq(talks.userId, user.id),
      ),
    );

  if (!list || list.length === 0) throw "不存在";

  return list[0];
}
