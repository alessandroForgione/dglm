"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Logo } from "./Logo";
import { ButtonLink } from "./Button";

const links = [
  { href: "/collezione", label: "Collezione" },
  { href: "/about", label: "About" },
  { href: "/contatti", label: "Contatti" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.dispatchEvent(new Event("scroll"));
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 h-[var(--nav-h)] border-b transition-colors duration-300",
        scrolled || open ? "bg-asfalto/85 backdrop-blur-md border-line" : "bg-transparent border-transparent",
      )}
    >
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between px-5 md:px-8">
        <Logo size="sm" />

        <nav className="hidden md:flex items-center gap-8" aria-label="Principale">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={clsx(
                "font-mono text-[12px] uppercase tracking-[0.18em] transition-colors hover:text-acido",
                pathname === l.href ? "text-acido" : "text-calce/80",
              )}
            >
              {l.label}
            </Link>
          ))}
          <ButtonLink href="/preorder" className="h-10">
            Pre-order
          </ButtonLink>
        </nav>

        <button
          type="button"
          className="md:hidden font-mono text-[12px] uppercase tracking-[0.18em] h-10 px-3 border border-calce/30"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Chiudi" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={clsx(
          "md:hidden fixed inset-x-0 top-[var(--nav-h)] bottom-0 bg-asfalto transition-opacity duration-200",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <nav className="flex h-full flex-col justify-between px-5 pb-8 pt-6" aria-label="Mobile">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <Link href={l.href} onClick={() => setOpen(false)} className="display block py-4 text-[56px] hover:text-acido">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/preorder" onClick={() => setOpen(false)} className="w-full h-14 text-[13px]">
            Pre-ordina ora
          </ButtonLink>
        </nav>
      </div>
    </header>
  );
}
