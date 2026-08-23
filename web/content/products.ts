/**
 * Catalogo DGLM.
 * Per aggiungere un capo: copia un oggetto, cambia slug (unico, usato nell'URL),
 * metti le immagini in public/images/products/ e aggiorna i percorsi.
 */
export type ProductTag = "Tees" | "Hoodies" | "Pants" | "Accessori";
export type ProductStatus = "preorder" | "available" | "soldout";

export interface Product {
  slug: string;
  name: string;
  /** Prezzo in euro */
  price: number;
  tag: ProductTag;
  status: ProductStatus;
  /** Breve descrizione (card + meta description) */
  short: string;
  description: string;
  /** Dettagli tecnici (tessuto, vestibilità, ecc.) */
  details: string[];
  sizes: string[];
  /** Colore principale (nome) */
  color: string;
  images: { src: string; alt: string }[];
  /** In evidenza in home */
  featured?: boolean;
}

export const tags: ProductTag[] = ["Tees", "Hoodies", "Pants", "Accessori"];

export const products: Product[] = [
  {
    slug: "heavy-tee-logo",
    name: "Heavy Tee — Logo",
    price: 55,
    tag: "Tees",
    status: "preorder",
    short: "T-shirt heavyweight 320 gsm con wordmark DGLM serigrafato sul petto.",
    description:
      "La tee che ha iniziato tutto. Cotone pettinato 320 gsm, collo a costine rinforzato, spalle scese e vestibilità boxy. Wordmark DGLM serigrafato a mano sul petto, numero di serie stampato dietro il collo.",
    details: ["100% cotone organico 320 gsm", "Fit boxy / oversize", "Serigrafia a 2 passaggi", "Made in Italy"],
    sizes: ["S", "M", "L", "XL"],
    color: "Nero",
    images: [
      { src: "/images/products/heavy-tee-logo-1.svg", alt: "Heavy Tee Logo fronte" },
      { src: "/images/products/heavy-tee-logo-2.svg", alt: "Heavy Tee Logo retro" },
    ],
    featured: true,
  },
  {
    slug: "heavy-tee-acid",
    name: "Heavy Tee — Acid",
    price: 55,
    tag: "Tees",
    status: "preorder",
    short: "Stessa tee, logo lime acido. Per farsi notare anche al buio.",
    description:
      "Versione acida della Heavy Tee: wordmark in inchiostro lime fluorescente su base nera. Stessa costruzione, stesso peso, zero discrezione.",
    details: ["100% cotone organico 320 gsm", "Fit boxy / oversize", "Inchiostro fluo", "Made in Italy"],
    sizes: ["S", "M", "L", "XL"],
    color: "Nero / Lime",
    images: [{ src: "/images/products/heavy-tee-acid-1.svg", alt: "Heavy Tee Acid fronte" }],
  },
  {
    slug: "garage-hoodie",
    name: "Garage Hoodie",
    price: 120,
    tag: "Hoodies",
    status: "preorder",
    short: "Felpa 450 gsm con cappuccio doppio strato e ricamo DGLM.",
    description:
      "Felpa con cappuccio in french terry 450 gsm, spazzolata internamente. Cappuccio a doppio strato, tasca a marsupio con cuciture rinforzate, polsini e fondo a costine pesanti. Wordmark ricamato sul petto, patch numerata sulla manica.",
    details: ["French terry 450 gsm", "Cappuccio doppio strato", "Ricamo + patch tessuta", "Fit oversize, spalla scesa"],
    sizes: ["S", "M", "L", "XL"],
    color: "Nero",
    images: [
      { src: "/images/products/garage-hoodie-1.svg", alt: "Garage Hoodie fronte" },
      { src: "/images/products/garage-hoodie-2.svg", alt: "Garage Hoodie retro" },
    ],
    featured: true,
  },
  {
    slug: "night-shift-crewneck",
    name: "Night Shift Crewneck",
    price: 95,
    tag: "Hoodies",
    status: "preorder",
    short: "Girocollo pesante, stampa back print a tutta schiena.",
    description:
      "Girocollo in felpa 400 gsm con back print a tutta schiena e logo piccolo sul petto. Costine alte, fit ampio, spalla scesa.",
    details: ["Felpa 400 gsm", "Back print grande formato", "Fit oversize"],
    sizes: ["S", "M", "L", "XL"],
    color: "Grigio cemento",
    images: [{ src: "/images/products/night-shift-crewneck-1.svg", alt: "Night Shift Crewneck" }],
  },
  {
    slug: "cargo-pant-01",
    name: "Cargo Pant 01",
    price: 135,
    tag: "Pants",
    status: "preorder",
    short: "Cargo ampio in ripstop con sei tasche e coulisse al fondo.",
    description:
      "Pantalone cargo in cotone ripstop 280 gsm. Gamba ampia dritta, sei tasche di cui due a soffietto, coulisse regolabile al fondo. Etichetta DGLM in gomma sul retro.",
    details: ["Cotone ripstop 280 gsm", "Gamba ampia", "6 tasche", "Coulisse al fondo"],
    sizes: ["28", "30", "32", "34", "36"],
    color: "Nero",
    images: [{ src: "/images/products/cargo-pant-01-1.svg", alt: "Cargo Pant 01" }],
    featured: true,
  },
  {
    slug: "track-pant-acid",
    name: "Track Pant — Acid Stripe",
    price: 110,
    tag: "Pants",
    status: "preorder",
    short: "Track pant nero con banda laterale lime e zip al fondo.",
    description:
      "Pantalone da track in nylon tecnico con banda laterale lime acido e zip al fondo gamba. Vita elastica con coulisse, tasche con zip.",
    details: ["Nylon tecnico", "Zip al fondo", "Banda laterale a contrasto"],
    sizes: ["S", "M", "L", "XL"],
    color: "Nero / Lime",
    images: [{ src: "/images/products/track-pant-acid-1.svg", alt: "Track Pant Acid Stripe" }],
  },
  {
    slug: "wordmark-cap",
    name: "Wordmark Cap",
    price: 40,
    tag: "Accessori",
    status: "preorder",
    short: "Cappellino 6 pannelli con wordmark ricamato.",
    description: "Cap a 6 pannelli in twill di cotone pesante, visiera curva, chiusura in metallo. Wordmark DGLM ricamato frontale.",
    details: ["Twill di cotone", "Taglia unica regolabile", "Ricamo 3D"],
    sizes: ["UNI"],
    color: "Nero",
    images: [{ src: "/images/products/wordmark-cap-1.svg", alt: "Wordmark Cap" }],
  },
  {
    slug: "beanie-acid",
    name: "Beanie — Acid",
    price: 35,
    tag: "Accessori",
    status: "preorder",
    short: "Beanie a coste lime con etichetta tessuta.",
    description: "Beanie a coste in lana merino blend, colore lime acido, etichetta tessuta DGLM sul risvolto.",
    details: ["Lana merino blend", "Taglia unica"],
    sizes: ["UNI"],
    color: "Lime",
    images: [{ src: "/images/products/beanie-acid-1.svg", alt: "Beanie Acid" }],
    featured: true,
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const featuredProducts = () => products.filter((p) => p.featured);
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
