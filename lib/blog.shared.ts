import type { Locale } from "@/i18n/routing";

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogArticle = {
  title: string;
  slug: string;
  locale: Locale;
  date: string;
  updatedAt: string;
  description: string;
  keywords: string[];
  category: string;
  readingTime: number;
  alternates: { fr: string; es: string; en: string };
  bodyHtml: string;
  faqs: BlogFaq[];
};

export function blogIndexUrl(locale: Locale, baseUrl: string): string {
  return locale === "fr" ? `${baseUrl}/blog` : `${baseUrl}/${locale}/blog`;
}

export function blogArticleUrl(
  locale: Locale,
  slug: string,
  baseUrl: string
): string {
  const prefix = locale === "fr" ? "" : `/${locale}`;
  return `${baseUrl}${prefix}/blog/${slug}`;
}

export function blogArticleAlternates(
  article: BlogArticle,
  baseUrl: string
): Record<string, string> {
  return {
    fr: blogArticleUrl("fr", article.alternates.fr, baseUrl),
    es: blogArticleUrl("es", article.alternates.es, baseUrl),
    en: blogArticleUrl("en", article.alternates.en, baseUrl),
    "x-default": blogArticleUrl("fr", article.alternates.fr, baseUrl),
  };
}

export function estimateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / 200));
}

export function defaultBlogArticle(locale: Locale): BlogArticle {
  const today = new Date().toISOString().slice(0, 10);
  return {
    title: "",
    slug: "",
    locale,
    date: today,
    updatedAt: today,
    description: "",
    keywords: [],
    category: "conseil",
    readingTime: 5,
    alternates: { fr: "", es: "", en: "" },
    bodyHtml: "<p></p>",
    faqs: [],
  };
}
