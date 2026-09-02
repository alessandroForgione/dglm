import type { Metadata } from "next";
import { getDb, listPreorders } from "@/lib/db";
import { PreorderTable } from "./PreorderTable";
import { Button, ButtonLink } from "@/components/Button";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin · Pre-order", robots: { index: false, follow: false } };

export default function AdminPage() {
  const rows = listPreorders(getDb());
  return (
    <section className="mx-auto max-w-[1400px] px-5 md:px-8 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="display text-[40px] leading-none">DGLM</p>
          <h1 className="eyebrow mt-1">Pre-order · {rows.length} in lista</h1>
        </div>
        <div className="flex gap-2">
          <ButtonLink href="/api/admin/export" className="h-10 px-5">
            Esporta CSV
          </ButtonLink>
          <form action="/api/admin/logout" method="post">
            <Button variant="ghost" className="h-10 px-5">
              Esci
            </Button>
          </form>
        </div>
      </div>
      <PreorderTable rows={rows} />
    </section>
  );
}
