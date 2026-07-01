import AdminShell from "@/components/admin/AdminShell";
import BlogEditor from "@/components/admin/BlogEditor";
import { defaultBlogArticle } from "@/lib/blog.shared";

export default function AdminBlogNewPage() {
  return (
    <AdminShell
      title="Nouvel article"
      subtitle="Renseignez le contenu HTML, les métadonnées SEO et les questions fréquentes."
    >
      <BlogEditor initial={defaultBlogArticle("fr")} mode="create" />
    </AdminShell>
  );
}
