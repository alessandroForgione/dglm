import { NextResponse, type NextRequest } from "next/server";
import { checkPassword, createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { RateLimiter } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";
const limiter = new RateLimiter({ max: 10, windowMs: 15 * 60 * 1000 });

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!limiter.hit(ip)) {
    return NextResponse.json({ ok: false, error: "Troppi tentativi, riprova più tardi" }, { status: 429 });
  }
  const form = await req.formData().catch(() => null);
  const password = String(form?.get("password") ?? "");
  if (!checkPassword(password)) {
    return NextResponse.json({ ok: false, error: "Password errata" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(), sessionCookieOptions(req));
  return res;
}
