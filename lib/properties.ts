export type PropertyImageKey = "villa" | "appt" | "terrain" | "interieur" | "luxe";

export type PropertyId =
  | "fabron"
  | "cagnes"
  | "poetes"
  | "clemenceau"
  | "pierlas"
  | "antibes"
  | "riquier"
  | "prefecture"
  | "cannes"
  | "saintlaurent";

export type PropertyShowcase = {
  id: PropertyId;
  images: { key: PropertyImageKey; file: string; span: boolean }[];
};

export const PROPERTY_SHOWCASES: PropertyShowcase[] = [
  {
    id: "fabron",
    images: [
      { key: "villa", file: "fabron-terrace.png", span: true },
      { key: "appt", file: "fabron-sejour.png", span: false },
      { key: "terrain", file: "fabron-cuisine.png", span: false },
      { key: "interieur", file: "fabron-sdb.png", span: false },
      { key: "luxe", file: "fabron-couloir.png", span: false },
    ],
  },
  {
    id: "cagnes",
    images: [
      { key: "villa", file: "cagnes-balcon.png", span: true },
      { key: "appt", file: "cagnes-sejour.png", span: false },
      { key: "terrain", file: "cagnes-chambre.png", span: false },
      { key: "interieur", file: "cagnes-cuisine.png", span: false },
      { key: "luxe", file: "cagnes-studio.png", span: false },
    ],
  },
  {
    id: "poetes",
    images: [
      { key: "villa", file: "poetes-balcon.png", span: true },
      { key: "appt", file: "poetes-sejour.png", span: false },
      { key: "terrain", file: "poetes-chambre.png", span: false },
      { key: "interieur", file: "poetes-cuisine.png", span: false },
      { key: "luxe", file: "poetes-sdb.png", span: false },
    ],
  },
  {
    id: "clemenceau",
    images: [
      { key: "villa", file: "clemenceau-balcon.png", span: true },
      { key: "appt", file: "clemenceau-sejour.png", span: false },
      { key: "terrain", file: "clemenceau-chambre.png", span: false },
      { key: "interieur", file: "clemenceau-cuisine.png", span: false },
      { key: "luxe", file: "clemenceau-sdb.png", span: false },
    ],
  },
  {
    id: "pierlas",
    images: [
      { key: "villa", file: "pierlas-balcon.png", span: true },
      { key: "appt", file: "pierlas-sejour.png", span: false },
      { key: "terrain", file: "pierlas-chambre.png", span: false },
      { key: "interieur", file: "pierlas-cuisine.png", span: false },
      { key: "luxe", file: "pierlas-sdb.png", span: false },
    ],
  },
  {
    id: "antibes",
    images: [
      { key: "villa", file: "antibes-balcon.png", span: true },
      { key: "appt", file: "antibes-sejour.png", span: false },
      { key: "terrain", file: "antibes-chambre.png", span: false },
      { key: "interieur", file: "antibes-cuisine.png", span: false },
      { key: "luxe", file: "antibes-sdb.png", span: false },
    ],
  },
  {
    id: "riquier",
    images: [
      { key: "villa", file: "riquier-balcon.png", span: true },
      { key: "appt", file: "riquier-sejour.png", span: false },
      { key: "terrain", file: "riquier-chambre.png", span: false },
      { key: "interieur", file: "riquier-cuisine.png", span: false },
      { key: "luxe", file: "riquier-sdb.png", span: false },
    ],
  },
  {
    id: "prefecture",
    images: [
      { key: "villa", file: "prefecture-balcon.png", span: true },
      { key: "appt", file: "prefecture-sejour.png", span: false },
      { key: "terrain", file: "prefecture-chambre.png", span: false },
      { key: "interieur", file: "prefecture-cuisine.png", span: false },
      { key: "luxe", file: "prefecture-sdb.png", span: false },
    ],
  },
  {
    id: "cannes",
    images: [
      { key: "villa", file: "cannes-vue.png", span: true },
      { key: "appt", file: "cannes-sejour.png", span: false },
      { key: "terrain", file: "cannes-chambre.png", span: false },
      { key: "interieur", file: "cannes-cuisine.png", span: false },
      { key: "luxe", file: "cannes-sdb.png", span: false },
    ],
  },
  {
    id: "saintlaurent",
    images: [
      { key: "villa", file: "saintlaurent-balcon.png", span: true },
      { key: "appt", file: "saintlaurent-sejour.png", span: false },
      { key: "terrain", file: "saintlaurent-salon.png", span: false },
      { key: "interieur", file: "saintlaurent-cuisine.png", span: false },
      { key: "luxe", file: "saintlaurent-sdb.png", span: false },
    ],
  },
];

export function pickRandomShowcases(
  count: number,
  pool: PropertyShowcase[] = PROPERTY_SHOWCASES
): PropertyShowcase[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function biensIndexUrl(locale: string, baseUrl: string): string {
  return locale === "fr" ? `${baseUrl}/biens` : `${baseUrl}/${locale}/biens`;
}
