import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-[#111820] py-8 text-center">
      <p className="mb-1 text-[0.73rem] text-white/22">{t("legal")}</p>
      <p className="text-[0.73rem] text-white/22">
        <a
          href={siteConfig.yourbnb}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors hover:text-white/40"
        >
          {t("yourbnb")}
        </a>
      </p>
    </footer>
  );
}
