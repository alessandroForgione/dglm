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
  "peer w-full bg-transparent border-b border-line py-3 text-[18px] text-calce placeholder-transparent focus:border-acido focus:outline-none transition-colors aria-[invalid=true]:border-ruggine";
const labelCls =
  "pointer-events-none absolute left-0 top-3 font-mono text-[11px] uppercase tracking-[0.18em] text-fumo transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-[14px] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:-top-3 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.18em] peer-focus:text-acido -top-3";

function FieldBox({
  id, label, error, children,
}: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="relative pt-3">
      {children}
      <label htmlFor={id} className={labelCls}>{label}</label>
      {error && (
        <p id={`${id}-error`} className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ruggine">
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
          className="border border-acido p-6 md:p-10"
          role="status"
          aria-live="polite"
        >
          <p className="eyebrow text-acido">{state.status === "duplicate" ? "Eri già in lista" : "Pre-order registrato"}</p>
          <p className="display mt-3 text-[clamp(3rem,12vw,9rem)]">Sei dentro.</p>
          {state.number != null && (
            <div className="mt-6 flex items-baseline gap-4">
              <span className="eyebrow">Il tuo numero</span>
              <span className="font-mono text-[56px] md:text-[80px] leading-none text-acido tabular-nums">
                N°{String(state.number).padStart(4, "0")}
              </span>
            </div>
          )}
          <p className="mt-6 max-w-md text-calce/80">
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
          className="border border-line p-6 md:p-10"
          exit={reduce ? undefined : { opacity: 0, y: -10 }}
        >
          <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4 mb-2">
            <p className="eyebrow">{site.drop.name} · Lista d&apos;attesa</p>
            <p className="font-mono text-[13px] text-acido tabular-nums">N°{String(nextNumber).padStart(4, "0")}</p>
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
              className="mt-1 h-4 w-4 shrink-0 appearance-none border border-calce/40 checked:bg-acido checked:border-acido focus-visible:outline-2 focus-visible:outline-acido"
              aria-invalid={!!errs.consent}
            />
            <span className="text-[14px] text-calce/75">
              Acconsento al trattamento dei dati per ricevere comunicazioni su {site.drop.name}. Niente spam, puoi uscire dalla lista quando vuoi.
            </span>
          </label>
          {errs.consent && <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ruggine">{errs.consent}</p>}

          {state.kind === "error" && state.message && (
            <p role="alert" className="mt-6 border border-ruggine px-4 py-3 font-mono text-[12px] uppercase tracking-[0.12em] text-ruggine">
              {state.message}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button type="submit" disabled={state.kind === "loading"} className={clsx("h-14 px-7 text-[13px]", state.kind === "loading" && "animate-pulse")}>
              {state.kind === "loading" ? "Registrazione…" : "Prendi il tuo numero"} <Arrow />
            </Button>
            <p className="text-[13px] text-fumo">Nessun pagamento ora. È una lista d&apos;attesa.</p>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
