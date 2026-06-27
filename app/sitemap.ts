import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  return routing.locales.map((locale) => ({
    url: locale === "fr" ? baseUrl : `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: {
      languages: {
        fr: baseUrl,
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
  }));
}
