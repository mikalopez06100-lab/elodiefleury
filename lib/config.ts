export const siteConfig = {
  name: "Elodie Fleury",
  tagline: "Immobilier · Conciergerie",
  slogan: "Tu casa, mi pasión",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://elodiefleury.fr",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "33627121413",
  email: "info@elodiefleury.fr",
  instagram: "https://www.instagram.com/immo_elo",
  yourbnb: "https://www.yourbnb06.fr",
  gmb: "https://g.page/r/",
  rsac: "925 155 855",
  plausibleDomain:
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "elodiefleury.fr",
} as const;

export const whatsappMessages = {
  fr: "Bonjour Elodie, je souhaite recevoir le guide acquéreur bilingue.",
  es: "Hola Elodie, me gustaría recibir la guía para compradores bilingüe.",
  en: "Hello Elodie, I would like to receive the bilingual buyer guide.",
} as const;

export function whatsappUrl(
  locale: keyof typeof whatsappMessages,
  customMessage?: string
): string {
  const message = encodeURIComponent(
    customMessage ?? whatsappMessages[locale]
  );
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${message}`;
}
