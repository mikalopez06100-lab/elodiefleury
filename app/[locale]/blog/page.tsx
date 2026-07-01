import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ArticleCard from "@/components/blog/ArticleCard";
import { getArticlesByLocale, blogIndexUrl } from "@/lib/blog";
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
  const t = await getTranslations({ locale, namespace: "blog" });
  const baseUrl = siteConfig.url;

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: blogIndexUrl(locale as Locale, baseUrl),
      languages: {
        fr: `${baseUrl}/blog`,
        es: `${baseUrl}/es/blog`,
        en: `${baseUrl}/en/blog`,
        "x-default": `${baseUrl}/blog`,
      },
    },
  };
}

export default async function BlogIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("blog");
  const articles = getArticlesByLocale(locale);

  return (
    <div className="bg-cal pt-[100px]">
      <div className="border-b border-line bg-cal-dark">
        <div className="mx-auto max-w-[1160px] px-5 py-14 md:px-10 md:py-16">
          <span className="mb-3 block text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-terracota">
            {t("eyebrow")}
          </span>
          <h1 className="mb-3 font-display text-section font-semibold text-mar">
            {t("title")}
          </h1>
          <p className="max-w-2xl text-[0.95rem] leading-relaxed text-tinta-muted">
            {t("subtitle")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1160px] px-5 py-12 md:px-10 md:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              readLabel={t("read_more")}
              minLabel={t("min_read")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
