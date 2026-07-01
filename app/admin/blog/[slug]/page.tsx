import { notFound } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import BlogEditor from "@/components/admin/BlogEditor";
import { getArticleBySlug } from "@/lib/blog";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
};

export default async function AdminBlogEditPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { locale = "fr" } = await searchParams;
  const article = await getArticleBySlug(locale, slug);

  if (!article) notFound();

  return (
    <AdminShell
      title="Modifier l'article"
      subtitle={`${article.title} · ${locale.toUpperCase()}`}
    >
      <BlogEditor initial={article} mode="edit" />
    </AdminShell>
  );
}
