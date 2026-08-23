/** Rate limiter in-memory a finestra fissa (sufficiente per 1 replica). */
export class RateLimiter {
  private hits = new Map<string, { count: number; start: number }>();
  constructor(private opts: { max: number; windowMs: number }) {}

  /** Ritorna true se la richiesta è consentita. */
  hit(key: string, now = Date.now()): boolean {
    const cur = this.hits.get(key);
    if (!cur || now - cur.start >= this.opts.windowMs) {
      this.hits.set(key, { count: 1, start: now });
      this.sweep(now);
      return true;
    }
    cur.count += 1;
    return cur.count <= this.opts.max;
  }

  private sweep(now: number) {
    if (this.hits.size < 1000) return;
    for (const [k, v] of this.hits) if (now - v.start >= this.opts.windowMs) this.hits.delete(k);
  }
}

/** Istanza condivisa per l'endpoint pre-order: 5 richieste ogni 10 minuti per IP. */
export const preorderLimiter = new RateLimiter({ max: 5, windowMs: 10 * 60 * 1000 });
