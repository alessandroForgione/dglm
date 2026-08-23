import { describe, it, expect } from "vitest";
import { RateLimiter } from "@/lib/rate-limit";

describe("RateLimiter", () => {
  it("allows up to max hits in window and then blocks", () => {
    const rl = new RateLimiter({ max: 3, windowMs: 1000 });
    let now = 0;
    expect(rl.hit("ip", now)).toBe(true);
    expect(rl.hit("ip", now)).toBe(true);
    expect(rl.hit("ip", now)).toBe(true);
    expect(rl.hit("ip", now)).toBe(false);
    now += 1001;
    expect(rl.hit("ip", now)).toBe(true);
  });
  it("tracks keys independently", () => {
    const rl = new RateLimiter({ max: 1, windowMs: 1000 });
    expect(rl.hit("a", 0)).toBe(true);
    expect(rl.hit("b", 0)).toBe(true);
    expect(rl.hit("a", 0)).toBe(false);
  });
});
