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
          className="mt-2 w-full rounded-[var(--radius-md)] bg-gesso border border-transparent px-4 h-12 text-inchiostro focus:border-inchiostro/30 focus:outline-none transition-colors"
        />
      </label>
      {error && <p role="alert" className="rounded-[var(--radius-md)] bg-cenere px-4 py-3 text-[14px] text-inchiostro">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Accesso…" : "Entra"}
      </Button>
    </form>
  );
}
