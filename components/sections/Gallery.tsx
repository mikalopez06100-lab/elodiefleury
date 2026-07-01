import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

type ImageKey = "villa" | "appt" | "terrain" | "interieur" | "luxe";

const showcases: {
  id: "fabron" | "cagnes" | "poetes" | "clemenceau" | "pierlas" | "antibes" | "riquier";
  images: { key: ImageKey; file: string; span: boolean }[];
}[] = [
  {
    id: "fabron",
    images: [
      { key: "villa", file: "fabron-terrace.png", span: true },
      { key: "appt", file: "fabron-sejour.png", span: false },
      { key: "terrain", file: "fabron-cuisine.png", span: false },
      { key: "interieur", file: "fabron-sdb.png", span: false },
      { key: "luxe", file: "fabron-couloir.png", span: false },
    ],
  },
  {
    id: "cagnes",
    images: [
      { key: "villa", file: "cagnes-balcon.png", span: true },
      { key: "appt", file: "cagnes-sejour.png", span: false },
      { key: "terrain", file: "cagnes-chambre.png", span: false },
      { key: "interieur", file: "cagnes-cuisine.png", span: false },
      { key: "luxe", file: "cagnes-studio.png", span: false },
    ],
  },
  {
    id: "poetes",
    images: [
      { key: "villa", file: "poetes-balcon.png", span: true },
      { key: "appt", file: "poetes-sejour.png", span: false },
      { key: "terrain", file: "poetes-chambre.png", span: false },
      { key: "interieur", file: "poetes-cuisine.png", span: false },
      { key: "luxe", file: "poetes-sdb.png", span: false },
    ],
  },
  {
    id: "clemenceau",
    images: [
      { key: "villa", file: "clemenceau-balcon.png", span: true },
      { key: "appt", file: "clemenceau-sejour.png", span: false },
      { key: "terrain", file: "clemenceau-chambre.png", span: false },
      { key: "interieur", file: "clemenceau-cuisine.png", span: false },
      { key: "luxe", file: "clemenceau-sdb.png", span: false },
    ],
  },
  {
    id: "pierlas",
    images: [
      { key: "villa", file: "pierlas-balcon.png", span: true },
      { key: "appt", file: "pierlas-sejour.png", span: false },
      { key: "terrain", file: "pierlas-chambre.png", span: false },
      { key: "interieur", file: "pierlas-cuisine.png", span: false },
      { key: "luxe", file: "pierlas-sdb.png", span: false },
    ],
  },
  {
    id: "antibes",
    images: [
      { key: "villa", file: "antibes-balcon.png", span: true },
      { key: "appt", file: "antibes-sejour.png", span: false },
      { key: "terrain", file: "antibes-chambre.png", span: false },
      { key: "interieur", file: "antibes-cuisine.png", span: false },
      { key: "luxe", file: "antibes-sdb.png", span: false },
    ],
  },
  {
    id: "riquier",
    images: [
      { key: "villa", file: "riquier-balcon.png", span: true },
      { key: "appt", file: "riquier-sejour.png", span: false },
      { key: "terrain", file: "riquier-chambre.png", span: false },
      { key: "interieur", file: "riquier-cuisine.png", span: false },
      { key: "luxe", file: "riquier-sdb.png", span: false },
    ],
  },
];

function Multiline({ text }: { text: string }) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

function PropertyGrid({
  id,
  images,
  t,
}: {
  id: "fabron" | "cagnes" | "poetes" | "clemenceau" | "pierlas" | "antibes" | "riquier";
  images: (typeof showcases)[number]["images"];
  t: ReturnType<typeof useTranslations<"gallery">>;
}) {
  return (
    <div>
      <div className="mb-6">
        <span className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-terracota-light">
          {t(`${id}.label`)}
        </span>
        <p className="font-display text-[1.35rem] font-medium italic text-cal/90">
          {t(`${id}.subtitle`)}
        </p>
      </div>
      <div className="overflow-hidden rounded-[10px]">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-[275px_275px]">
          {images.map((prop) => (
            <div
              key={prop.key}
              className={`group relative h-[200px] overflow-hidden lg:h-auto ${
                prop.span ? "lg:row-span-2" : ""
              }`}
            >
              <Image
                src={`/images/properties/${prop.file}`}
                alt={t(`${id}.${prop.key}_title`)}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover brightness-[1.02] contrast-[0.95] transition-transform duration-700 ease-out-expo group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-tinta/32 transition-colors group-hover:bg-tinta/12" />
              <div className="absolute bottom-3.5 left-3.5 text-white">
                <span className="mb-0.5 block font-sans text-[0.62rem] uppercase tracking-wider text-sol">
                  {t(`${id}.${prop.key}_city`)}
                </span>
                <span className="font-display text-[1.05rem] italic opacity-88">
                  {t(`${id}.${prop.key}_title`)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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

        <div className="mt-[52px] flex flex-col gap-14">
          {showcases.map((showcase, i) => (
            <RevealOnScroll key={showcase.id} delay={i * 0.05}>
              <PropertyGrid id={showcase.id} images={showcase.images} t={t} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
