import type { Locale } from "@/i18n/routing";

export type PropertyImageKey =
  | "villa"
  | "appt"
  | "terrain"
  | "interieur"
  | "luxe";

export const PROPERTY_IMAGE_KEYS: PropertyImageKey[] = [
  "villa",
  "appt",
  "terrain",
  "interieur",
  "luxe",
];

export type PropertyTranslations = {
  label: string;
  subtitle: string;
  villa_city: string;
  villa_title: string;
  appt_city: string;
  appt_title: string;
  terrain_city: string;
  terrain_title: string;
  interieur_city: string;
  interieur_title: string;
  luxe_city: string;
  luxe_title: string;
};

export type PropertyShowcase = {
  id: string;
  published: boolean;
  sortOrder: number;
  images: { key: PropertyImageKey; file: string; span: boolean }[];
  translations: Record<Locale, PropertyTranslations>;
};

export function pickRandomShowcases(
  count: number,
  pool: PropertyShowcase[]
): PropertyShowcase[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function propertyImageSrc(file: string): string {
  if (file.startsWith("http://") || file.startsWith("https://")) {
    return file;
  }
  return `/images/properties/${file}`;
}

export function biensIndexUrl(locale: string, baseUrl: string): string {
  return locale === "fr" ? `${baseUrl}/biens` : `${baseUrl}/${locale}/biens`;
}

export function emptyPropertyTranslations(): PropertyTranslations {
  return {
    label: "",
    subtitle: "",
    villa_city: "",
    villa_title: "",
    appt_city: "",
    appt_title: "",
    terrain_city: "",
    terrain_title: "",
    interieur_city: "",
    interieur_title: "",
    luxe_city: "",
    luxe_title: "",
  };
}

export function defaultPropertyShowcase(id = ""): PropertyShowcase {
  const empty = emptyPropertyTranslations();
  return {
    id,
    published: true,
    sortOrder: 0,
    images: PROPERTY_IMAGE_KEYS.map((key, index) => ({
      key,
      file: "",
      span: index === 0,
    })),
    translations: {
      fr: { ...empty },
      es: { ...empty },
      en: { ...empty },
    },
  };
}
