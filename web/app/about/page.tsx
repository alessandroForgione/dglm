import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { ButtonLink, Arrow } from "@/components/Button";

export const metadata: Metadata = { title: "About", description: site.about.headline };

export default function AboutPage() {
  const a = site.about;
  return (
    <section className="px-5 md:px-10 pt-6 md:pt-10 pb-16 md:pb-24">
      <h1 className="display text-[clamp(2rem,5vw,4rem)] max-w-[12ch]">{a.headline}</h1>

      <div className="mt-12 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-cemento">
          <Image
            src="/images/about-atelier.jpg"
            alt="Racla e telaio serigrafico sul banco di stampa"
            fill
            priority
            sizes="(min-width:1024px) 58vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:col-span-4 lg:col-start-9 space-y-6 text-[17px] leading-relaxed text-calce/85">
          {a.paragraphs.map((t) => (
            <p key={t.slice(0, 24)}>{t}</p>
          ))}
        </div>
      </div>

      {/* Valori, impaginati come l'etichetta di composizione cucita nel capo */}
      <div className="mt-16 border border-line">
        <div className="px-6 pt-5 eyebrow">Composizione</div>
        <dl className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line">
          {a.values.map((v) => (
            <div key={v.title} className="p-6">
              <dt className="display text-[28px]">{v.title}</dt>
              <dd className="mt-3 text-calce/75">{v.text}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Timeline: qui l'ordine conta davvero */}
      <div className="mt-16 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display text-[clamp(2rem,5vw,4rem)]">Da zero al drop</h2>
        </div>
        <ol className="lg:col-span-8 divide-y divide-line border-y border-line">
          {a.timeline.map((t) => (
            <li key={t.when} className="grid grid-cols-[120px_1fr] gap-6 py-5">
              <span className="text-[13px] text-acido tabular-nums">{t.when}</span>
              <span className="text-calce/85">{t.what}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-16 flex flex-wrap items-center gap-4">
        <ButtonLink href="/preorder">
          Entra in lista <Arrow />
        </ButtonLink>
        <ButtonLink href="/collezione" variant="ghost">Vedi la collezione</ButtonLink>
      </div>
    </section>
  );
}
