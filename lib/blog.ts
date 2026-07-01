import fs from "fs";
import path from "path";
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

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const LOCALES: Locale[] = ["fr", "es", "en"];

function readArticleFile(locale: string, slug: string): BlogArticle | null {
  const filepath = path.join(CONTENT_DIR, locale, `${slug}.json`);
  if (!fs.existsSync(filepath)) return null;
  const raw = fs.readFileSync(filepath, "utf8");
  return JSON.parse(raw) as BlogArticle;
}

export function getArticlesByLocale(locale: string): BlogArticle[] {
  const dir = path.join(CONTENT_DIR, locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf8");
      return JSON.parse(raw) as BlogArticle;
    })
    .sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getArticleBySlug(
  locale: string,
  slug: string
): BlogArticle | null {
  return readArticleFile(locale, slug);
}

export function getAllArticles(): BlogArticle[] {
  return LOCALES.flatMap((locale) => getArticlesByLocale(locale));
}

export function getRelatedArticles(
  locale: string,
  currentSlug: string,
  limit = 2
): BlogArticle[] {
  return getArticlesByLocale(locale)
    .filter((a) => a.slug !== currentSlug)
    .slice(0, limit);
}

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
