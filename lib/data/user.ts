export interface User {
  id: number;
  name: string;
}

export default async function GetUser(id: number): Promise<User | null> {
  console.log(`id:${id}`);

  const user: User = { name: "hello", id: id };

  //   return null;
  return user;
}
