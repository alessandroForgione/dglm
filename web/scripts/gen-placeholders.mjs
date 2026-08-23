// Genera SVG placeholder per i prodotti (da sostituire con foto reali, stesso nome file .jpg/.webp + aggiorna products.ts)
import { writeFileSync, mkdirSync } from "node:fs";

const BG = "#161616", INK = "#2a2a2a", LINE = "#3a3a3a", ACID = "#c8ff00", CALCE = "#f2f0ea";
const W = 1200, H = 1500;

const shapes = {
  tee: (c) => `<path d="M380 380 L500 330 Q600 400 700 330 L820 380 L900 560 L790 600 L790 1150 L410 1150 L410 600 L300 560 Z" fill="${c}" stroke="${LINE}" stroke-width="4"/>`,
  hoodie: (c) => `<path d="M360 420 L500 360 Q600 300 700 360 L840 420 L930 640 L810 690 L810 1180 L390 1180 L390 690 L270 640 Z" fill="${c}" stroke="${LINE}" stroke-width="4"/>
    <path d="M500 360 Q600 470 700 360 Q640 300 560 300 Q500 320 500 360Z" fill="${INK}" stroke="${LINE}" stroke-width="4"/>
    <rect x="470" y="900" width="260" height="200" fill="${INK}" stroke="${LINE}" stroke-width="4"/>`,
  pants: (c) => `<path d="M420 300 L780 300 L820 1250 L640 1250 L600 650 L560 1250 L380 1250 Z" fill="${c}" stroke="${LINE}" stroke-width="4"/>
    <rect x="420" y="300" width="360" height="60" fill="${INK}"/>`,
  cap: (c) => `<path d="M330 760 Q330 440 600 440 Q870 440 870 760 Z" fill="${c}" stroke="${LINE}" stroke-width="4"/>
    <path d="M300 760 L900 760 Q1000 800 900 860 L300 860 Q250 800 300 760Z" fill="${INK}" stroke="${LINE}" stroke-width="4"/>`,
  beanie: (c) => `<path d="M340 900 Q340 420 600 420 Q860 420 860 900 Z" fill="${c}" stroke="${LINE}" stroke-width="4"/>
    <rect x="320" y="860" width="560" height="160" fill="${c}" stroke="${LINE}" stroke-width="4"/>
    ${Array.from({length:9},(_,i)=>`<line x1="${360+i*60}" y1="870" x2="${360+i*60}" y2="1010" stroke="${LINE}" stroke-width="4"/>`).join("")}`,
};

function svg({ kind, color = INK, label, sub, accent = false }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#1f1f1f" stroke-width="1"/></pattern></defs>
  <rect width="100%" height="100%" fill="${BG}"/>
  <rect width="100%" height="100%" fill="url(#g)"/>
  ${shapes[kind](color)}
  ${accent ? `<text x="600" y="760" text-anchor="middle" font-family="Impact, 'Arial Narrow', sans-serif" font-size="110" fill="${ACID}" letter-spacing="-2">DGLM</text>` : ""}
  <text x="60" y="1400" font-family="ui-monospace, Menlo, monospace" font-size="28" fill="${CALCE}" opacity="0.8">${label}</text>
  <text x="60" y="1440" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="${CALCE}" opacity="0.45">${sub}</text>
  <text x="1140" y="1440" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="${ACID}">DROP 01 · PLACEHOLDER</text>
</svg>`;
}

const files = {
  "heavy-tee-logo-1": { kind: "tee", label: "HEAVY TEE — LOGO", sub: "FRONT · 320 GSM", accent: true },
  "heavy-tee-logo-2": { kind: "tee", label: "HEAVY TEE — LOGO", sub: "BACK · N° 0001" },
  "heavy-tee-acid-1": { kind: "tee", label: "HEAVY TEE — ACID", sub: "FRONT · FLUO INK", accent: true },
  "garage-hoodie-1": { kind: "hoodie", label: "GARAGE HOODIE", sub: "FRONT · 450 GSM", accent: true },
  "garage-hoodie-2": { kind: "hoodie", label: "GARAGE HOODIE", sub: "BACK · PATCH" },
  "night-shift-crewneck-1": { kind: "hoodie", color: "#3a3a38", label: "NIGHT SHIFT CREWNECK", sub: "BACK PRINT" },
  "cargo-pant-01-1": { kind: "pants", label: "CARGO PANT 01", sub: "RIPSTOP · 6 POCKETS" },
  "track-pant-acid-1": { kind: "pants", color: "#1d1d1d", label: "TRACK PANT — ACID STRIPE", sub: "NYLON · ZIP HEM" },
  "wordmark-cap-1": { kind: "cap", label: "WORDMARK CAP", sub: "6 PANEL" },
  "beanie-acid-1": { kind: "beanie", color: ACID, label: "BEANIE — ACID", sub: "MERINO BLEND" },
};

mkdirSync("public/images/products", { recursive: true });
for (const [name, cfg] of Object.entries(files)) {
  writeFileSync(`public/images/products/${name}.svg`, svg(cfg));
}

// hero / about placeholder (landscape)
const hero = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000" viewBox="0 0 1600 1000">
  <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#1f1f1f" stroke-width="1"/></pattern>
  <linearGradient id="v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#161616"/><stop offset="1" stop-color="#0b0b0b"/></linearGradient></defs>
  <rect width="100%" height="100%" fill="url(#v)"/><rect width="100%" height="100%" fill="url(#g)"/>
  <rect x="120" y="140" width="1360" height="720" fill="none" stroke="#2a2a2a" stroke-width="3" stroke-dasharray="14 10"/>
  <text x="160" y="220" font-family="ui-monospace, Menlo, monospace" font-size="26" fill="#f2f0ea" opacity="0.7">ATELIER · MILANO · PLACEHOLDER FOTO</text>
  <text x="1440" y="820" text-anchor="end" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="#c8ff00">SOSTITUISCI CON FOTO REALE</text>
</svg>`;
writeFileSync("public/images/about-atelier.svg", hero);
console.log("ok", Object.keys(files).length + 1, "files");
