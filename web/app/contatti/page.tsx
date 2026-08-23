import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contatti", description: `Scrivi a ${site.name}: email, Instagram, TikTok.` };

const rows = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}` },
  { label: "Instagram", value: site.contact.instagram.replace(/^https?:\/\/(www\.)?/, ""), href: site.contact.instagram },
  { label: "TikTok", value: site.contact.tiktok.replace(/^https?:\/\/(www\.)?/, ""), href: site.contact.tiktok },
  { label: "Dove", value: site.contact.city },
];

export default function ContattiPage() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 md:px-8 pt-[calc(var(--nav-h)+40px)] pb-16">
      <p className="eyebrow mb-3">Contatti</p>
      <h1 className="display text-[clamp(3.5rem,12vw,12rem)]">Scrivici.</h1>
      <p className="mt-6 max-w-lg text-[17px] text-inchiostro/80">
        Per collaborazioni, stampa, negozi o semplicemente per dirci qualcosa. Rispondiamo noi, non un bot.
      </p>

      <dl className="mt-14 border-t border-line max-w-3xl">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[110px_1fr] sm:grid-cols-[160px_1fr] items-baseline gap-4 py-6 border-b border-line">
            <dt className="eyebrow">{r.label}</dt>
            <dd className="display text-[clamp(1.75rem,5vw,3.5rem)] leading-none break-all">
              {r.href ? (
                <a href={r.href} target={r.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="hover:underline underline-offset-4 transition-colors">
                  {r.value}
                </a>
              ) : (
                r.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
