import { z } from "zod";

/** Normalizza un telefono: rimuove separatori, 00→+, aggiunge +39 se manca il prefisso. */
export function normalizePhone(raw: string): string {
  let p = raw.replace(/[\s().\-]/g, "");
  if (p.startsWith("00")) p = "+" + p.slice(2);
  if (!p.startsWith("+")) p = "+39" + p.replace(/^0+/, "");
  return p;
}

const nameRe = /^[\p{L}\p{M}' \-]+$/u;

const name = (label: string) =>
  z
    .string({ error: `${label} obbligatorio` })
    .trim()
    .min(2, `${label} troppo corto`)
    .max(60, `${label} troppo lungo`)
    .regex(nameRe, `${label} contiene caratteri non validi`);

export const preorderSchema = z.object({
  firstName: name("Nome"),
  lastName: name("Cognome"),
  email: z
    .string({ error: "Email obbligatoria" })
    .trim()
    .toLowerCase()
    .email("Email non valida")
    .max(120, "Email troppo lunga"),
  phone: z
    .string({ error: "Telefono obbligatorio" })
    .trim()
    .transform(normalizePhone)
    .refine((p) => /^\+[1-9]\d{7,14}$/.test(p), "Telefono non valido"),
  consent: z.literal(true, { error: "Devi accettare la privacy policy" }),
  /** honeypot: deve restare vuoto */
  website: z.string().max(0).optional().default(""),
});

export type PreorderInput = z.infer<typeof preorderSchema>;

/** Converte gli errori zod in mappa campo → messaggio */
export function fieldErrors(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "_");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
