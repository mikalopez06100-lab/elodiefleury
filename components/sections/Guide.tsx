"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { whatsappUrl } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

function Multiline({ text }: { text: string }) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

export default function Guide() {
  const t = useTranslations("guide");
  const locale = useLocale() as Locale;
  const items = ["item1", "item2", "item3", "item4", "item5"] as const;

  return (
    <section id="guide" className="bg-gris-light py-[72px] md:py-24">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10">
        <RevealOnScroll>
          <span className="mb-3.5 block text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-sable">
            {t("eyebrow")}
          </span>
          <h2 className="font-display text-section font-semibold leading-[1.08] tracking-tight text-marine">
            <Multiline text={t("title")} />
          </h2>
        </RevealOnScroll>

        <RevealOnScroll className="mt-8 overflow-hidden rounded-[10px] bg-marine lg:grid lg:grid-cols-[1fr_400px]">
          <div className="p-8 md:p-12">
            <span className="mb-3.5 block text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-white/38">
              {t("badge")}
            </span>
            <h3 className="mb-4 font-display text-[2rem] font-semibold leading-[1.1] text-white">
              <Multiline text={t("heading")} />
            </h3>
            <p className="mb-[26px] text-[0.88rem] leading-[1.82] text-white/62">
              {t("desc")}
            </p>
            <ul className="mb-8 flex flex-col gap-2">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[0.86rem] text-white/78 before:mt-px before:shrink-0 before:font-bold before:text-sable before:content-['✓']"
                >
                  {t(item)}
                </li>
              ))}
            </ul>
            <a
              href={whatsappUrl(locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-sable px-7 py-3.5 text-[0.86rem] font-semibold text-marine transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(200,169,122,0.38)]"
            >
              {t("cta")}
            </a>
          </div>
          <div className="relative min-h-[240px] lg:min-h-[300px]">
            <Image
              src="/images/guide-cover.jpg"
              alt={t("heading")}
              fill
              sizes="400px"
              className="object-cover object-center brightness-[1.05] contrast-[0.95]"
            />
            <div
              className="absolute inset-0 lg:bg-gradient-to-r lg:from-marine/38 lg:to-transparent"
              aria-hidden
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
