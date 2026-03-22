import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";
import { UsersMod } from "../db/schema";

export default async function GetUserByID(id: number): Promise<UsersMod[] | null> {
  return await db.select().from(users).where(eq(users.id, id));
}
