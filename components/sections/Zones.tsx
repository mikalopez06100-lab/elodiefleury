import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const zones = [
  { key: "nice" as const, image: "nice.jpg" },
  { key: "antibes" as const, image: "antibes.jpg" },
  { key: "cagnes" as const, image: "cagnes.jpg" },
  { key: "biot" as const, image: "biot.jpg" },
];

export default function Zones() {
  const t = useTranslations("zones");

  return (
    <section className="bg-marine py-[72px] md:py-24">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10">
        <RevealOnScroll>
          <span className="mb-3.5 block text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-white/38">
            {t("eyebrow")}
          </span>
          <h2 className="font-display text-section font-semibold leading-[1.08] tracking-tight text-white">
            {t("query")}
          </h2>
        </RevealOnScroll>

        <RevealOnScroll className="mt-12 grid grid-cols-2 gap-0.5">
          {zones.map((zone) => (
            <div
              key={zone.key}
              className="group relative h-[200px] overflow-hidden md:h-[255px]"
            >
              <Image
                src={`/images/zones/${zone.image}`}
                alt={zone.key}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover brightness-[1.05] contrast-[0.95] transition-transform duration-[800ms] ease-out-expo group-hover:scale-[1.07]"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(8,28,46,0.9) 0%, rgba(8,28,46,0.28) 60%, transparent 100%)",
                }}
              />
              <div className="absolute bottom-[18px] left-[18px]">
                <span className="block font-display text-[1.38rem] font-semibold capitalize leading-none text-white">
                  {zone.key === "cagnes" ? "Cagnes" : zone.key.charAt(0).toUpperCase() + zone.key.slice(1)}
                </span>
                <span className="mt-1 block text-[0.62rem] uppercase tracking-wider text-sable">
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
