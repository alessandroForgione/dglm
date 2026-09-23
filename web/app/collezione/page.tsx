import type { Metadata } from "next";
import { site } from "@/content/site";
import { products } from "@/content/products";
import { CollectionGrid } from "@/components/CollectionGrid";

export const metadata: Metadata = {
  title: "Catalogo",
  description: `${site.drop.name} — ${products.length} capi in pre-order. ${site.description}`,
};

export default function CollezionePage() {
  return (
    <section className="px-5 md:px-10 pt-6 md:pt-10 pb-16 md:pb-24">
      <h1 className="display text-[32px] md:text-[40px] mb-6">Catalogo</h1>
      <CollectionGrid />
    </section>
  );
}
