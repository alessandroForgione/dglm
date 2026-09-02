const DAY = 86_400_000;

/** Giorni interi che mancano a `iso` rispetto a `now`; mai negativo. */
export function daysUntil(iso: string, now: number = Date.now()): number {
  return Math.max(0, Math.ceil((new Date(iso).getTime() - now) / DAY));
}
