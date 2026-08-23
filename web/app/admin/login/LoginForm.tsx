"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/admin/login", { method: "POST", body: new FormData(e.currentTarget) });
    setLoading(false);
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
      return;
    }
    const data = await res.json().catch(() => ({}));
    setError(data.error ?? "Accesso non riuscito");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="eyebrow">Password</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="mt-2 w-full bg-transparent border border-line px-3 h-12 text-inchiostro focus:border-inchiostro focus:outline-none"
        />
      </label>
      {error && <p role="alert" className="font-mono text-[12px] uppercase tracking-[0.12em] text-inchiostro">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Accesso…" : "Entra"}
      </Button>
    </form>
  );
}
