import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

function Multiline({ text }: { text: string }) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

export default function Profile() {
  const t = useTranslations("profile");

  return (
    <section id="profil" className="py-[72px] md:py-24">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10">
        <RevealOnScroll>
          <span className="mb-3.5 block text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-sable">
            {t("eyebrow")}
          </span>
          <h2 className="mb-4 font-display text-section font-semibold leading-[1.08] tracking-tight text-marine">
            <Multiline text={t("title")} />
          </h2>
        </RevealOnScroll>

        <div className="mt-[60px] grid items-center gap-11 md:grid-cols-2 md:gap-[68px]">
          <RevealOnScroll className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
            <Image
              src="/images/profile-elodie.jpg"
              alt={t("name")}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-[7000ms] ease-out-expo hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-marine/55 to-transparent [background-position:55%]" />
            <div className="absolute bottom-[18px] left-[18px] rounded bg-sable px-4 py-2.5 text-[0.72rem] font-bold uppercase tracking-wide text-marine">
              {t("badge")}
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h3 className="mb-4 font-display text-[1.9rem] font-semibold leading-tight text-marine">
              {t("name")}
            </h3>
            <p className="mb-3.5 text-[0.94rem] leading-[1.84] text-gris [&_strong]:font-semibold [&_strong]:text-marine">
              {t.rich("p1", { strong: (c) => <strong>{c}</strong> })}
            </p>
            <p className="mb-3.5 text-[0.94rem] leading-[1.84] text-gris">
              {t("p2")}
            </p>
            <div className="mt-[26px] flex flex-wrap gap-2">
              <span className="rounded-full bg-marine px-[15px] py-[7px] text-[0.73rem] font-semibold text-sable">
                {t("tag_fr")}
              </span>
              <span className="rounded-full bg-marine px-[15px] py-[7px] text-[0.73rem] font-semibold text-sable">
                {t("tag_es")}
              </span>
              <span className="rounded-full bg-marine px-[15px] py-[7px] text-[0.73rem] font-semibold text-sable">
                {t("tag_en")}
              </span>
              <span className="rounded-full bg-sable-soft px-[15px] py-[7px] text-[0.73rem] font-semibold text-marine">
                {t("tag_reviews")}
              </span>
              <span className="rounded-full bg-sable-soft px-[15px] py-[7px] text-[0.73rem] font-semibold text-marine">
                {t("tag_zones")}
              </span>
            </div>
          </RevealOnScroll>
        </div>

        <RevealOnScroll className="mt-11 grid items-start gap-7 rounded-[10px] bg-sable-soft p-8 md:grid-cols-[1fr_1px_1fr] md:gap-8 md:p-11">
          <div>
            <div className="mb-3 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-sable">
              {t("quote_fr_label")}
            </div>
            <p className="font-display text-[1.15rem] italic leading-relaxed text-marine">
              {t("quote_fr_text")}
            </p>
            <div className="mt-3 text-[0.76rem] text-gris">{t("quote_fr_author")}</div>
          </div>
          <div className="hidden bg-sable opacity-30 md:block" />
          <div>
            <div className="mb-3 text-[0.63rem] font-bold uppercase tracking-[0.14em] text-sable">
              {t("quote_es_label")}
            </div>
            <p className="font-display text-[1.15rem] italic leading-relaxed text-marine">
              {t("quote_es_text")}
            </p>
            <div className="mt-3 text-[0.76rem] text-gris">{t("quote_es_author")}</div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
