import { describe, it, expect } from "vitest";
import { createDb, insertPreorder, listPreorders, toCsv } from "@/lib/db";

const sample = {
  firstName: "Mario",
  lastName: "Rossi",
  email: "mario@example.com",
  phone: "+393331234567",
  consent: true,
  ip: "127.0.0.1",
  userAgent: "vitest",
};

describe("db", () => {
  it("inserts and lists preorders", () => {
    const db = createDb(":memory:");
    const r = insertPreorder(db, sample);
    expect(r.status).toBe("created");
    const rows = listPreorders(db);
    expect(rows).toHaveLength(1);
    expect(rows[0].email).toBe("mario@example.com");
    expect(rows[0].createdAt).toBeTruthy();
  });

  it("reports duplicates by email without throwing", () => {
    const db = createDb(":memory:");
    insertPreorder(db, sample);
    const r = insertPreorder(db, sample);
    expect(r.status).toBe("duplicate");
    expect(listPreorders(db)).toHaveLength(1);
  });

  it("exports CSV with header and escaped fields", () => {
    const db = createDb(":memory:");
    insertPreorder(db, { ...sample, lastName: 'Ro"ssi, Jr' });
    const csv = toCsv(listPreorders(db));
    const lines = csv.trim().split("\n");
    expect(lines[0]).toBe("id,created_at,first_name,last_name,email,phone");
    expect(lines[1]).toContain('"Ro""ssi, Jr"');
  });
});

import { findPreorderIdByEmail } from "@/lib/db";
describe("findPreorderIdByEmail", () => {
  it("returns the id for an existing email and null otherwise", () => {
    const db = createDb(":memory:");
    const r = insertPreorder(db, sample);
    expect(r.status).toBe("created");
    expect(findPreorderIdByEmail(db, sample.email)).toBe(r.status === "created" ? r.id : -1);
    expect(findPreorderIdByEmail(db, "nobody@example.com")).toBeNull();
  });
});
