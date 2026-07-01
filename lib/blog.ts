import "server-only";

import { unstable_cache } from "next/cache";
import type { Locale } from "@/i18n/routing";
import { listCmsJsonFiles, readCmsJson } from "@/lib/cms/storage";
import type { BlogArticle } from "@/lib/blog.shared";

export type { BlogArticle, BlogFaq } from "@/lib/blog.shared";

export {
  blogArticleAlternates,
  blogArticleUrl,
  blogIndexUrl,
  defaultBlogArticle,
  estimateReadingTime,
} from "@/lib/blog.shared";

const BLOG_DIR = "content/blog";
const LOCALES: Locale[] = ["fr", "es", "en"];

async function readArticleFile(
  locale: string,
  slug: string
): Promise<BlogArticle | null> {
  return readCmsJson<BlogArticle>(`${BLOG_DIR}/${locale}/${slug}.json`);
}

async function loadArticlesByLocale(locale: string): Promise<BlogArticle[]> {
  const dir = `${BLOG_DIR}/${locale}`;
  const files = await listCmsJsonFiles(dir);

  const articles = (
    await Promise.all(
      files.map(async (file) => readCmsJson<BlogArticle>(file))
    )
  ).filter((item): item is BlogArticle => item !== null);

  return articles.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

const getCachedArticlesByLocale = unstable_cache(
  async (locale: string) => loadArticlesByLocale(locale),
  ["blog-articles-by-locale"],
  { tags: ["blog"] }
);

export async function getArticlesByLocale(
  locale: string
): Promise<BlogArticle[]> {
  return getCachedArticlesByLocale(locale);
}

export async function getArticleBySlug(
  locale: string,
  slug: string
): Promise<BlogArticle | null> {
  return readArticleFile(locale, slug);
}

export async function getAllArticles(): Promise<BlogArticle[]> {
  const articles = await Promise.all(
    LOCALES.map((locale) => getArticlesByLocale(locale))
  );
  return articles.flat();
}

export async function getRelatedArticles(
  locale: string,
  currentSlug: string,
  limit = 2
): Promise<BlogArticle[]> {
  const articles = await getArticlesByLocale(locale);
  return articles.filter((a) => a.slug !== currentSlug).slice(0, limit);
}
