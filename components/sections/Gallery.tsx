import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import RandomPropertyList from "@/components/sections/RandomPropertyList";
import { getPropertyShowcases } from "@/lib/properties";

function Multiline({ text }: { text: string }) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

export default async function Gallery() {
  const t = await getTranslations("gallery");
  const showcases = await getPropertyShowcases();

  return (
    <section id="biens" className="bg-tinta py-[72px] md:py-24">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10">
        <RevealOnScroll>
          <span className="mb-3.5 block text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-sol/60">
            {t("eyebrow")}
          </span>
          <h2 className="font-display text-section font-semibold leading-[1.08] tracking-tight text-cal">
            <Multiline text={t("title")} />
          </h2>
        </RevealOnScroll>

        <RandomPropertyList pool={showcases} />

        <RevealOnScroll delay={0.15}>
          <div className="mt-12 text-center">
            <Link
              href="/biens"
              className="inline-flex items-center gap-2 rounded bg-terracota px-8 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-cal transition-all hover:-translate-y-px hover:opacity-88"
            >
              {t("view_all")}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
