import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const properties = [
  {
    key: "villa" as const,
    image: "villa-ext.jpg",
    span: true,
  },
  { key: "appt" as const, image: "grand-sejour.jpg", span: false },
  { key: "terrain" as const, image: "villa-ext2.jpg", span: false },
  { key: "interieur" as const, image: "vue-village.jpg", span: false },
  { key: "luxe" as const, image: "sdb-moderne.jpg", span: false },
];

function Multiline({ text }: { text: string }) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

export default function Gallery() {
  const t = useTranslations("gallery");

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

        <RevealOnScroll className="mt-[52px] overflow-hidden rounded-[10px]">
          <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-[275px_275px]">
            {properties.map((prop) => (
              <div
                key={prop.key}
                className={`group relative h-[200px] overflow-hidden lg:h-auto ${
                  prop.span ? "lg:row-span-2" : ""
                }`}
              >
                <Image
                  src={`/images/properties/${prop.image}`}
                  alt={t(`${prop.key}_title`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover brightness-[1.02] contrast-[0.95] transition-transform duration-700 ease-out-expo group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-tinta/32 transition-colors group-hover:bg-tinta/12" />
                <div className="absolute bottom-3.5 left-3.5 text-white">
                  <span className="mb-0.5 block font-sans text-[0.62rem] uppercase tracking-wider text-sol">
                    {t(`${prop.key}_city`)}
                  </span>
                  <span className="font-display text-[1.05rem] italic opacity-88">
                    {t(`${prop.key}_title`)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
