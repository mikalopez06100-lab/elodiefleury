export const siteConfig = {
  name: "Élodie Fleury",
  tagline: "Côte d'Azur",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://elodiecoteazur.fr",
  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "33778235486",
  email: "hello@elodiefleury.fr",
  instagram: "https://www.instagram.com/immo_elo",
  yourbnb: "https://www.yourbnb06.fr",
  gmb: "https://g.page/r/",
  rsac: "925 155 855",
  plausibleDomain:
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "elodiecoteazur.fr",
} as const;

export const whatsappMessages = {
  fr: "Bonjour Élodie, je souhaite recevoir le guide acquéreur bilingue.",
  es: "Hola Élodie, me gustaría recibir la guía para compradores bilingüe.",
  en: "Hello Élodie, I would like to receive the bilingual buyer guide.",
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
