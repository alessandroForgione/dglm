/**
 * Testi e impostazioni del sito DGLM.
 * Modifica qui: nome, tagline, social, email, date del drop, manifesto.
 */
export const site = {
  name: "DGLM",
  tagline: "Streetwear senza permesso.",
  description:
    "DGLM è un brand streetwear indipendente. Drop limitati, tagli netti, zero compromessi. Pre-order aperto.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://dglm.it",
  locale: "it_IT",

  drop: {
    name: "DROP 01",
    /** Data di uscita del drop (ISO). Usata nel countdown e nelle email. */
    date: "2026-10-15T18:00:00+02:00",
    label: "Autunno / Inverno 2026",
  },

  contact: {
    email: "hello@dglm.it",
    instagram: "https://instagram.com/dglm",
    tiktok: "https://tiktok.com/@dglm",
    city: "Milano, IT",
  },

  manifesto: [
    { big: "Pochi pezzi.", small: "Ogni drop è limitato e numerato. Finito, finito." },
    { big: "Tagli netti.", small: "Silhouette oversize, cuciture a vista, tessuti pesanti che durano." },
    { big: "Zero filtri.", small: "Niente stagioni, niente trend. Solo quello che ci va di indossare." },
  ],

  about: {
    headline: "Nati in strada, cresciuti di notte.",
    paragraphs: [
      "DGLM nasce nel 2026 da quattro amici e una stampante serigrafica in un garage. Nessun piano di marketing: solo magliette che volevamo indossare e che nessuno faceva.",
      "Ogni capo è disegnato a Milano e prodotto in Italia in piccole serie. Preferiamo un drop all'anno fatto bene a dieci fatti così così.",
      "Non vendiamo uno stile di vita. Vendiamo vestiti pesanti, tagliati bene, con un numero dietro il collo.",
    ],
    values: [
      { label: "01", title: "Limited", text: "Tirature chiuse. Mai ristampe." },
      { label: "02", title: "Made in Italy", text: "Laboratori a meno di 100 km da Milano." },
      { label: "03", title: "Heavyweight", text: "Cotone 320–450 gsm. Si sente addosso." },
    ],
    timeline: [
      { when: "2026 · 01", what: "Il garage. Prime 40 tee serigrafate a mano." },
      { when: "2026 · 06", what: "Nasce il wordmark DGLM. Arriva il primo hoodie." },
      { when: "2026 · 10", what: "DROP 01 — il primo drop pubblico. Pre-order aperto." },
    ],
  },

  /** Marquee che scorre in home e nel footer */
  marquee: ["DGLM", "DROP 01", "PRE-ORDER OPEN", "MADE IN ITALY", "LIMITED RUN"],
} as const;

export type Site = typeof site;
