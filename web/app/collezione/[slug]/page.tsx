import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { products, getProduct, formatPrice } from "@/content/products";
import { ButtonLink, Arrow } from "@/components/Button";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/collezione/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.short,
    openGraph: { title: `${p.name} — ${site.name}`, description: p.short, images: [{ url: p.images[0]!.src }] },
  };
}

export default async function ProductPage({ params }: PageProps<"/collezione/[slug]">) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const related = products.filter((x) => x.slug !== p.slug && x.tag === p.tag).slice(0, 3);

  return (
    <article className="mx-auto max-w-[1600px] px-5 md:px-8 pt-[calc(var(--nav-h)+24px)] pb-16">
      <nav className="eyebrow mb-6 flex items-center gap-2" aria-label="Percorso">
        <Link href="/collezione" className="transition-colors hover:text-inchiostro">Collezione</Link>
        <span>/</span>
        <span className="text-inchiostro/70">{p.tag}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Gallery: scroll orizzontale su mobile, griglia su desktop */}
        <div className="lg:col-span-7">
          <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 lg:mx-0 lg:px-0 lg:flex-col lg:overflow-visible">
            {p.images.map((img, i) => (
              <div
                key={img.src}
                className="relative shrink-0 snap-start w-[82vw] sm:w-[60vw] lg:w-full aspect-[4/5] rounded-[var(--radius-lg)] overflow-hidden bg-gesso"
              >
                <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="(min-width:1024px) 55vw, 82vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--nav-h)+24px)] lg:self-start">
          <p className="eyebrow mb-3">{site.drop.name} · {p.color}</p>
          <h1 className="headline text-[clamp(2rem,4.5vw,3.5rem)]">{p.name}</h1>
          <div className="mt-4 flex items-baseline gap-4">
            <p className="font-mono text-[24px] tabular-nums">{formatPrice(p.price)}</p>
            <p className={p.status === "soldout" ? "eyebrow line-through" : "eyebrow"}>
              {p.status === "preorder" ? "Pre-order" : p.status === "soldout" ? "Sold out" : "Disponibile"}
            </p>
          </div>

          <p className="mt-8 text-[17px] leading-relaxed text-inchiostro/85">{p.description}</p>

          <div className="mt-8">
            <p className="eyebrow mb-3">Taglie</p>
            <ul className="flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <li key={s} className="font-mono text-[13px] h-10 min-w-10 px-3 inline-flex items-center justify-center rounded-full bg-gesso">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Scheda tecnica in stile etichetta */}
          <dl className="mt-8 divide-y divide-line">
            {p.details.map((d) => (
              <div key={d} className="py-3 font-mono text-[13px] text-inchiostro/85">
                {d}
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            {p.status === "soldout" ? (
              <ButtonLink href="/preorder" variant="ghost">Avvisami al prossimo drop</ButtonLink>
            ) : (
              <ButtonLink href="/preorder">
                Pre-ordina <Arrow />
              </ButtonLink>
            )}
            <ButtonLink href="/collezione" variant="ghost">Torna alla collezione</ButtonLink>
          </div>
          <p className="mt-4 text-[13px] text-grigio">
            Il pre-order è una lista d&apos;attesa: nessun pagamento ora. Ti contattiamo noi all&apos;apertura del drop.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <p className="eyebrow mb-6">Altri {p.tag}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProductCard key={r.slug} product={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
