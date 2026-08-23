import { describe, it, expect } from "vitest";
import { preorderSchema, normalizePhone } from "@/lib/validation";

const valid = {
  firstName: "Mario",
  lastName: "Rossi",
  email: "Mario.Rossi@Example.com ",
  phone: "+39 333 123 4567",
  consent: true,
  website: "",
};

describe("normalizePhone", () => {
  it("strips spaces, dashes and dots", () => {
    expect(normalizePhone("+39 333-123.4567")).toBe("+393331234567");
  });
  it("converts 00 prefix to +", () => {
    expect(normalizePhone("0039 333 1234567")).toBe("+393331234567");
  });
  it("adds +39 to Italian numbers without prefix", () => {
    expect(normalizePhone("333 1234567")).toBe("+393331234567");
  });
});

describe("preorderSchema", () => {
  it("accepts a valid payload and normalizes it", () => {
    const r = preorderSchema.safeParse(valid);
    expect(r.success).toBe(true);
    if (!r.success) return;
    expect(r.data.email).toBe("mario.rossi@example.com");
    expect(r.data.phone).toBe("+393331234567");
    expect(r.data.firstName).toBe("Mario");
  });

  it("rejects missing consent", () => {
    const r = preorderSchema.safeParse({ ...valid, consent: false });
    expect(r.success).toBe(false);
  });

  it("rejects invalid email", () => {
    expect(preorderSchema.safeParse({ ...valid, email: "nope" }).success).toBe(false);
  });

  it("rejects too short phone", () => {
    expect(preorderSchema.safeParse({ ...valid, phone: "123" }).success).toBe(false);
  });

  it("rejects names shorter than 2 chars", () => {
    expect(preorderSchema.safeParse({ ...valid, firstName: "M" }).success).toBe(false);
  });

  it("accepts names with accents and apostrophes", () => {
    expect(preorderSchema.safeParse({ ...valid, lastName: "D'Angelò" }).success).toBe(true);
  });
});
