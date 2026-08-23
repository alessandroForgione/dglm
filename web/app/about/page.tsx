import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/Reveal";
import { ButtonLink, Arrow } from "@/components/Button";

export const metadata: Metadata = { title: "About", description: site.about.headline };

export default function AboutPage() {
  const a = site.about;
  return (
    <section className="mx-auto max-w-[1600px] px-5 md:px-8 pt-[calc(var(--nav-h)+40px)] pb-16">
      <p className="eyebrow mb-3">About · {site.contact.city}</p>
      <h1 className="display text-[clamp(3rem,10vw,11rem)] max-w-[12ch]">{a.headline}</h1>

      <div className="mt-16 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-7 relative aspect-[16/10] border border-line bg-gesso">
          <Image src="/images/about-atelier.svg" alt="L'atelier DGLM" fill priority sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
        </Reveal>
        <div className="lg:col-span-4 lg:col-start-9 space-y-6 text-[17px] leading-relaxed text-inchiostro/85">
          {a.paragraphs.map((t) => (
            <Reveal key={t.slice(0, 24)}>
              <p>{t}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Valori, impaginati come un'etichetta di composizione */}
      <Reveal className="mt-24 border border-line">
        <div className="px-5 py-3 border-b border-line eyebrow">Etichetta · composizione del brand</div>
        <dl className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-line">
          {a.values.map((v) => (
            <div key={v.title} className="p-6">
              <dt className="display text-[44px] leading-none">{v.title}</dt>
              <dd className="mt-3 text-inchiostro/75">{v.text}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Timeline: qui l'ordine conta davvero */}
      <div className="mt-24 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="eyebrow mb-3">Cronologia</p>
          <h2 className="display text-[clamp(2.5rem,6vw,5rem)]">Da zero al drop</h2>
        </div>
        <ol className="lg:col-span-8 border-t border-line">
          {a.timeline.map((t) => (
            <li key={t.when} className="grid grid-cols-[120px_1fr] gap-6 py-5 border-b border-line">
              <span className="font-mono text-[13px] text-inchiostro tabular-nums">{t.when}</span>
              <span className="text-inchiostro/85">{t.what}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-24 flex flex-wrap items-center gap-4">
        <ButtonLink href="/preorder">
          Entra in lista <Arrow />
        </ButtonLink>
        <ButtonLink href="/collezione" variant="ghost">Vedi la collezione</ButtonLink>
      </div>
    </section>
  );
}
