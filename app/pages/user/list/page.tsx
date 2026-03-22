// app/page.tsx
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export default async function Home() {
  // 插入一条测试数据（只跑一次，后面可以删）
  // await db.insert(users).values({ name: 'jc', email: 'jc@example.com' });

  const allUsers = await db.select().from(users);

  return (
    <div className="p-8">
      <h1>Hello Drizzle</h1>
      <pre>{JSON.stringify(allUsers, null, 2)}</pre>
    </div>
  );
}
