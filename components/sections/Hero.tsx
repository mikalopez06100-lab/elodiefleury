"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useRef } from "react";
import { heroEntrance } from "@/lib/animations";
import { whatsappUrl } from "@/lib/config";
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
            alt="Promenade des Anglais, Nice"
            fill
            priority
            quality={80}
            sizes="100vw"
            className="object-cover object-[center_40%] brightness-[1.05] contrast-[0.95]"
          />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,28,46,0.94) 0%, rgba(8,28,46,0.6) 50%, rgba(8,28,46,0.25) 100%)",
          }}
        />
      </div>

      <div className="relative z-[2] mx-auto w-full max-w-[1160px] px-5 pb-16 md:px-10 md:pb-20">
        <motion.div
          custom={0.15}
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
          className="mb-[22px] inline-flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-sable before:block before:h-px before:w-7 before:bg-sable/70"
        >
          {t("eyebrow")}
        </motion.div>

        <div className="mb-8">
          <motion.h1
            custom={0.3}
            variants={heroEntrance}
            initial="hidden"
            animate="visible"
            className="font-display text-hero-fr font-semibold text-white"
          >
            <MultilineTitle text={t("title")} />
          </motion.h1>
          {subtitle && (
            <motion.p
              custom={0.52}
              variants={heroEntrance}
              initial="hidden"
              animate="visible"
              className="mt-2 font-display text-hero-es font-light italic text-sable"
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
          className="mb-10 max-w-[520px] text-[0.97rem] leading-[1.82] text-white/72 [&_em]:font-medium [&_em]:not-italic [&_em]:text-sable"
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
          className="flex flex-wrap gap-3"
        >
          <a
            href={whatsappUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded bg-sable px-7 py-3.5 text-[0.86rem] font-semibold text-marine transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(200,169,122,0.38)]"
          >
            💬 {t("cta_primary")}
          </a>
          <a
            href="#guide"
            className="inline-flex items-center gap-2 whitespace-nowrap rounded border border-white/28 px-7 py-3.5 text-[0.86rem] text-white/85 transition-colors hover:border-sable hover:text-sable"
          >
            {t("cta_secondary")}
          </a>
        </motion.div>

        <motion.div
          custom={1}
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
          className="mt-11 inline-flex items-center gap-2.5 rounded-full border border-sable/22 bg-white/[0.07] px-[18px] py-2.5 text-[0.78rem] text-white/55"
        >
          {t("lang_badge")}
        </motion.div>

        <motion.div
          custom={1.1}
          variants={heroEntrance}
          initial="hidden"
          animate="visible"
          className="mt-10 flex flex-wrap gap-[52px] border-t border-white/10 pt-8"
        >
          <div>
            <span className="block font-display text-[2.7rem] font-semibold leading-none text-sable">
              {tStats("reviews_score")}
              <small className="text-[1.7rem]">{tStats("reviews_suffix")}</small>
            </span>
            <span className="mt-1 block text-[0.68rem] uppercase tracking-wider text-white/42">
              {tStats("reviews_label")}
            </span>
          </div>
          <div>
            <span className="block font-display text-[2.7rem] font-semibold leading-none text-sable">
              {tStats("properties_count")}
            </span>
            <span className="mt-1 block text-[0.68rem] uppercase tracking-wider text-white/42">
              {tStats("properties_label")}
            </span>
          </div>
          <div>
            <span className="block font-display text-[2.7rem] font-semibold leading-none text-sable">
              {tStats("zone_code")}
            </span>
            <span className="mt-1 block text-[0.68rem] uppercase tracking-wider text-white/42">
              {tStats("zone_label")}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-7 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-1 opacity-45">
        <span className="text-[0.6rem] uppercase tracking-[0.14em] text-white/50">
          {t("scroll_hint")}
        </span>
        <div className="h-9 w-px bg-gradient-to-b from-sable/80 to-transparent" />
      </div>
    </section>
  );
}
