"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { products, tags, type ProductTag } from "@/content/products";
import { ProductCard } from "./ProductCard";

const bigSizes = "(min-width: 1280px) 50vw, (min-width: 1024px) 66vw, 100vw";

/**
 * Griglia a contatto (bordi 1px condivisi). Con più di 4 capi ogni quinta tile è 2×2;
 * l'ultima cella è un invito al pre-order, così la griglia non lascia buchi.
 */
export function CollectionGrid() {
  const [active, setActive] = useState<ProductTag | "Tutti">("Tutti");
  const list = active === "Tutti" ? products : products.filter((p) => p.tag === active);
  const mosaic = list.length > 4;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filtra per categoria">
        {(["Tutti", ...tags] as const).map((t) => {
          const n = t === "Tutti" ? products.length : products.filter((p) => p.tag === t).length;
          const on = t === active;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(t)}
              className={clsx(
                "font-mono text-[12px] uppercase tracking-[0.18em] h-10 px-4 border transition-colors",
                on ? "bg-acido text-asfalto border-acido" : "border-line text-calce/80 hover:border-acido hover:text-acido",
              )}
            >
              {t} <span className={clsx("ml-1", on ? "text-asfalto/60" : "text-fumo")}>{n}</span>
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row-dense border-t border-l border-line">
        {list.map((p, i) => {
          const big = mosaic && i % 5 === 0;
          return (
            <ProductCard
              key={p.slug}
              product={p}
              priority={i < 4}
              size={big ? "lg" : "sm"}
              sizes={big ? bigSizes : undefined}
              className={big ? "md:col-span-2 md:row-span-2" : ""}
            />
          );
        })}
        {mosaic && (
          <Link
            href="/preorder"
            className="col-span-2 lg:col-span-1 xl:col-span-2 flex flex-col justify-between gap-10 bg-cemento border-r border-b border-line p-5 transition-colors hover:bg-grafite"
          >
            <span className="eyebrow text-acido">Pre-order aperto</span>
            <span className="display text-[40px] leading-none">
              Prendi il tuo
              <br />
              numero
            </span>
          </Link>
        )}
      </div>
      {list.length === 0 && <p className="mt-6 text-fumo">Nessun capo in questa categoria, per ora.</p>}
    </>
  );
}
