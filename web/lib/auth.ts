import { createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "dglm_admin";
const DEFAULT_TTL_SEC = 60 * 60 * 24 * 7; // 7 giorni

function secret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s || s.length < 16) throw new Error("SESSION_SECRET mancante o troppo corto (min 16 caratteri)");
  return s;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

/** Crea un token firmato "exp.sig". ttlSec negativo = già scaduto (test). */
export async function createSessionToken(ttlSec = DEFAULT_TTL_SEC): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + ttlSec;
  const payload = String(exp);
  return `${payload}.${sign(payload)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const i = token.lastIndexOf(".");
  if (i <= 0) return false;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  const exp = Number(payload);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) return false;
  let expected: string;
  try {
    expected = sign(payload);
  } catch {
    return false;
  }
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "";
  if (!expected || !input) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const sessionCookieOptions = (maxAge = DEFAULT_TTL_SEC) => ({
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge,
});
