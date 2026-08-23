# syntax=docker/dockerfile:1.7
# ---- deps: installa le dipendenze (better-sqlite3 usa i binari precompilati per linux glibc)
FROM node:22-slim AS deps
RUN corepack enable && corepack prepare pnpm@11.2.2 --activate
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm config set fetch-retries 5 && pnpm config set fetch-timeout 300000 \
 && pnpm install --frozen-lockfile

# ---- build
FROM node:22-slim AS builder
RUN corepack enable && corepack prepare pnpm@11.2.2 --activate
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# valori fittizi solo per la build (nessuna pagina li usa a build-time); i reali arrivano dal Secret k8s
ENV DATABASE_PATH=/tmp/build.db
RUN pnpm build

# ---- runner: solo lo standalone
FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0 \
    DATABASE_PATH=/data/dglm.db
RUN groupadd -g 1001 nodejs && useradd -r -u 1001 -g nodejs -d /app -s /usr/sbin/nologin nextjs \
 && mkdir -p /data && chown nextjs:nodejs /data
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
VOLUME ["/data"]
HEALTHCHECK --interval=30s --timeout=3s CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
