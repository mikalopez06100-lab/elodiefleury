import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Profile from "@/components/sections/Profile";
import Services from "@/components/sections/Services";
import Gallery from "@/components/sections/Gallery";
import Zones from "@/components/sections/Zones";
import Reviews from "@/components/sections/Reviews";
import Guide from "@/components/sections/Guide";
import CTA from "@/components/sections/CTA";
import { routing, type Locale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <>
      <Hero />
      <Profile />
      <Services />
      <Gallery />
      <Zones />
      <Reviews />
      <Guide />
      <CTA />
    </>
  );
}
