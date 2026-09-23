import Link from "next/link";
import { products } from "@/content/products";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductCard";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="px-5 md:px-10 pt-10 md:pt-12 pb-16 md:pb-24">
        <div className="flex items-baseline justify-between mb-6 md:mb-8">
          <h2 className="display text-[22px] md:text-[24px]">Prodotti</h2>
          <Link href="/collezione" className="text-[14px] underline-offset-4 hover:underline">
            Vedi tutto
          </Link>
        </div>
        <ProductGrid products={products.slice(0, 8)} />
      </section>
    </>
  );
}
