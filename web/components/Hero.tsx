"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { ButtonLink, Arrow } from "./Button";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Hero: il wordmark come serigrafia. Il layer lime parte molto fuori registro
 * e "entra in registro" — resta un filo sfalsato, come una stampa a mano.
 */
export function Hero({ count }: { count: number }) {
  const reduce = useReducedMotion();
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between pt-[calc(var(--nav-h)+24px)] pb-8 px-5 md:px-8 overflow-hidden">
      <div className="mx-auto w-full max-w-[1600px] flex items-center justify-between">
        <motion.p
          className="eyebrow"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {site.drop.name} · {site.drop.label} · Made in Italy
        </motion.p>
        <motion.p
          className="eyebrow hidden sm:block"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {site.contact.city}
        </motion.p>
      </div>

      <div className="relative w-full flex items-center justify-center py-6" aria-label={site.name}>
        <h1
          className="hero-mark display misprint text-[44vw] md:text-[34vw] leading-[0.8] tracking-[-0.03em] select-none"
          data-text="DGLM"
        >
          DGLM
        </h1>
      </div>

      <motion.div
        className="mx-auto w-full max-w-[1600px] grid gap-6 md:grid-cols-12 md:items-end"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease }}
      >
        <p className="md:col-span-5 text-[22px] md:text-[28px] leading-[1.15] font-medium text-inchiostro max-w-md">
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
          <p className="font-mono text-[40px] leading-none text-inchiostro tabular-nums">{String(count).padStart(4, "0")}</p>
          <p className="eyebrow mt-1">già in lista</p>
        </div>
      </motion.div>
    </section>
  );
}
