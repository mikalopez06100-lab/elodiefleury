import type { Metadata } from "next";
import { Cormorant_Garamond, Dancing_Script, Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";
import { GuideModalProvider } from "@/components/guide/GuideModalProvider";
import LangBar from "@/components/layout/LangBar";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { routing, type Locale } from "@/i18n/routing";
import { siteConfig } from "@/lib/config";
import "../globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-script",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const baseUrl = siteConfig.url;
  const path = locale === "fr" ? "" : `/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${baseUrl}${path}`,
      languages: {
        fr: baseUrl,
        es: `${baseUrl}/es`,
        en: `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${baseUrl}${path}`,
      images: [`/og/og-${locale}.jpg`],
      type: "website",
      locale: locale === "fr" ? "fr_FR" : locale === "es" ? "es_ES" : "en_GB",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Elodie Fleury",
  description:
    "Agente immobilière indépendante bilingue FR/ES sur la Côte d'Azur. Vente, achat et conciergerie saisonnière à Nice, Antibes, Cagnes.",
  url: siteConfig.url,
  telephone: "+33778235486",
  email: siteConfig.email,
  image: `${siteConfig.url}/images/profile-elodie.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nice",
    addressRegion: "Alpes-Maritimes",
    postalCode: "06000",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.7102,
    longitude: 7.262,
  },
  areaServed: [
    { "@type": "City", name: "Nice" },
    { "@type": "City", name: "Antibes" },
    { "@type": "City", name: "Cagnes-sur-Mer" },
    { "@type": "City", name: "Biot" },
  ],
  knowsLanguage: ["fr", "es", "en"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "18",
    bestRating: "5",
  },
  sameAs: [siteConfig.instagram, siteConfig.yourbnb],
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${montserrat.variable} ${dancingScript.variable}`}>
      <body className="overflow-x-hidden bg-cal font-sans text-tinta antialiased">
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <NextIntlClientProvider messages={messages}>
          <GuideModalProvider>
            <LangBar />
            <Nav />
            <main>{children}</main>
            <Footer />
            <WhatsAppButton />
          </GuideModalProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
