import Link from "next/link";
import { site } from "@/content/site";
import { featuredProducts } from "@/content/products";
import { getDb, countPreorders } from "@/lib/db";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { ButtonLink, Arrow } from "@/components/Button";

export const dynamic = "force-dynamic";

export default function Home() {
  const count = countPreorders(getDb());
  const featured = featuredProducts();
  const dropDate = new Date(site.drop.date).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <>
      <Hero count={count} />

      <Marquee items={site.marquee} />

      {/* Manifesto: tre affermazioni, una sotto l'altra */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-8 py-24 md:py-36">
        <p className="eyebrow mb-10">Manifesto</p>
        <ol className="divide-y divide-line border-y border-line">
          {site.manifesto.map((m, i) => (
            <li key={m.big}>
              <Reveal delay={i * 0.05} className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline">
                <h2 className="display md:col-span-7 text-[clamp(3rem,9vw,9rem)]">{m.big}</h2>
                <p className="md:col-span-4 md:col-start-9 text-calce/75 text-[17px] leading-relaxed max-w-sm">{m.small}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-8 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="eyebrow mb-2">{site.drop.name} · In evidenza</p>
            <h2 className="display text-[clamp(2.5rem,6vw,5.5rem)]">Pezzi scelti</h2>
          </div>
          <Link href="/collezione" className="hidden sm:inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] hover:text-acido">
            Tutta la collezione <Arrow />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className={i % 2 === 1 ? "lg:mt-12" : ""}>
              <ProductCard product={p} priority={i < 2} />
            </Reveal>
          ))}
        </div>
        <div className="mt-6 sm:hidden">
          <ButtonLink href="/collezione" variant="ghost" className="w-full">
            Tutta la collezione
          </ButtonLink>
        </div>
      </section>

      {/* Pre-order band */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-8">
        <Reveal className="border border-acido p-6 md:p-12 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow mb-4 text-acido">Pre-order aperto · drop il {dropDate}</p>
            <h2 className="display text-[clamp(3rem,10vw,10rem)]">
              Prendi il tuo
              <br />
              numero.
            </h2>
            <p className="mt-6 max-w-lg text-calce/75 text-[17px]">
              Lascia nome, email e telefono. Ogni pre-order riceve un numero progressivo: chi è in lista accede al drop prima di tutti.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col items-start md:items-end gap-4">
            <p className="font-mono text-[64px] leading-none text-acido tabular-nums">{String(count + 1).padStart(4, "0")}</p>
            <p className="eyebrow -mt-2">il prossimo numero è il tuo</p>
            <ButtonLink href="/preorder" className="mt-2">
              Pre-ordina ora <Arrow />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
