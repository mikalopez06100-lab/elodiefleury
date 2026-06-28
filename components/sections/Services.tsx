import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

const services = [
  {
    key: "vente" as const,
    icon: "🏠",
    image: "/images/properties/sejour-poutres.jpg",
  },
  {
    key: "achat" as const,
    icon: "🔑",
    image: "/images/properties/cuisine-ouverte.jpg",
  },
  {
    key: "concierge" as const,
    icon: "🌊",
    image: "/images/properties/terrasse-jardin.jpg",
  },
];

export default function Services() {
  const t = useTranslations("services");

  return (
    <section id="services" className="bg-cal-dark py-[72px] md:py-24">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10">
        <RevealOnScroll>
          <span className="mb-3.5 block text-[0.66rem] font-semibold uppercase tracking-[0.15em] text-terracota">
            {t("eyebrow")}
          </span>
          <h2 className="font-display text-section font-semibold leading-[1.08] tracking-tight text-mar">
            {t("title")}
          </h2>
        </RevealOnScroll>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <RevealOnScroll key={service.key} delay={i * 0.08}>
              <article className="group overflow-hidden rounded-[9px] border border-line bg-cal transition-all duration-300 ease-out-expo hover:-translate-y-[5px] hover:shadow-[0_18px_44px_rgba(44,74,82,0.12)]">
                <div className="relative h-[195px] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={t(`${service.key}_title`)}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover brightness-[1.02] contrast-[0.95] transition-transform duration-[7000ms] ease-out-expo group-hover:scale-[1.06]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mar/52 to-transparent" />
                </div>
                <div className="px-6 py-[22px]">
                  <div className="mb-2.5 text-[1.35rem]">{service.icon}</div>
                  <h3 className="mb-2 font-display text-[1.28rem] font-semibold text-mar">
                    {t(`${service.key}_title`)}
                  </h3>
                  <p className="text-[0.855rem] leading-[1.78] text-tinta-muted">
                    {t(`${service.key}_desc`)}
                  </p>
                  <span className="mt-3 block text-[0.65rem] font-semibold uppercase tracking-wider text-olivo">
                    {t("lang_badge")}
                  </span>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
