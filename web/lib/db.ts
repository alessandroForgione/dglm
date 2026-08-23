import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

export type Db = Database.Database;

export interface PreorderRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
}

export interface NewPreorder {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
  ip?: string | null;
  userAgent?: string | null;
}

const SCHEMA = `
CREATE TABLE IF NOT EXISTS preorders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  consent INTEGER NOT NULL DEFAULT 1,
  ip TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
);
CREATE INDEX IF NOT EXISTS idx_preorders_created ON preorders(created_at);
`;

export function createDb(path: string): Db {
  if (path !== ":memory:") mkdirSync(dirname(path), { recursive: true });
  const db = new Database(path);
  db.pragma("journal_mode = WAL");
  db.pragma("busy_timeout = 3000");
  db.exec(SCHEMA);
  return db;
}

/** Singleton per il processo (Next.js può ricaricare i moduli in dev → lo parcheggiamo su globalThis). */
const g = globalThis as unknown as { __dglmDb?: Db };
export function getDb(): Db {
  if (!g.__dglmDb) g.__dglmDb = createDb(process.env.DATABASE_PATH ?? "./data/dglm.db");
  return g.__dglmDb;
}

export function insertPreorder(db: Db, p: NewPreorder): { status: "created"; id: number } | { status: "duplicate" } {
  try {
    const r = db
      .prepare(
        `INSERT INTO preorders (first_name,last_name,email,phone,consent,ip,user_agent)
         VALUES (@firstName,@lastName,@email,@phone,@consent,@ip,@userAgent)`,
      )
      .run({ ...p, consent: p.consent ? 1 : 0, ip: p.ip ?? null, userAgent: p.userAgent ?? null });
    return { status: "created", id: Number(r.lastInsertRowid) };
  } catch (e) {
    if (e instanceof Error && /UNIQUE constraint failed: preorders\.email/.test(e.message)) {
      return { status: "duplicate" };
    }
    throw e;
  }
}

export function listPreorders(db: Db): PreorderRow[] {
  const rows = db
    .prepare(
      `SELECT id, first_name, last_name, email, phone, consent, ip, user_agent, created_at
       FROM preorders ORDER BY created_at DESC, id DESC`,
    )
    .all() as Array<Record<string, unknown>>;
  return rows.map((r) => ({
    id: r.id as number,
    firstName: r.first_name as string,
    lastName: r.last_name as string,
    email: r.email as string,
    phone: r.phone as string,
    consent: Boolean(r.consent),
    ip: (r.ip as string) ?? null,
    userAgent: (r.user_agent as string) ?? null,
    createdAt: r.created_at as string,
  }));
}

export function countPreorders(db: Db): number {
  return (db.prepare("SELECT COUNT(*) AS n FROM preorders").get() as { n: number }).n;
}

const csvCell = (v: unknown) => {
  const s = v == null ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

export function toCsv(rows: PreorderRow[]): string {
  const header = "id,created_at,first_name,last_name,email,phone";
  const body = rows.map((r) =>
    [r.id, r.createdAt, r.firstName, r.lastName, r.email, r.phone].map(csvCell).join(","),
  );
  return [header, ...body].join("\n") + "\n";
}

export function findPreorderIdByEmail(db: Db, email: string): number | null {
  const r = db.prepare("SELECT id FROM preorders WHERE email = ?").get(email) as { id: number } | undefined;
  return r?.id ?? null;
}
