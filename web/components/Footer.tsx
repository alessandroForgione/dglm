"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-line overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 md:px-8 py-12 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="eyebrow mb-3">{site.drop.name} · {site.drop.label}</p>
          <p className="max-w-sm text-calce/80">{site.description}</p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-3">Naviga</p>
          <ul className="space-y-2 font-mono text-[13px] uppercase tracking-[0.14em]">
            <li><Link className="hover:text-acido" href="/collezione">Collezione</Link></li>
            <li><Link className="hover:text-acido" href="/about">About</Link></li>
            <li><Link className="hover:text-acido" href="/contatti">Contatti</Link></li>
            <li><Link className="hover:text-acido text-acido" href="/preorder">Pre-order →</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <p className="eyebrow mb-3">Social</p>
          <ul className="space-y-2 font-mono text-[13px] uppercase tracking-[0.14em]">
            <li><a className="hover:text-acido" href={site.contact.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a className="hover:text-acido" href={site.contact.tiktok} target="_blank" rel="noreferrer">TikTok</a></li>
            <li><a className="hover:text-acido" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
          </ul>
        </div>
      </div>

      <div className="select-none pointer-events-none px-5 md:px-8 -mb-[0.18em]" aria-hidden>
        <span className="display block text-[32vw] leading-[0.8] text-calce/[0.07]">DGLM</span>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto max-w-[1600px] px-5 md:px-8 py-4 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-fumo">
          <span>© {year} {site.name} · {site.contact.city}</span>
          <span>Made in Italy · Limited run</span>
        </div>
      </div>
    </footer>
  );
}
