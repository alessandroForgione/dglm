"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { site } from "@/content/site";
import { Button, ButtonLink, Arrow } from "./Button";

type Field = "firstName" | "lastName" | "email" | "phone" | "consent";
type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message?: string; fields?: Partial<Record<Field, string>> }
  | { kind: "done"; status: "created" | "duplicate"; number: number | null };

const inputCls =
  "peer w-full bg-transparent border-b border-inchiostro/20 py-3 text-[18px] text-inchiostro placeholder-transparent focus:border-inchiostro/60 focus:outline-none transition-colors aria-[invalid=true]:border-inchiostro/60";
const labelCls =
  "pointer-events-none absolute left-0 top-3 font-sans text-[12px] text-grigio transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[16px] peer-focus:-top-3 peer-focus:text-[12px] peer-focus:text-inchiostro -top-3";

function FieldBox({
  id, label, error, children,
}: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="relative pt-3">
      {children}
      <label htmlFor={id} className={labelCls}>{label}</label>
      {error && (
        <p id={`${id}-error`} className="mt-2 font-sans text-[13px] text-inchiostro/80">
          {error}
        </p>
      )}
    </div>
  );
}

export function PreorderForm({ nextNumber }: { nextNumber: number }) {
  const [state, setState] = useState<State>({ kind: "idle" });
  const reduce = useReducedMotion();
  const errs = state.kind === "error" ? state.fields ?? {} : {};

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: fd.get("firstName"),
      lastName: fd.get("lastName"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      consent: fd.get("consent") === "on",
      website: fd.get("website") ?? "",
    };
    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/preorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState({ kind: "done", status: data.status ?? "created", number: data.number ?? null });
        return;
      }
      setState({ kind: "error", message: data.error, fields: data.errors });
    } catch {
      setState({ kind: "error", message: "Connessione assente. Riprova tra un attimo." });
    }
  }

  return (
    <AnimatePresence mode="wait">
      {state.kind === "done" ? (
        <motion.div
          key="done"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[var(--radius-lg)] bg-gesso p-6 md:p-10"
          role="status"
          aria-live="polite"
        >
          <p className="eyebrow text-inchiostro">{state.status === "duplicate" ? "Eri già in lista" : "Pre-order registrato"}</p>
          <p className="headline mt-3 text-[clamp(2rem,6vw,4rem)]">Sei dentro.</p>
          {state.number != null && (
            <div className="mt-6 flex items-baseline gap-4">
              <span className="eyebrow">Il tuo numero</span>
              <span className="font-mono text-[48px] md:text-[64px] leading-none text-inchiostro tabular-nums">
                N°{String(state.number).padStart(4, "0")}
              </span>
            </div>
          )}
          <p className="mt-6 max-w-md text-inchiostro/80">
            Ti abbiamo mandato una conferma via email. Quando {site.drop.name} apre, i numeri più bassi entrano per primi.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/collezione">Guarda la collezione <Arrow /></ButtonLink>
            <ButtonLink href={site.contact.instagram} variant="ghost" target="_blank" rel="noreferrer">Instagram</ButtonLink>
          </div>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          noValidate
          className="rounded-[var(--radius-lg)] bg-gesso p-6 md:p-10"
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-inchiostro/10 pb-4 mb-2">
            <p className="eyebrow">{site.drop.name} · Lista d&apos;attesa</p>
            <p className="font-mono text-[13px] text-inchiostro tabular-nums">N°{String(nextNumber).padStart(4, "0")}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 mt-6">
            <FieldBox id="firstName" label="Nome" error={errs.firstName}>
              <input id="firstName" name="firstName" autoComplete="given-name" placeholder="Nome" required minLength={2} className={inputCls} aria-invalid={!!errs.firstName} aria-describedby={errs.firstName ? "firstName-error" : undefined} />
            </FieldBox>
            <FieldBox id="lastName" label="Cognome" error={errs.lastName}>
              <input id="lastName" name="lastName" autoComplete="family-name" placeholder="Cognome" required minLength={2} className={inputCls} aria-invalid={!!errs.lastName} aria-describedby={errs.lastName ? "lastName-error" : undefined} />
            </FieldBox>
            <FieldBox id="email" label="Email" error={errs.email}>
              <input id="email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="Email" required className={inputCls} aria-invalid={!!errs.email} aria-describedby={errs.email ? "email-error" : undefined} />
            </FieldBox>
            <FieldBox id="phone" label="Telefono" error={errs.phone}>
              <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="Telefono" required className={inputCls} aria-invalid={!!errs.phone} aria-describedby={errs.phone ? "phone-error" : undefined} />
            </FieldBox>
          </div>

          {/* honeypot */}
          <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
            <label htmlFor="website">Sito web</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <label className="mt-8 flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-4 w-4 shrink-0 appearance-none rounded-[4px] border border-inchiostro/30 checked:bg-inchiostro checked:border-inchiostro transition-colors"
              aria-invalid={!!errs.consent}
            />
            <span className="text-[14px] text-inchiostro/75">
              Acconsento al trattamento dei dati per ricevere comunicazioni su {site.drop.name}. Niente spam, puoi uscire dalla lista quando vuoi.
            </span>
          </label>
          {errs.consent && <p className="mt-2 font-sans text-[13px] text-inchiostro/80">{errs.consent}</p>}

          {state.kind === "error" && state.message && (
            <p role="alert" className="mt-6 rounded-[var(--radius-md)] bg-cenere px-4 py-3 text-[14px] text-inchiostro">
              {state.message}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={state.kind === "loading"} className={clsx("h-12 px-7 text-[15px]", state.kind === "loading" && "animate-pulse")}>
              {state.kind === "loading" ? "Registrazione…" : "Prendi il tuo numero"} <Arrow />
            </Button>
            <p className="text-[13px] text-grigio">Nessun pagamento ora. È una lista d&apos;attesa.</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
