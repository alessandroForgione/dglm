import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { products, getProduct, formatPrice } from "@/content/products";
import { ButtonLink } from "@/components/Button";
import { ProductGrid } from "@/components/ProductCard";

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
  const sameTag = products.filter((x) => x.slug !== p.slug && x.tag === p.tag);
  const related = [...sameTag, ...products.filter((x) => x.slug !== p.slug && x.tag !== p.tag)].slice(0, 4);

  return (
    <article className="px-5 md:px-10 pt-4 md:pt-10 pb-16 md:pb-24">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-14">
        {/* Galleria: scroll orizzontale su mobile, due colonne da desktop */}
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:overflow-visible">
          {p.images.map((img, i) => (
            <div key={img.src} className="relative shrink-0 snap-start w-[85vw] md:w-auto aspect-[4/5] overflow-hidden bg-cemento">
              <Image src={img.src} alt={img.alt} fill priority={i === 0} sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 85vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-10 lg:self-start">
          <h1 className="display text-[28px] md:text-[34px]">{p.name}</h1>
          <p className="mt-4 text-[15px] tabular-nums">{formatPrice(p.price)}</p>

          <hr className="my-8 border-calce" />

          <p className="text-[14px] mb-3">Taglie</p>
          <ul className="grid grid-cols-4 gap-2" aria-label="Taglie disponibili">
            {p.sizes.map((s) => (
              <li key={s} className="h-11 rounded-xl bg-calce text-asfalto text-[14px] inline-flex items-center justify-center">
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            {p.status === "soldout" ? (
              <ButtonLink href="/preorder" variant="ink" className="w-full h-13">Sold out — avvisami</ButtonLink>
            ) : (
              <ButtonLink href="/preorder" className="w-full h-13">Pre-ordina</ButtonLink>
            )}
            <p className="mt-3 text-[13px] text-fumo">
              Il pre-order è una lista d&apos;attesa: nessun pagamento ora. Ti contattiamo all&apos;apertura del drop.
            </p>
          </div>

          <div className="mt-8 space-y-4 text-[14px] leading-relaxed text-calce/85">
            <p>{p.description}</p>
            <ul className="list-disc pl-5 space-y-1">
              {p.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="text-fumo">Colore: {p.color}</p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20 md:mt-28">
          <h2 className="display text-[22px] md:text-[24px] mb-6 md:mb-8">Ti potrebbe piacere</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </article>
  );
}
