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
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-[88px] md:py-[116px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_55%] brightness-[0.92] contrast-[0.95] saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-[rgba(42,38,34,0.85)]" />
      </div>

      <div className="relative z-[2] mx-auto max-w-[620px] px-5 text-center md:px-10">
        <RevealOnScroll>
          <h2 className="mb-2 font-display text-[clamp(2.1rem,5vw,3.8rem)] font-semibold leading-[1.07] text-cal">
            <Multiline text={t("title")} />
          </h2>
          <span className="mb-4 block font-script text-[clamp(1.4rem,3.5vw,2.4rem)] text-terracota-light">
            {siteConfig.slogan}
          </span>
          <span className="mb-[26px] block font-display text-[clamp(1.1rem,2.8vw,2.1rem)] italic text-sol/78">
            {t("subtitle")}
          </span>
          <p className="mb-[42px] text-[0.93rem] text-white/58">{t("body")}</p>

          <div className="flex flex-wrap justify-center gap-3">
            {contacts.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 rounded-lg border border-sol/20 bg-white/[0.08] px-6 py-[17px] transition-all hover:-translate-y-0.5 hover:border-sol hover:bg-sol/13"
              >
                <span className="text-[1.35rem]">{contact.icon}</span>
                <div className="text-left">
                  <span className="block text-[0.62rem] uppercase tracking-wider text-white/38">
                    {contact.label}
                  </span>
                  <span className="text-[0.9rem] font-medium text-white">
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
