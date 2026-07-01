import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ArticleBody from "@/components/blog/ArticleBody";
import ArticleCTA from "@/components/blog/ArticleCTA";
import ArticleHeader from "@/components/blog/ArticleHeader";
import ArticleSidebar from "@/components/blog/ArticleSidebar";
import FAQSection from "@/components/blog/FAQSection";
import RelatedArticles from "@/components/blog/RelatedArticles";
import {
  blogArticleAlternates,
  blogArticleUrl,
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
} from "@/lib/blog";
import { siteConfig } from "@/lib/config";
import { type Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    locale: article.locale,
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  if (!article) return {};

  const baseUrl = siteConfig.url;

  return {
    title: `${article.title} | Elodie Fleury`,
    description: article.description,
    keywords: article.keywords.join(", "),
    alternates: {
      canonical: blogArticleUrl(locale as Locale, slug, baseUrl),
      languages: blogArticleAlternates(article, baseUrl),
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_GB",
      url: blogArticleUrl(locale as Locale, slug, baseUrl),
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);

  const article = getArticleBySlug(locale, slug);
  if (!article) notFound();

  const t = await getTranslations("blog");
  const related = getRelatedArticles(locale, slug);
  const baseUrl = siteConfig.url;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updatedAt,
    author: {
      "@type": "Person",
      name: "Elodie Fleury",
      url: baseUrl,
      jobTitle: "Agent immobilier",
      knowsLanguage: ["fr", "es", "en"],
    },
    publisher: {
      "@type": "Organization",
      name: "Elodie Fleury — Immobilier & Conciergerie",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/profile-elodie.jpg`,
      },
    },
    inLanguage:
      locale === "fr" ? "fr-FR" : locale === "es" ? "es-ES" : "en-GB",
    url: blogArticleUrl(locale as Locale, slug, baseUrl),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": blogArticleUrl(locale as Locale, slug, baseUrl),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumb_home"),
        item: locale === "fr" ? baseUrl : `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb_blog"),
        item:
          locale === "fr" ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: blogArticleUrl(locale as Locale, slug, baseUrl),
      },
    ],
  };

  return (
    <article className="bg-cal pt-[100px]">
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="mx-auto max-w-[1160px] px-5 py-10 md:px-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          <div>
            <ArticleHeader
              article={article}
              locale={locale as Locale}
              breadcrumb={{
                home: t("breadcrumb_home"),
                blog: t("breadcrumb_blog"),
              }}
              authorLabel={t("author")}
              langLinks={{
                fr: t("lang_fr"),
                es: t("lang_es"),
                en: t("lang_en"),
              }}
            />
            <ArticleBody html={article.bodyHtml} />
            <FAQSection
              faqs={article.faqs}
              title={t("faq_title")}
              locale={locale as Locale}
            />
            <ArticleCTA
              locale={locale as Locale}
              title={t("cta_title")}
              body={t("cta_body")}
              whatsappLabel={t("cta_whatsapp")}
              emailLabel={t("cta_email")}
            />
            <RelatedArticles
              articles={related}
              title={t("related_title")}
              readLabel={t("read_more")}
            />
          </div>
          <ArticleSidebar
            locale={locale as Locale}
            whatsappLabel={t("cta_whatsapp")}
            guideLabel={t("sidebar_guide")}
            contactTitle={t("sidebar_contact")}
          />
        </div>
      </div>
    </article>
  );
}
