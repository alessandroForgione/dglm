import { NextResponse, type NextRequest } from "next/server";
import { preorderSchema, fieldErrors } from "@/lib/validation";
import { getDb, insertPreorder, findPreorderIdByEmail } from "@/lib/db";
import { notifyBrand, confirmUser } from "@/lib/email";
import { preorderLimiter } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Richiesta non valida" }, { status: 400 });
  }

  const parsed = preorderSchema.safeParse(body);
  if (!parsed.success) {
    const errors = fieldErrors(parsed.error);
    // honeypot compilato: rispondi ok senza salvare (i bot non devono capire)
    if (errors.website && Object.keys(errors).length === 1) {
      return NextResponse.json({ ok: true, status: "created" }, { status: 201 });
    }
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const ip = clientIp(req);
  if (!preorderLimiter.hit(ip)) {
    return NextResponse.json({ ok: false, error: "Troppe richieste, riprova tra qualche minuto" }, { status: 429 });
  }

  const { firstName, lastName, email, phone, consent } = parsed.data;
  try {
    const result = insertPreorder(getDb(), {
      firstName,
      lastName,
      email,
      phone,
      consent,
      ip,
      userAgent: req.headers.get("user-agent"),
    });

    if (result.status === "duplicate") {
      const number = findPreorderIdByEmail(getDb(), email);
      return NextResponse.json({ ok: true, status: "duplicate", number }, { status: 200 });
    }

    const mails = await Promise.allSettled([
      notifyBrand({ firstName, lastName, email, phone }),
      confirmUser({ firstName, lastName, email, phone }),
    ]);
    for (const m of mails) if (m.status === "rejected") console.error("[preorder] email error:", m.reason);

    return NextResponse.json({ ok: true, status: "created", number: result.id }, { status: 201 });
  } catch (e) {
    console.error("[preorder] error:", e);
    return NextResponse.json({ ok: false, error: "Errore interno, riprova più tardi" }, { status: 500 });
  }
}
