import { Link } from "@/i18n/navigation";
import type { BlogArticle } from "@/lib/blog.shared";

type Props = {
  article: BlogArticle;
  readLabel: string;
  minLabel: string;
};

export default function ArticleCard({ article, readLabel, minLabel }: Props) {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group flex flex-col rounded-[10px] border border-line bg-cal p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sol hover:shadow-[0_12px_36px_rgba(44,74,82,0.1)]"
    >
      <div className="mb-3 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-wider text-olivo">
        <time dateTime={article.date}>
          {new Date(article.date).toLocaleDateString(article.locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        <span aria-hidden>·</span>
        <span>
          {article.readingTime} {minLabel}
        </span>
      </div>
      <h2 className="mb-2 font-display text-[1.2rem] font-semibold leading-snug text-mar transition-colors group-hover:text-terracota">
        {article.title}
      </h2>
      <p className="mb-4 flex-1 text-[0.88rem] leading-relaxed text-tinta-muted">
        {article.description}
      </p>
      <span className="text-[0.78rem] font-semibold text-terracota transition-colors group-hover:text-mar">
        {readLabel} →
      </span>
    </Link>
  );
}
