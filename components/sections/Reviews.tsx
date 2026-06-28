import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const reviews = [
  { key: "r1" as const, accent: false },
  { key: "r2" as const, accent: false },
  { key: "r3" as const, accent: false },
  { key: "r4" as const, accent: true },
];

export default function Reviews() {
  const t = useTranslations("reviews");

  return (
    <section id="avis" className="py-[72px] md:py-24">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10">
        <RevealOnScroll>
          <span className="mb-3.5 block text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-terracota">
            {t("eyebrow")}
          </span>
          <h2 className="font-display text-section font-semibold leading-[1.08] tracking-tight text-mar">
            {t("title")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll className="mt-9">
          <div className="mb-7 flex flex-wrap items-center gap-[26px] rounded-[9px] bg-mar px-8 py-[26px]">
            <div className="font-display text-[4.2rem] font-semibold leading-none text-sol">
              {t("score")}
            </div>
            <div>
              <strong className="mb-0.5 block text-[0.96rem] text-cal">
                {t("score_label")}
              </strong>
              <span className="text-[0.8rem] text-cal/55">{t("score_source")}</span>
            </div>
          </div>

          <div className="grid gap-[18px] md:grid-cols-2">
            {reviews.map((review) => (
              <article
                key={review.key}
                className={`rounded-[9px] border px-[22px] py-[26px] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(44,74,82,0.09)] ${
                  review.accent
                    ? "border-line bg-sol-soft"
                    : "border-line bg-cal"
                }`}
              >
                <div className="mb-3 text-[0.96rem] tracking-[3px] text-sol">
                  ★★★★★
                </div>
                <p className="mb-4 text-[0.88rem] italic leading-[1.8] text-tinta">
                  {t(`${review.key}_text`)}
                </p>
                <div className="text-[0.73rem] font-semibold uppercase tracking-wider text-tinta-muted">
                  {t(`${review.key}_author`)}
                </div>
                <div className="mt-0.5 text-[0.68rem] text-olivo">
                  {t(`${review.key}_type`)}
                </div>
              </article>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
