"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Mot de passe incorrect.");
        return;
      }

      const next = searchParams.get("next") ?? "/admin";
      router.push(next);
      router.refresh();
    } catch {
      setError("Connexion impossible. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-16 max-w-md rounded-xl border border-[#ddd6cc] bg-white p-8 shadow-sm"
    >
      <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#8b6f61]">
        Accès privé
      </p>
      <h1 className="mb-6 font-display text-3xl font-semibold text-[#2a2622]">
        Administration
      </h1>
      <label className="mb-2 block text-sm font-medium" htmlFor="password">
        Mot de passe
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        className="mb-4 w-full rounded-lg border border-[#ddd6cc] px-4 py-3 text-sm outline-none ring-[#8b6f61] focus:ring-2"
        autoComplete="current-password"
        required
      />
      {error ? <p className="mb-4 text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-[#8b6f61] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
