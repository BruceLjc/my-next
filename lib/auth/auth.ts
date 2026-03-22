import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

/** 用 id 生成 token */
export async function signToken(id: number): Promise<string> {
  return new SignJWT({ id })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

/** 解密 token，返回 id */
export async function verifyToken(token: string): Promise<number> {
  const { payload } = await jwtVerify(token, SECRET);
  return payload.id as number;
}

/** 加密密码，不可逆 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/** 验证密码是否匹配 */
export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

const KEY = "Authentication";
// 把 token 放进浏览器
export function setToken(token: string): void {
  localStorage.setItem(KEY, token);
}

// 从浏览器取出 token
export function getToken(): string | null {
  return localStorage.getItem(KEY);
}
