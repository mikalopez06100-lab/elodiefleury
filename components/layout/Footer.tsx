import { useTranslations } from "next-intl";
import BrandLogo from "@/components/brand/BrandLogo";
import { siteConfig } from "@/lib/config";

const socialLinks = [
  {
    key: "linkedin" as const,
    href: siteConfig.linkedin,
    icon: "💼",
    value: "elodie-immo",
  },
  {
    key: "instagram" as const,
    href: siteConfig.instagram,
    icon: "📸",
    value: "@immo_elo",
  },
];

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-line bg-tinta py-10 text-center">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10">
        <BrandLogo variant="light" layout="stacked" className="mx-auto mb-3" />
        <p className="mb-6 font-script text-hero-slogan text-terracota-light">
          {siteConfig.slogan}
        </p>

        <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-white/[0.06] px-4 py-2.5 text-[0.78rem] text-cal/85 transition-colors hover:border-sol/40 hover:bg-white/[0.1] hover:text-cal"
            >
              <span aria-hidden>{link.icon}</span>
              <span className="font-medium">{t(link.key)}</span>
              <span className="text-cal/55">· {link.value}</span>
            </a>
          ))}
        </div>

        <p className="mb-2 text-[0.73rem] text-white/28">{t("legal")}</p>
        <p className="text-[0.73rem] text-white/40">
          <a
            href={siteConfig.yourbnb}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/65"
          >
            {t("yourbnb")}
          </a>
        </p>
      </div>
    </footer>
  );
}
