"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { BagIcon, CloseIcon, InstagramIcon, MenuIcon } from "./Icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/collezione", label: "Catalogo" },
  { href: "/about", label: "About" },
  { href: "/contatti", label: "Contatti" },
] as const;

/**
 * Header a tre colonne: menu a sinistra, logo al centro, icone a destra.
 * In home è trasparente e sta sopra l'hero; nelle altre pagine è nero e nel flusso.
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const overHero = pathname === "/";

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className={clsx("z-40 inset-x-0", overHero ? "absolute top-10 bg-transparent" : "relative bg-asfalto")}>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[72px] md:h-[104px] px-5 md:px-10">
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="md:hidden -ml-1 p-1"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
          <nav className="hidden md:flex items-center gap-5" aria-label="Principale">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={clsx("text-[15px] transition-opacity hover:opacity-100", pathname === l.href ? "opacity-100" : "opacity-80")}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <Logo />

        <div className="flex items-center justify-end gap-4">
          <a href={site.contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hidden sm:block p-1 opacity-90 hover:opacity-100">
            <InstagramIcon />
          </a>
          <Link href="/preorder" aria-label="Pre-order" className="p-1 opacity-90 hover:opacity-100">
            <BagIcon />
          </Link>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={clsx(
          "md:hidden fixed inset-x-0 top-0 bottom-0 z-50 bg-asfalto transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-[72px] items-center px-5">
          <button type="button" className="-ml-1 p-1" aria-label="Chiudi menu" onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>
        <nav className="px-5 pt-4" aria-label="Mobile">
          <ul className="flex flex-col gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-[24px] font-medium">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/preorder" onClick={() => setOpen(false)} className="block py-3 text-[24px] font-medium">
                Pre-order
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
