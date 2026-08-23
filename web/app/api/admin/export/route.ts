import { NextResponse, type NextRequest } from "next/server";
import { getDb, listPreorders, toCsv } from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  if (!(await verifySessionToken(req.cookies.get(SESSION_COOKIE)?.value))) {
    return NextResponse.json({ ok: false, error: "Non autorizzato" }, { status: 401 });
  }
  const csv = toCsv(listPreorders(getDb()));
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="dglm-preorders-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
