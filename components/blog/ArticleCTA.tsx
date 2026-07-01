import { siteConfig, whatsappUrl } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  title: string;
  body: string;
  whatsappLabel: string;
  emailLabel: string;
  variant?: "inline" | "final";
};

export default function ArticleCTA({
  locale,
  title,
  body,
  whatsappLabel,
  emailLabel,
  variant = "final",
}: Props) {
  if (variant === "final") {
    return (
      <section className="mt-12 rounded-[10px] bg-mar px-6 py-10 text-center md:px-10">
        <h2 className="mb-3 font-display text-[1.6rem] font-semibold text-cal md:text-[1.9rem]">
          {title}
        </h2>
        <p className="mx-auto mb-6 max-w-md text-[0.9rem] text-cal/70">{body}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={whatsappUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded bg-terracota px-6 py-3 text-[0.86rem] font-semibold text-cal transition-opacity hover:opacity-90"
          >
            💬 {whatsappLabel}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 rounded border border-cal/30 px-6 py-3 text-[0.86rem] font-medium text-cal transition-colors hover:border-cal"
          >
            ✉️ {emailLabel}
          </a>
        </div>
      </section>
    );
  }

  return null;
}
