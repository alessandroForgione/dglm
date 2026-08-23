import type { Metadata } from "next";
import { getDb, listPreorders } from "@/lib/db";
import { PreorderTable } from "./PreorderTable";

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
          <a
            href="/api/admin/export"
            className="inline-flex items-center h-10 px-4 border border-inchiostro bg-inchiostro text-carta font-mono text-[12px] uppercase tracking-[0.16em] hover:bg-carta hover:text-inchiostro"
          >
            Esporta CSV
          </a>
          <form action="/api/admin/logout" method="post">
            <button className="inline-flex items-center h-10 px-4 border border-line font-mono text-[12px] uppercase tracking-[0.16em] hover:border-inchiostro">
              Esci
            </button>
          </form>
        </div>
      </div>
      <PreorderTable rows={rows} />
    </section>
  );
}
