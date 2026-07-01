"use client";

import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  subtitle?: string;
};

export default function AdminShell({ children, title, subtitle }: Props) {
  return (
    <div className="min-h-screen bg-[#f4f1ec] text-[#2a2622]">
      <header className="border-b border-[#ddd6cc] bg-[#2a2622] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#c9a99a]">
              Espace admin
            </p>
            <p className="font-display text-xl">Elodie Fleury</p>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin" className="hover:text-[#c9a99a]">
              Tableau de bord
            </Link>
            <Link href="/admin/blog" className="hover:text-[#c9a99a]">
              Blog
            </Link>
            <Link href="/admin/properties" className="hover:text-[#c9a99a]">
              Biens
            </Link>
            <Link href="/" className="hover:text-[#c9a99a]">
              Voir le site
            </Link>
            <button
              type="button"
              onClick={async () => {
                await fetch("/api/admin/login", { method: "DELETE" });
                window.location.href = "/admin/login";
              }}
              className="rounded border border-white/20 px-3 py-1.5 text-xs hover:bg-white/10"
            >
              Déconnexion
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
          {subtitle ? (
            <p className="mt-2 max-w-3xl text-sm text-[#5c564f]">{subtitle}</p>
          ) : null}
        </div>
        {children}
      </main>
    </div>
  );
}
