import { describe, expect, it } from "vitest";
import { daysUntil } from "../drop";

describe("daysUntil", () => {
  const drop = "2026-10-15T18:00:00+02:00";
  it("arrotonda per eccesso i giorni mancanti", () => {
    expect(daysUntil(drop, Date.parse("2026-10-14T18:00:00+02:00"))).toBe(1);
    expect(daysUntil(drop, Date.parse("2026-10-14T19:00:00+02:00"))).toBe(1);
    expect(daysUntil(drop, Date.parse("2026-09-02T12:00:00+02:00"))).toBe(44);
  });
  it("non va sotto zero dopo il drop", () => {
    expect(daysUntil(drop, Date.parse("2026-10-15T18:00:00+02:00"))).toBe(0);
    expect(daysUntil(drop, Date.parse("2026-12-01T00:00:00+02:00"))).toBe(0);
  });
});
