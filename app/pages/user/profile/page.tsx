import GetUser from "@/lib/data/user";

export default async function Profile() {
  const data = await GetUser(123);

  if (!data) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>ID: {data.id}</p>
      <p>Name: {data.name}</p>
      {/* 如果将来有更多字段，也在这里显式挑选 */}
    </div>
  );
}
