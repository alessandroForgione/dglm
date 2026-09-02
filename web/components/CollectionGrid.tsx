"use client";

import { useState } from "react";
import clsx from "clsx";
import { products, tags, type ProductTag } from "@/content/products";
import { ProductCard } from "./ProductCard";

export function CollectionGrid() {
  const [active, setActive] = useState<ProductTag | "Tutti">("Tutti");
  const list = active === "Tutti" ? products : products.filter((p) => p.tag === active);

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
                "rounded-full font-sans text-[14px] font-medium h-10 px-4 transition-colors",
                on ? "bg-inchiostro text-carta" : "bg-gesso text-inchiostro/80 hover:bg-cenere hover:text-inchiostro",
              )}
            >
              {t} <span className={clsx("ml-1", on ? "text-carta/60" : "text-grigio")}>{n}</span>
            </button>
          );
        })}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 4} />
        ))}
      </div>
      {list.length === 0 && <p className="text-grigio">Nessun capo in questa categoria, per ora.</p>}
    </>
  );
}
