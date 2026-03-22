import GetUserByID from "@/lib/data/user";

export default async function Profile() {
  const data = await GetUserByID(10);

  if (!data || data.length === 0) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>ID: {data[0].id}</p>
      <p>Name: {data[0].username}</p>
      {/* 如果将来有更多字段，也在这里显式挑选 */}
    </div>
  );
}
