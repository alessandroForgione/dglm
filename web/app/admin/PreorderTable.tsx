"use client";

import { useMemo, useState } from "react";
import type { PreorderRow } from "@/lib/db";

export function PreorderTable({ rows }: { rows: PreorderRow[] }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return rows;
    return rows.filter((r) => `${r.firstName} ${r.lastName} ${r.email} ${r.phone}`.toLowerCase().includes(s));
  }, [rows, q]);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString("it-IT", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <input
        type="search"
        placeholder="Cerca nome, email, telefono…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mb-4 w-full max-w-md bg-transparent border border-line px-3 h-11 text-calce focus:border-acido focus:outline-none"
        aria-label="Cerca"
      />
      {list.length === 0 ? (
        <p className="border border-line p-8 text-fumo">
          {rows.length === 0 ? "Nessun pre-order ancora. Il primo arriverà dalla pagina /preorder." : "Nessun risultato per la ricerca."}
        </p>
      ) : (
        <div className="overflow-x-auto border border-line">
          <table className="w-full text-[14px]">
            <thead className="bg-cemento">
              <tr className="text-left">
                {["N°", "Data", "Nome", "Cognome", "Email", "Telefono"].map((h) => (
                  <th key={h} className="eyebrow font-normal px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.map((r) => (
                <tr key={r.id} className="hover:bg-cemento/60">
                  <td className="px-4 py-3 font-mono text-calce tabular-nums">{String(r.id).padStart(4, "0")}</td>
                  <td className="px-4 py-3 font-mono tabular-nums whitespace-nowrap text-calce/70">{fmt(r.createdAt)}</td>
                  <td className="px-4 py-3">{r.firstName}</td>
                  <td className="px-4 py-3">{r.lastName}</td>
                  <td className="px-4 py-3"><a className="hover:text-acido" href={`mailto:${r.email}`}>{r.email}</a></td>
                  <td className="px-4 py-3 font-mono"><a className="hover:text-acido" href={`tel:${r.phone}`}>{r.phone}</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
