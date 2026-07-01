import { Link } from "@/i18n/navigation";
import type { BlogArticle } from "@/lib/blog.shared";
import type { Locale } from "@/i18n/routing";

type Props = {
  article: BlogArticle;
  locale: Locale;
  breadcrumb: { home: string; blog: string };
  authorLabel: string;
  langLinks: { fr: string; es: string; en: string };
};

const localeFlags: Record<Locale, string> = {
  fr: "🇫🇷",
  es: "🇪🇸",
  en: "🇬🇧",
};

export default function ArticleHeader({
  article,
  locale,
  breadcrumb,
  authorLabel,
  langLinks,
}: Props) {
  const shortTitle =
    article.title.length > 48
      ? `${article.title.slice(0, 48)}…`
      : article.title;

  return (
    <header className="mb-8 border-b border-line pb-8">
      <nav
        aria-label="Breadcrumb"
        className="mb-5 text-[0.72rem] text-tinta-muted"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="transition-colors hover:text-terracota">
              {breadcrumb.home}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li>
            <Link href="/blog" className="transition-colors hover:text-terracota">
              {breadcrumb.blog}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-mar">{shortTitle}</li>
        </ol>
      </nav>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-sol-soft px-3 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-olivo">
          {article.category}
        </span>
        <span className="text-[0.72rem] text-tinta-muted">
          {article.readingTime} min ·{" "}
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </span>
      </div>

      <h1 className="mb-3 font-display text-[clamp(1.75rem,4vw,2.4rem)] font-semibold leading-tight text-mar">
        {article.title}
      </h1>
      <p className="mb-4 max-w-2xl font-display text-[1.05rem] italic text-tinta-muted">
        {article.description}
      </p>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-[0.8rem] font-medium text-olivo">{authorLabel}</p>
        <div className="flex items-center gap-2">
          {(["fr", "es", "en"] as Locale[]).map((loc) => {
            if (loc === locale) return null;
            const slug = article.alternates[loc];
            return (
              <Link
                key={loc}
                href={`/blog/${slug}`}
                locale={loc}
                className="rounded border border-line px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-tinta-muted transition-colors hover:border-sol hover:text-mar"
              >
                {localeFlags[loc]} {langLinks[loc]}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
