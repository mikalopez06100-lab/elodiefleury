import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PropertyGrid from "@/components/sections/PropertyGrid";
import { biensIndexUrl, PROPERTY_SHOWCASES } from "@/lib/properties";
import { siteConfig } from "@/lib/config";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "biens" });
  const baseUrl = siteConfig.url;

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: biensIndexUrl(locale, baseUrl),
      languages: {
        fr: `${baseUrl}/biens`,
        es: `${baseUrl}/es/biens`,
        en: `${baseUrl}/en/biens`,
        "x-default": `${baseUrl}/biens`,
      },
    },
  };
}

export default async function BiensPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("biens");

  return (
    <div className="bg-tinta pt-[100px]">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1160px] px-5 py-14 md:px-10 md:py-16">
          <span className="mb-3 block text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-sol/60">
            {t("eyebrow")}
          </span>
          <h1 className="mb-3 font-display text-section font-semibold leading-[1.08] tracking-tight text-cal">
            {t("title")}
          </h1>
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-cal/70">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1160px] px-5 py-12 md:px-10 md:py-16">
        <div className="flex flex-col gap-14">
          {PROPERTY_SHOWCASES.map((showcase, i) => (
            <RevealOnScroll key={showcase.id} delay={i * 0.03}>
              <PropertyGrid showcase={showcase} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
}
