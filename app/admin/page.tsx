import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import { getAllArticles } from "@/lib/blog";
import { getAllPropertyShowcases } from "@/lib/properties";

export default async function AdminDashboardPage() {
  const [articles, properties] = await Promise.all([
    getAllArticles(),
    getAllPropertyShowcases(),
  ]);

  const frArticles = articles.filter((article) => article.locale === "fr");

  return (
    <AdminShell
      title="Tableau de bord"
      subtitle="Publiez des articles de blog et ajoutez de nouveaux biens à présenter sur le site."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-xl border border-[#ddd6cc] bg-white p-6">
          <h2 className="font-display text-2xl font-semibold">Blog</h2>
          <p className="mt-2 text-sm text-[#5c564f]">
            {frArticles.length} article(s) publié(s) en français
          </p>
          <div className="mt-5 flex gap-3">
            <Link href="/admin/blog" className="admin-primary-btn inline-block">
              Gérer le blog
            </Link>
            <Link href="/admin/blog/new" className="admin-secondary-btn inline-block">
              Nouvel article
            </Link>
          </div>
        </section>

        <section className="rounded-xl border border-[#ddd6cc] bg-white p-6">
          <h2 className="font-display text-2xl font-semibold">Biens</h2>
          <p className="mt-2 text-sm text-[#5c564f]">
            {properties.length} bien(s) configuré(s)
          </p>
          <div className="mt-5 flex gap-3">
            <Link href="/admin/properties" className="admin-primary-btn inline-block">
              Gérer les biens
            </Link>
            <Link
              href="/admin/properties/new"
              className="admin-secondary-btn inline-block"
            >
              Nouveau bien
            </Link>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
