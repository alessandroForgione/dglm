"use client";

import { useState } from "react";
import clsx from "clsx";
import { products, tags, type ProductTag } from "@/content/products";
import { ProductGrid } from "./ProductCard";

export function CollectionGrid() {
  const [active, setActive] = useState<ProductTag | "Tutti">("Tutti");
  const list = active === "Tutti" ? products : products.filter((p) => p.tag === active);

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filtra per categoria">
        {(["Tutti", ...tags] as const).map((t) => {
          const on = t === active;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={on}
              onClick={() => setActive(t)}
              className={clsx(
                "h-10 px-4 rounded-xl border text-[14px] transition-colors",
                on ? "bg-calce text-asfalto border-calce" : "border-line hover:border-calce/50",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
      <ProductGrid products={list} />
      {list.length === 0 && <p className="mt-6 text-fumo">Nessun capo in questa categoria, per ora.</p>}
    </>
  );
}
