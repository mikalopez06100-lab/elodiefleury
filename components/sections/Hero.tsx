"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { useGuideModal } from "@/components/guide/GuideModalProvider";
import { heroEntrance } from "@/lib/animations";
import { siteConfig, whatsappUrl } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

function MultilineTitle({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i}>
          {line}
          {i < text.split("\n").length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const t = useTranslations("hero");
  const tStats = useTranslations("stats");
  const locale = useLocale() as Locale;
  const { openGuideModal } = useGuideModal();
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  const subtitle =
    locale === "es"
      ? t("subtitle_es")
      : locale === "en"
        ? t("subtitle_en")
        : null;

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-end overflow-hidden pt-[100px]"
    >
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={prefersReducedMotion ? undefined : { y }}
        >
          <Image
            src="/images/hero-nice.jpg"
            alt="Côte d'Azur, de Cannes à Menton"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover object-[center_40%] brightness-[0.85] contrast-[0.98] saturate-[0.82]"
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(42,38,34,0.98) 0%, rgba(42,38,34,0.92) 28%, rgba(42,38,34,0.72) 52%, rgba(44,74,82,0.45) 72%, rgba(44,74,82,0.28) 100%), linear-gradient(to bottom, rgba(42,38,34,0.82) 0%, rgba(42,38,34,0.38) 16%, transparent 34%)",
          }}
        />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1160px] px-5 pb-16 md:px-10 md:pb-20">
        <div className="max-w-[680px] [text-shadow:0_2px_18px_rgba(0,0,0,0.35)]">
        <motion.div
          custom={0.15}
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
          className="mb-[22px] inline-flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-cal before:block before:h-px before:w-7 before:bg-sol"
        >
          {t("eyebrow")}
        </motion.div>

        <div className="mb-6">
          <motion.h1
            custom={0.3}
            variants={heroEntrance}
            initial="hidden"
            animate="visible"
            className="font-display text-hero-fr font-semibold text-white"
          >
            <MultilineTitle text={t("title")} />
          </motion.h1>
          <motion.p
            custom={0.42}
            variants={heroEntrance}
            initial="hidden"
            animate="visible"
            className="mt-3 font-script text-hero-slogan text-cal"
          >
            {siteConfig.slogan}
          </motion.p>
          {subtitle && (
            <motion.p
              custom={0.52}
              variants={heroEntrance}
              initial="hidden"
              animate="visible"
              className="mt-2 font-display text-hero-es font-light italic text-sol"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <motion.p
          custom={0.6}
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
          className="mb-10 max-w-[520px] text-[0.97rem] leading-[1.82] text-cal/95 [&_em]:font-semibold [&_em]:not-italic [&_em]:text-white"
        >
          {t.rich("body", {
            em: (chunks) => <em>{chunks}</em>,
          })}
        </motion.p>

        <motion.div
          custom={0.8}
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-3 [text-shadow:none]"
        >
          <a
            href={whatsappUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded bg-terracota px-7 py-3.5 text-[0.86rem] font-semibold text-cal transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(190,91,66,0.38)]"
          >
            💬 {t("cta_primary")}
          </a>
          <button
            type="button"
            onClick={openGuideModal}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded border border-cal/45 bg-tinta/35 px-7 py-3.5 text-[0.86rem] font-medium text-cal backdrop-blur-sm transition-colors hover:border-cal hover:bg-tinta/50"
          >
            {t("cta_secondary")}
          </button>
        </motion.div>

        <motion.div
          custom={1}
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
          className="mt-11 inline-flex items-center gap-2.5 rounded-full border border-cal/25 bg-tinta/45 px-[18px] py-2.5 text-[0.78rem] text-cal/90 backdrop-blur-sm [text-shadow:none]"
        >
          {t("lang_badge")}
        </motion.div>

        <motion.div
          custom={1.1}
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap gap-[52px] border-t border-cal/20 pt-8 [text-shadow:none]"
        >
          <div>
            <span className="block font-display text-[2.7rem] font-semibold leading-none text-white">
              {tStats("reviews_score")}
              <small className="text-[1.7rem] text-sol">{tStats("reviews_suffix")}</small>
            </span>
            <span className="mt-1 block text-[0.68rem] uppercase tracking-wider text-cal/80">
              {tStats("reviews_label")}
            </span>
          </div>
          <div>
            <span className="block font-display text-[2.7rem] font-semibold leading-none text-white">
              {tStats("properties_count")}
            </span>
            <span className="mt-1 block text-[0.68rem] uppercase tracking-wider text-cal/80">
              {tStats("properties_label")}
            </span>
          </div>
          <div>
            <span className="block font-display text-[2.7rem] font-semibold leading-none text-white">
              {tStats("zone_code")}
            </span>
            <span className="mt-1 block text-[0.68rem] uppercase tracking-wider text-cal/80">
              {tStats("zone_label")}
            </span>
          </div>
        </motion.div>
        </div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-1 opacity-70">
        <span className="text-[0.6rem] uppercase tracking-[0.14em] text-cal/80">
          {t("scroll_hint")}
        </span>
        <div className="h-9 w-px bg-gradient-to-b from-sol/80 to-transparent" />
      </div>
    </section>
  );
}
