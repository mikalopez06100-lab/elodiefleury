"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import BrandLogo from "@/components/brand/BrandLogo";
import { whatsappUrl } from "@/lib/config";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";

const navLinks = [
  { href: "/#profil", key: "profil" as const, isHash: true },
  { href: "/#services", key: "services" as const, isHash: true },
  { href: "/biens", key: "biens" as const, isHash: false },
  { href: "/#avis", key: "avis" as const, isHash: true },
  { href: "/blog", key: "blog" as const, isHash: false },
  { href: "/#contact", key: "contact" as const, isHash: true },
];

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isBlog = pathname.startsWith("/blog");
  const isBiens = pathname.startsWith("/biens");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const linkClass = (active: boolean) =>
    `text-[0.74rem] font-semibold uppercase tracking-[0.14em] transition-colors ${
      active ? "text-sol" : "text-cal/95 hover:text-sol"
    }`;

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-9 z-[200] border-b transition-all duration-350 ease-out-expo ${
          scrolled || isBlog || isBiens
            ? "border-white/10 bg-tinta/97 shadow-[0_4px_24px_rgba(42,38,34,0.22)] backdrop-blur-md"
            : "border-white/8 bg-tinta/92 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1160px] items-center justify-between px-5 md:px-10">
          <Link href="/" className="shrink-0">
            <BrandLogo variant="light" showTagline />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) =>
              link.isHash ? (
                <Link
                  key={link.key}
                  href={link.href}
                  className={linkClass(false)}
                >
                  {t(link.key)}
                </Link>
              ) : (
                <Link
                  key={link.key}
                  href={link.href}
                  className={linkClass(
                    link.key === "blog" ? isBlog : link.key === "biens" ? isBiens : false
                  )}
                >
                  {t(link.key)}
                </Link>
              )
            )}
            <a
              href={whatsappUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded bg-terracota px-[22px] py-2.5 text-[0.76rem] font-semibold tracking-wide text-cal transition-all hover:-translate-y-px hover:opacity-88"
            >
              {t("cta")}
            </a>
          </div>

          <button
            type="button"
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? t("menuClose") : t("menuOpen")}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-0.5 w-6 bg-cal transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-cal transition-opacity ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-cal transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 top-[100px] z-[199] bg-tinta/98 backdrop-blur-md md:hidden">
          <div className="flex flex-col gap-6 px-8 py-10">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl text-white"
              >
                {t(link.key)}
              </Link>
            ))}
            <a
              href={whatsappUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-fit rounded bg-terracota px-6 py-3 font-semibold text-cal"
            >
              {t("cta")}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
