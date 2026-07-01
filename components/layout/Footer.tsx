import { useTranslations } from "next-intl";
import BrandLogo from "@/components/brand/BrandLogo";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-line bg-tinta py-10 text-center">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10">
        <BrandLogo variant="light" layout="stacked" className="mx-auto mb-3" />
        <p className="mb-5 font-script text-hero-slogan text-terracota-light">
          {siteConfig.slogan}
        </p>
        <p className="mb-1 text-[0.73rem] text-white/28">{t("legal")}</p>
        <p className="mb-1 text-[0.73rem] text-white/28">
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/45"
          >
            {t("linkedin")}
          </a>
        </p>
        <p className="text-[0.73rem] text-white/28">
          <a
            href={siteConfig.yourbnb}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white/45"
          >
            {t("yourbnb")}
          </a>
        </p>
      </div>
    </footer>
  );
}
