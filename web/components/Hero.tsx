"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { ButtonLink, Arrow } from "./Button";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Hero: foto lookbook a tutto schermo, wordmark serigrafato sopra.
 * Un solo momento orchestrato: la foto entra (0–0.9s), il layer lime entra in registro
 * (CSS, da 0.3s), la riga bassa sale (da 0.9s). Il testo visibile sta in uno span
 * "relative" così viene dipinto sopra il layer lime, che resta in screen sulla foto.
 */
export function Hero({ count }: { count: number }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-[calc(var(--nav-h)+24px)] pb-8 px-5 md:px-8 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        aria-hidden
      >
        <Image src="/images/hero-lookbook.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-asfalto via-asfalto/35 to-asfalto/15" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-[1600px] flex items-center justify-between">
        <p className="eyebrow">
          {site.drop.name} — {site.drop.label}
        </p>
        <p className="eyebrow hidden sm:block">{site.contact.city}</p>
      </div>

      <div className="relative w-full flex items-center justify-center py-6" aria-label={site.name}>
        <h1
          className="hero-mark display misprint text-[34vw] md:text-[26vw] leading-[0.8] tracking-[-0.03em] select-none"
          data-text="DGLM"
        >
          <span className="relative">DGLM</span>
        </h1>
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-[1600px] grid gap-6 md:grid-cols-12 md:items-end"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease }}
      >
        <p className="md:col-span-5 text-[22px] md:text-[28px] leading-[1.15] font-medium text-calce max-w-md">
          {site.tagline} Drop limitati, tagli netti, cotone pesante. Il primo drop apre in pre-order.
        </p>
        <div className="md:col-span-4 md:col-start-7 flex flex-wrap items-center gap-3">
          <ButtonLink href="/preorder">
            Pre-ordina ora <Arrow />
          </ButtonLink>
          <ButtonLink href="/collezione" variant="ghost">
            Collezione
          </ButtonLink>
        </div>
        <div className="md:col-span-2 md:text-right">
          <p className="font-mono text-[40px] leading-none text-acido tabular-nums">{String(count).padStart(4, "0")}</p>
          <p className="eyebrow mt-1">già in lista</p>
        </div>
      </motion.div>
    </section>
  );
}
