import type { Metadata } from "next";
import { site } from "@/content/site";
import { products } from "@/content/products";
import { CollectionGrid } from "@/components/CollectionGrid";

export const metadata: Metadata = {
  title: "Collezione",
  description: `${site.drop.name} — ${products.length} capi in pre-order. ${site.description}`,
};

export default function CollezionePage() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 md:px-8 pt-[calc(var(--nav-h)+40px)] pb-16">
      <div className="grid gap-6 md:grid-cols-12 md:items-end mb-12">
        <div className="md:col-span-8">
          <p className="eyebrow mb-3">{site.drop.name} · {site.drop.label}</p>
          <h1 className="display text-[clamp(3.5rem,12vw,12rem)]">Collezione</h1>
        </div>
        <p className="md:col-span-4 text-inchiostro/75 max-w-sm md:justify-self-end">
          {products.length} capi, tirature chiuse. Tutti i pezzi sono in pre-order fino al drop: chi è in lista accede per primo.
        </p>
      </div>
      <CollectionGrid />
    </section>
  );
}
