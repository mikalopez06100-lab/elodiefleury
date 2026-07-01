"use client";

import { useGuideModal } from "@/components/guide/GuideModalProvider";
import { Link } from "@/i18n/navigation";
import { siteConfig, whatsappUrl } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

type Props = {
  locale: Locale;
  whatsappLabel: string;
  guideLabel: string;
  contactTitle: string;
};

export default function ArticleSidebar({
  locale,
  whatsappLabel,
  guideLabel,
  contactTitle,
}: Props) {
  const { openGuideModal } = useGuideModal();

  return (
    <aside className="space-y-4 lg:sticky lg:top-[120px]">
      <div className="rounded-[10px] border border-line bg-cal p-5">
        <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-wider text-olivo">
          {contactTitle}
        </p>
        <a
          href={whatsappUrl(locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-2 flex w-full items-center justify-center gap-2 rounded bg-terracota px-4 py-3 text-[0.82rem] font-semibold text-cal transition-opacity hover:opacity-90"
        >
          💬 {whatsappLabel}
        </a>
        <button
          type="button"
          onClick={openGuideModal}
          className="flex w-full items-center justify-center gap-2 rounded border border-line bg-cal-dark px-4 py-3 text-[0.82rem] font-medium text-mar transition-colors hover:border-sol"
        >
          📄 {guideLabel}
        </button>
      </div>
      <div className="rounded-[10px] bg-mar p-5 text-center">
        <p className="font-script text-[1.4rem] text-terracota-light">
          {siteConfig.slogan}
        </p>
        <p className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-sol/80">
          {siteConfig.tagline}
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-[0.78rem] font-semibold text-cal/80 transition-colors hover:text-cal"
        >
          elodiecoteazur.fr →
        </Link>
      </div>
    </aside>
  );
}
