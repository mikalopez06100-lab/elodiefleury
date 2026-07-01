import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/api";
import {
  estimateReadingTime,
  type BlogArticle,
} from "@/lib/blog.shared";
import { getArticleBySlug } from "@/lib/blog";
import { revalidateBlogContent } from "@/lib/cms/revalidate";
import { deleteCmsFile, writeCmsJson } from "@/lib/cms/storage";
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

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(
  _request: Request,
  context: RouteContext
) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { slug } = await context.params;
  const { searchParams } = new URL(_request.url);
  const locale = searchParams.get("locale") ?? "fr";
  const article = await getArticleBySlug(locale, slug);

  if (!article) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ article });
}

export async function PUT(
  request: Request,
  context: RouteContext
) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { slug: previousSlug } = await context.params;
  const { searchParams } = new URL(request.url);
  const previousLocale = searchParams.get("locale") ?? "fr";

  const parsed = articleSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_data" }, { status: 400 });
  }

  const data = parsed.data;
  const existing = await getArticleBySlug(previousLocale, previousSlug);
  const today = new Date().toISOString().slice(0, 10);

  const article: BlogArticle = {
    ...(existing ?? {
      slug: data.slug,
      locale: data.locale as Locale,
      date: data.date,
    }),
    ...data,
    locale: data.locale as Locale,
    updatedAt: today,
    readingTime: estimateReadingTime(data.bodyHtml),
  };

  if (previousLocale !== article.locale || previousSlug !== article.slug) {
    await deleteCmsFile(
      `content/blog/${previousLocale}/${previousSlug}.json`
    );
  }

  await writeCmsJson(
    `content/blog/${article.locale}/${article.slug}.json`,
    article
  );
  revalidateBlogContent();

  return NextResponse.json({ ok: true, article });
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { slug } = await context.params;
  const { searchParams } = new URL(_request.url);
  const locale = searchParams.get("locale") ?? "fr";

  await deleteCmsFile(`content/blog/${locale}/${slug}.json`);
  revalidateBlogContent();

  return NextResponse.json({ ok: true });
}
