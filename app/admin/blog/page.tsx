import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { getAllArticles } from "@/lib/blog";

export default async function AdminBlogListPage() {
  const articles = await getAllArticles();
  const sorted = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <AdminShell
      title="Articles de blog"
      subtitle="Créez ou modifiez vos articles en français, espagnol et anglais, avec leurs FAQ."
    >
      <div className="mb-6">
        <Link href="/admin/blog/new" className="admin-primary-btn inline-block">
          + Nouvel article
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#ddd6cc] bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[#ece7df] bg-[#faf8f5]">
            <tr>
              <th className="px-4 py-3 font-semibold">Titre</th>
              <th className="px-4 py-3 font-semibold">Langue</th>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">FAQ</th>
              <th className="px-4 py-3 font-semibold" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((article) => (
              <tr key={`${article.locale}-${article.slug}`} className="border-b border-[#f0ebe4]">
                <td className="px-4 py-3">{article.title}</td>
                <td className="px-4 py-3 uppercase">{article.locale}</td>
                <td className="px-4 py-3">
                  {new Date(article.date).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-4 py-3">{article.faqs.length}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/blog/${article.slug}?locale=${article.locale}`}
                    className="font-medium text-[#8b6f61] hover:underline"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
