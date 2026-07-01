import { Link } from "@/i18n/navigation";
import type { BlogArticle } from "@/lib/blog.shared";

type Props = {
  articles: BlogArticle[];
  title: string;
  readLabel: string;
};

export default function RelatedArticles({
  articles,
  title,
  readLabel,
}: Props) {
  if (articles.length === 0) return null;

  return (
    <section className="mt-12 border-t border-line pt-10">
      <h2 className="mb-6 font-display text-[1.4rem] font-semibold text-mar">
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="group rounded-lg border border-line bg-cal p-5 transition-all hover:border-sol hover:shadow-md"
          >
            <h3 className="mb-2 font-display text-[1.05rem] font-semibold leading-snug text-mar group-hover:text-terracota">
              {article.title}
            </h3>
            <span className="text-[0.78rem] font-semibold text-terracota">
              {readLabel} →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
