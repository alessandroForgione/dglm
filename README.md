# DGLM — sito vetrina + pre-order

Sito del brand streetwear **DGLM**: vetrina (home, collezione, dettaglio capo, about, contatti) e pagina **pre-order** (lista d'attesa con nome, cognome, email, telefono) che salva i dati su SQLite, manda email via Resend e li mostra in un'area **admin** con export CSV.

Stack: Next.js 16 (App Router) · Tailwind 4 · Framer Motion · better-sqlite3 · Resend · Docker · Kubernetes (k3s, Traefik, cert-manager).

```
web/        app Next.js (tutto il sito)
k8s/        manifest Kubernetes (namespace dglm)
scripts/    secret, build/push, deploy
.github/    GitHub Actions: build immagine → ghcr.io
```

## Modificare i contenuti

| Cosa | Dove |
|---|---|
| Prodotti (nome, prezzo, taglie, descrizione, foto, in evidenza) | `web/content/products.ts` |
| Foto prodotti | `web/public/images/products/` — sostituisci gli SVG placeholder con `jpg/webp` (4:5, ≥1200px) e aggiorna i percorsi in `products.ts` |
| Testi brand, tagline, manifesto, about, timeline, social, email, data del drop | `web/content/site.ts` |
| Foto about | `web/public/images/about-atelier.svg` → sostituisci e aggiorna `app/about/page.tsx` |
| Colori / font | `web/app/globals.css` (`@theme`) e `web/app/layout.tsx` (font) |

Ogni modifica → commit + push su `main` → la GitHub Action builda l'immagine → `scripts/deploy.sh <tag>`.

## Sviluppo locale

```bash
cd web
cp .env.example .env.local     # compila almeno ADMIN_PASSWORD e SESSION_SECRET
pnpm install
pnpm dev                       # http://localhost:3000
pnpm test                      # vitest (validazione, auth, db, rate-limit)
pnpm lint && pnpm typecheck
```

Il DB SQLite locale finisce in `web/data/dglm.db` (gitignored). Senza `RESEND_API_KEY` le email vengono saltate (log in console) ma il pre-order viene salvato.

## Variabili d'ambiente

| Nome | Uso |
|---|---|
| `DATABASE_PATH` | percorso SQLite (in produzione `/data/dglm.db`, forzato dal Deployment) |
| `RESEND_API_KEY` | API key Resend (https://resend.com/api-keys) |
| `MAIL_FROM` | mittente. In test `DGLM <onboarding@resend.dev>`; in produzione un indirizzo del dominio verificato su Resend (es. `DGLM <noreply@dglm.it>`) |
| `MAIL_TO` | chi riceve la notifica di nuovo pre-order (più indirizzi separati da virgola) |
| `ADMIN_PASSWORD` | password di `/admin` |
| `SESSION_SECRET` | segreto per firmare il cookie admin (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico (sitemap, OG, email) |

## Pre-order e admin

- `POST /api/preorder` valida (zod), applica rate-limit (5 richieste / 10 min per IP), salva, invia email a `MAIL_TO` e conferma all'utente. Email duplicata → risposta "già in lista" con il numero già assegnato. Campo honeypot `website` per i bot.
- Ogni pre-order ha un **numero progressivo** (id) mostrato all'utente.
- `/admin` (password) → tabella con ricerca, **Esporta CSV**, Esci. Le rotte `/admin/*` sono protette da `web/proxy.ts`.

## Immagine Docker

GitHub Actions (`.github/workflows/docker.yml`) builda `linux/amd64` e pusha su **`ghcr.io/alessandroforgione/dglm-web`** con tag `sha-<short>`, `<data>` e `latest` a ogni push su `main` che tocca `web/`.

Dopo il primo push: su GitHub → Packages → `dglm-web` → *Package settings* → **Change visibility → Public** (così il cluster fa pull senza secret). In alternativa tieni il package privato e crea il pull secret con `scripts/k8s-secrets.sh --ghcr` + decommenta `imagePullSecrets` in `k8s/deployment.yaml`.

Build locale (fallback): `scripts/build-push.sh [tag]` (serve `docker login ghcr.io` con PAT `write:packages`).

## Deploy su Kubernetes (cluster `finow-hetzner`, namespace `dglm`)

Prerequisiti: `KUBECONFIG=~/.kube/finow-hetzner.yaml`, context `finow-hetzner`. DNS: `dglm.it` e `www.dglm.it` → A `91.98.4.221` (senza DNS il pod gira lo stesso ma niente certificato TLS: test con `kubectl -n dglm port-forward svc/dglm-web 3000:3000`).

```bash
# 1. namespace
kubectl --context finow-hetzner apply -f k8s/00-namespace.yaml
# 2. secret (da web/.env.production, gitignored)
cp web/.env.example web/.env.production   # compila i valori reali
scripts/k8s-secrets.sh                    # aggiungi --ghcr se il package è privato
# 3. tutto il resto
kubectl --context finow-hetzner apply -f k8s/
# 4. verifica
kubectl --context finow-hetzner -n dglm get pods,svc,ingress,certificate
```

Aggiornamenti: `scripts/deploy.sh sha-xxxxxxx` (tag stampato dalla Action) oppure `scripts/deploy.sh latest` + `kubectl -n dglm rollout restart deploy/dglm-web`.

Il DB vive sul PVC `dglm-data` (`/data/dglm.db`): sopravvive a riavvii e redeploy. Backup: `kubectl -n dglm exec deploy/dglm-web -- cat /data/dglm.db > backup.db`.

## Dopo il go-live

- Verifica il dominio `dglm.it` su Resend e cambia `MAIL_FROM` (rilancia `scripts/k8s-secrets.sh` + `rollout restart`).
- Ruota `ADMIN_PASSWORD`/`SESSION_SECRET` allo stesso modo.
- Quando il drop apre: cambia `status` dei prodotti in `products.ts` (`preorder` → `available`/`soldout`).
