import Image from "next/image";
import { useTranslations } from "next-intl";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { siteConfig, whatsappUrl } from "@/lib/config";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";

function Multiline({ text }: { text: string }) {
  return text.split("\n").map((line, i, arr) => (
    <span key={i}>
      {line}
      {i < arr.length - 1 && <br />}
    </span>
  ));
}

export default function CTA() {
  const t = useTranslations("cta");
  const locale = useLocale() as Locale;

  const contacts = [
    {
      icon: "💬",
      label: t("whatsapp_label"),
      value: "+33 6 27 12 14 13",
      href: whatsappUrl(locale),
    },
    {
      icon: "✉️",
      label: t("email_label"),
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: "📸",
      label: t("instagram_label"),
      value: "@immo_elo",
      href: siteConfig.instagram,
    },
    {
      icon: "💼",
      label: t("linkedin_label"),
      value: "elodie-immo",
      href: siteConfig.linkedin,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-[88px] md:py-[116px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/properties/fabron-terrace.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_45%] brightness-[0.88] contrast-[0.96] saturate-[0.9]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(42,38,34,0.94) 0%, rgba(42,38,34,0.88) 45%, rgba(42,38,34,0.72) 100%)",
          }}
        />
      </div>

      <div className="relative z-[2] mx-auto max-w-[720px] px-5 text-center md:px-10">
        <RevealOnScroll>
          <h2 className="mb-2 font-display text-[clamp(2.1rem,5vw,3.8rem)] font-semibold leading-[1.07] text-cal">
            <Multiline text={t("title")} />
          </h2>
          <span className="mb-4 block font-script text-[clamp(1.4rem,3.5vw,2.4rem)] text-terracota-light">
            {siteConfig.slogan}
          </span>
          <span className="mb-[26px] block font-display text-[clamp(1.05rem,2.5vw,1.75rem)] italic text-sol">
            {t("subtitle")}
          </span>
          <p className="mb-[42px] text-[0.95rem] leading-relaxed text-cal/85">
            {t("body")}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex min-w-[200px] flex-1 items-center gap-3 rounded-lg border border-cal/20 bg-tinta/40 px-5 py-[17px] backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-sol/60 hover:bg-tinta/55 sm:max-w-[280px] sm:flex-none"
              >
                <span className="text-[1.35rem]">{contact.icon}</span>
                <div className="text-left">
                  <span className="block text-[0.62rem] uppercase tracking-wider text-cal/55">
                    {contact.label}
                  </span>
                  <span className="text-[0.9rem] font-medium text-cal">
                    {contact.value}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
