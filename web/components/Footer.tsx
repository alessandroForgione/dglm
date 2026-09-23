"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { InstagramIcon } from "./Icons";
import { Arrow } from "./Button";

/**
 * Footer: iscrizione a sinistra, campo email a pillola a destra.
 * Il campo porta al form di pre-order con l'email già compilata.
 */
export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  const year = new Date().getFullYear();
  return (
    <footer className="bg-asfalto px-5 md:px-10 pt-10 md:pt-14 pb-8">
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="display text-[22px] md:text-[26px]">Entra nella lista</h2>
          <p className="mt-2 text-[14px] md:text-[15px] text-calce/85">Accesso anticipato ai drop e novità in esclusiva.</p>
        </div>
        <form action="/preorder" method="get" className="relative">
          <label htmlFor="footer-email" className="sr-only">Email</label>
          <input
            id="footer-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Email"
            className="w-full h-14 rounded-full bg-grafite/80 border border-calce/40 pl-6 pr-14 text-[15px] placeholder:text-calce/60 focus:outline-none focus:border-calce"
          />
          <button type="submit" aria-label="Iscriviti" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 inline-flex items-center justify-center">
            <Arrow />
          </button>
        </form>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 text-[12px] md:text-[13px] text-calce/85">
        <p>© {year} {site.name}, {site.contact.city}</p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
          <Link href="/collezione" className="hover:underline underline-offset-4">Catalogo</Link>
          <Link href="/about" className="hover:underline underline-offset-4">About</Link>
          <Link href="/contatti" className="hover:underline underline-offset-4">Contatti</Link>
          <a href={`mailto:${site.contact.email}`} className="hover:underline underline-offset-4">{site.contact.email}</a>
        </nav>
        <a href={site.contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="opacity-90 hover:opacity-100">
          <InstagramIcon />
        </a>
      </div>
    </footer>
  );
}
