"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
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

      if (response.status === 503) {
        setError(
          "Administration non configurée. Contactez le support technique."
        );
        return;
      }

      if (!response.ok) {
        setError("Mot de passe incorrect.");
        return;
      }

      router.push(nextPath);
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
        className="admin-input"
        autoComplete="current-password"
        required
      />
      {error ? <p className="mb-4 mt-4 text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="admin-primary-btn mt-4 w-full"
      >
        {loading ? "Connexion…" : "Se connecter"}
      </button>
    </form>
  );
}
