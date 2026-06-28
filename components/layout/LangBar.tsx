"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale } from "@/i18n/routing";

const locales: { code: Locale; flag: string; label: string }[] = [
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

export default function LangBar() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (nextLocale: Locale) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <div className="fixed left-0 right-0 top-0 z-[300] flex h-9 items-center justify-end gap-1 border-b border-sol/15 bg-tinta px-5 md:px-10">
      {locales.map((item, index) => (
        <div key={item.code} className="flex items-center gap-1">
          {index > 0 && (
            <div className="mx-0.5 h-3.5 w-px bg-white/12" aria-hidden />
          )}
          <button
            type="button"
            onClick={() => switchLocale(item.code)}
            className={`inline-flex items-center gap-1.5 rounded px-3 py-1 font-sans text-[0.68rem] font-semibold uppercase tracking-wider transition-all ${
              locale === item.code
                ? "border border-sol bg-sol/10 text-sol"
                : "border border-transparent text-white/45 hover:border-sol/25 hover:text-white/80"
            }`}
            aria-current={locale === item.code ? "true" : undefined}
          >
            <span className="text-sm">{item.flag}</span>
            {item.label}
          </button>
        </div>
      ))}
    </div>
  );
}
