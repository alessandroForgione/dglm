import { describe, it, expect, beforeAll } from "vitest";
import { createSessionToken, verifySessionToken, checkPassword } from "@/lib/auth";

beforeAll(() => {
  process.env.SESSION_SECRET = "test-secret-0123456789";
  process.env.ADMIN_PASSWORD = "hunter2!";
});

describe("session token", () => {
  it("round-trips a valid token", async () => {
    const t = await createSessionToken();
    expect(await verifySessionToken(t)).toBe(true);
  });
  it("rejects a tampered token", async () => {
    const t = await createSessionToken();
    expect(await verifySessionToken(t.slice(0, -2) + "zz")).toBe(false);
  });
  it("rejects expired tokens", async () => {
    const t = await createSessionToken(-10); // expired 10s ago
    expect(await verifySessionToken(t)).toBe(false);
  });
  it("rejects garbage", async () => {
    expect(await verifySessionToken("")).toBe(false);
    expect(await verifySessionToken("abc")).toBe(false);
    expect(await verifySessionToken(undefined)).toBe(false);
  });
});

describe("checkPassword", () => {
  it("accepts the right password", () => expect(checkPassword("hunter2!")).toBe(true));
  it("rejects a wrong password", () => expect(checkPassword("hunter3!")).toBe(false));
  it("rejects empty", () => expect(checkPassword("")).toBe(false));
});
