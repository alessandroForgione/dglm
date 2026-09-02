import Link from "next/link";
import { site } from "@/content/site";
import { products, featuredProducts } from "@/content/products";
import { getDb, countPreorders } from "@/lib/db";
import { daysUntil } from "@/lib/drop";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { ProductCard } from "@/components/ProductCard";
import { ButtonLink, Arrow } from "@/components/Button";

export const dynamic = "force-dynamic";

export default function Home() {
  const count = countPreorders(getDb());
  const featured = featuredProducts();
  const dropDate = new Date(site.drop.date).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
  const daysToDrop = daysUntil(site.drop.date);

  return (
    <>
      <Hero count={count} />

      <Marquee items={site.marquee} />

      {/* Drop 01: mosaico dei pezzi in evidenza, la prima tile è 2×2 */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-8 py-12 md:py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="display text-[clamp(2.5rem,6vw,5.5rem)]">{site.drop.name}</h2>
          <Link href="/collezione" className="hidden sm:inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] hover:text-acido">
            Tutta la collezione <Arrow />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-l border-line">
          {featured.map((p, i) => (
            <ProductCard
              key={p.slug}
              product={p}
              priority={i < 2}
              size={i === 0 ? "lg" : "sm"}
              sizes={i === 0 ? "(min-width: 1600px) 800px, 50vw" : "(min-width: 1600px) 400px, (min-width: 768px) 25vw, 50vw"}
              className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}
            />
          ))}
          <Link
            href="/collezione"
            className="col-span-2 md:col-span-1 flex flex-col justify-between gap-10 bg-cemento border-r border-b border-line p-5 transition-colors hover:bg-grafite"
          >
            <span className="eyebrow">{String(products.length).padStart(2, "0")} capi</span>
            <span className="display text-[40px] leading-none">
              Tutta la
              <br />
              collezione
            </span>
          </Link>
        </div>
      </section>

      {/* Manifesto: tre affermazioni, una sotto l'altra */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-8 py-16 md:py-20">
        <ol className="border-y border-line divide-y divide-line">
          {site.manifesto.map((m) => (
            <li key={m.big} className="grid gap-4 py-6 md:py-8 md:grid-cols-12 md:items-baseline">
              <h2 className="display md:col-span-7 text-[clamp(2.5rem,7vw,7rem)]">{m.big}</h2>
              <p className="md:col-span-4 md:col-start-9 text-calce/75 text-[17px] leading-relaxed max-w-sm">{m.small}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Pre-order: il prossimo numero e i giorni che mancano */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-8 pb-4">
        <div className="border border-acido p-6 md:p-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow mb-4 text-acido">Pre-order aperto</p>
            <h2 className="display text-[clamp(3rem,9vw,8rem)]">
              Prendi il tuo
              <br />
              numero.
            </h2>
            <p className="mt-6 max-w-lg text-calce/75 text-[17px]">
              Lascia nome, email e telefono. Ogni pre-order riceve un numero progressivo: chi è in lista accede al drop prima di tutti.
            </p>
          </div>
          <div className="md:col-span-5 grid grid-cols-2 gap-6 md:justify-items-end">
            <div>
              <p className="font-mono text-[56px] md:text-[64px] leading-none text-acido tabular-nums">{String(count + 1).padStart(4, "0")}</p>
              <p className="eyebrow mt-2">il prossimo numero è il tuo</p>
            </div>
            <div className="md:text-right">
              <p className="font-mono text-[56px] md:text-[64px] leading-none text-ruggine tabular-nums">{String(daysToDrop).padStart(2, "0")}</p>
              <p className="eyebrow mt-2">giorni al drop — {dropDate}</p>
            </div>
            <ButtonLink href="/preorder" className="col-span-2 md:justify-self-end">
              Pre-ordina ora <Arrow />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
