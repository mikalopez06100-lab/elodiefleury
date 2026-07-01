import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/api";
import { getAllArticles } from "@/lib/blog";
import {
  defaultBlogArticle,
  estimateReadingTime,
  type BlogArticle,
} from "@/lib/blog.shared";
import { revalidateBlogContent } from "@/lib/cms/revalidate";
import { writeCmsJson } from "@/lib/cms/storage";
import type { Locale } from "@/i18n/routing";

const articleSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  locale: z.enum(["fr", "es", "en"]),
  date: z.string().min(1),
  description: z.string().min(1),
  keywords: z.array(z.string()),
  category: z.string().min(1),
  alternates: z.object({
    fr: z.string().min(1),
    es: z.string().min(1),
    en: z.string().min(1),
  }),
  bodyHtml: z.string().min(1),
  faqs: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    })
  ),
});

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const articles = await getAllArticles();
  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const parsed = articleSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_data" }, { status: 400 });
  }

  const data = parsed.data;
  const today = new Date().toISOString().slice(0, 10);
  const article: BlogArticle = {
    ...defaultBlogArticle(data.locale as Locale),
    ...data,
    locale: data.locale as Locale,
    updatedAt: today,
    readingTime: estimateReadingTime(data.bodyHtml),
  };

  await writeCmsJson(
    `content/blog/${article.locale}/${article.slug}.json`,
    article
  );
  revalidateBlogContent();

  return NextResponse.json({ ok: true, article });
}
