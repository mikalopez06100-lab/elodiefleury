import type { MetadataRoute } from "next";
import {
  blogArticleUrl,
  blogIndexUrl,
  getAllArticles,
} from "@/lib/blog";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const articles = getAllArticles();

  const homePages = routing.locales.map((locale) => ({
    url: locale === "fr" ? baseUrl : `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: {
        fr: baseUrl,
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
        "x-default": baseUrl,
      },
    },
  }));

  const blogIndexes = routing.locales.map((locale) => ({
    url: blogIndexUrl(locale, baseUrl),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
    alternates: {
      languages: {
        fr: `${baseUrl}/blog`,
        es: `${baseUrl}/es/blog`,
        en: `${baseUrl}/en/blog`,
        "x-default": `${baseUrl}/blog`,
      },
    },
  }));

  const articlePages = articles.map((article) => ({
    url: blogArticleUrl(article.locale, article.slug, baseUrl),
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...homePages, ...blogIndexes, ...articlePages];
}
