import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const zones = [
  {
    key: "cannes" as const,
    image: "/images/properties/cannes-sejour.png",
    label: "Cannes",
    objectPosition: "center 40%",
  },
  {
    key: "nice" as const,
    image: "/images/properties/fabron-terrace.png",
    label: "Nice",
    objectPosition: "center 55%",
  },
  {
    key: "antibes" as const,
    image: "/images/properties/antibes-balcon.png",
    label: "Antibes",
    objectPosition: "center center",
  },
  {
    key: "menton" as const,
    image: "/images/properties/saintlaurent-balcon.png",
    label: "Menton",
    objectPosition: "center 35%",
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

export default function Zones() {
  const t = useTranslations("zones");

  return (
    <section className="bg-mar py-[72px] md:py-24">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10">
        <RevealOnScroll>
          <span className="mb-3.5 block text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-sol/60">
            {t("eyebrow")}
          </span>
          <h2 className="font-display text-section font-semibold leading-[1.08] tracking-tight text-cal">
            <Multiline text={t("query")} />
          </h2>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 grid grid-cols-2 gap-0.5">
          {zones.map((zone) => (
            <div
              key={zone.key}
              className="group relative h-[200px] overflow-hidden md:h-[255px]"
            >
              <Image
                src={zone.image}
                alt={`${zone.label} — bien présenté par Elodie Fleury`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover brightness-[1.02] contrast-[0.95] transition-transform duration-[800ms] ease-out-expo group-hover:scale-[1.07]"
                style={{ objectPosition: zone.objectPosition }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(42,38,34,0.9) 0%, rgba(44,74,82,0.28) 60%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-[18px] left-[18px]">
                <span className="block font-display text-[1.38rem] font-semibold leading-none text-cal">
                  {zone.label}
                </span>
                <span className="mt-1 block text-[0.62rem] uppercase tracking-wider text-sol">
                  {t(`${zone.key}_dept`)}
                </span>
              </div>
            </div>
          ))}
        </RevealOnScroll>
      </div>
    </section>
  );
}
