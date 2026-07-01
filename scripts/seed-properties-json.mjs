import fs from "fs";
import path from "path";

const root = process.cwd();
const showcases = [
  { id: "fabron", images: [
    { key: "villa", file: "fabron-terrace.png", span: true },
    { key: "appt", file: "fabron-sejour.png", span: false },
    { key: "terrain", file: "fabron-cuisine.png", span: false },
    { key: "interieur", file: "fabron-sdb.png", span: false },
    { key: "luxe", file: "fabron-couloir.png", span: false },
  ]},
  { id: "cagnes", images: [
    { key: "villa", file: "cagnes-balcon.png", span: true },
    { key: "appt", file: "cagnes-sejour.png", span: false },
    { key: "terrain", file: "cagnes-chambre.png", span: false },
    { key: "interieur", file: "cagnes-cuisine.png", span: false },
    { key: "luxe", file: "cagnes-studio.png", span: false },
  ]},
  { id: "poetes", images: [
    { key: "villa", file: "poetes-balcon.png", span: true },
    { key: "appt", file: "poetes-sejour.png", span: false },
    { key: "terrain", file: "poetes-chambre.png", span: false },
    { key: "interieur", file: "poetes-cuisine.png", span: false },
    { key: "luxe", file: "poetes-sdb.png", span: false },
  ]},
  { id: "clemenceau", images: [
    { key: "villa", file: "clemenceau-balcon.png", span: true },
    { key: "appt", file: "clemenceau-sejour.png", span: false },
    { key: "terrain", file: "clemenceau-chambre.png", span: false },
    { key: "interieur", file: "clemenceau-cuisine.png", span: false },
    { key: "luxe", file: "clemenceau-sdb.png", span: false },
  ]},
  { id: "pierlas", images: [
    { key: "villa", file: "pierlas-balcon.png", span: true },
    { key: "appt", file: "pierlas-sejour.png", span: false },
    { key: "terrain", file: "pierlas-chambre.png", span: false },
    { key: "interieur", file: "pierlas-cuisine.png", span: false },
    { key: "luxe", file: "pierlas-sdb.png", span: false },
  ]},
  { id: "antibes", images: [
    { key: "villa", file: "antibes-balcon.png", span: true },
    { key: "appt", file: "antibes-sejour.png", span: false },
    { key: "terrain", file: "antibes-chambre.png", span: false },
    { key: "interieur", file: "antibes-cuisine.png", span: false },
    { key: "luxe", file: "antibes-sdb.png", span: false },
  ]},
  { id: "riquier", images: [
    { key: "villa", file: "riquier-balcon.png", span: true },
    { key: "appt", file: "riquier-sejour.png", span: false },
    { key: "terrain", file: "riquier-chambre.png", span: false },
    { key: "interieur", file: "riquier-cuisine.png", span: false },
    { key: "luxe", file: "riquier-sdb.png", span: false },
  ]},
  { id: "prefecture", images: [
    { key: "villa", file: "prefecture-balcon.png", span: true },
    { key: "appt", file: "prefecture-sejour.png", span: false },
    { key: "terrain", file: "prefecture-chambre.png", span: false },
    { key: "interieur", file: "prefecture-cuisine.png", span: false },
    { key: "luxe", file: "prefecture-sdb.png", span: false },
  ]},
  { id: "cannes", images: [
    { key: "villa", file: "cannes-vue.png", span: true },
    { key: "appt", file: "cannes-sejour.png", span: false },
    { key: "terrain", file: "cannes-chambre.png", span: false },
    { key: "interieur", file: "cannes-cuisine.png", span: false },
    { key: "luxe", file: "cannes-sdb.png", span: false },
  ]},
  { id: "saintlaurent", images: [
    { key: "villa", file: "saintlaurent-balcon.png", span: true },
    { key: "appt", file: "saintlaurent-sejour.png", span: false },
    { key: "terrain", file: "saintlaurent-salon.png", span: false },
    { key: "interieur", file: "saintlaurent-cuisine.png", span: false },
    { key: "luxe", file: "saintlaurent-sdb.png", span: false },
  ]},
];

const locales = ["fr", "es", "en"];
const messages = Object.fromEntries(
  locales.map((locale) => [
    locale,
    JSON.parse(
      fs.readFileSync(path.join(root, "i18n/messages", `${locale}.json`), "utf8")
    ).gallery,
  ])
);

const outDir = path.join(root, "content/properties");
fs.mkdirSync(outDir, { recursive: true });

showcases.forEach((showcase, index) => {
  const translations = Object.fromEntries(
    locales.map((locale) => {
      const g = messages[locale][showcase.id];
      const {
        label,
        subtitle,
        villa_city,
        villa_title,
        appt_city,
        appt_title,
        terrain_city,
        terrain_title,
        interieur_city,
        interieur_title,
        luxe_city,
        luxe_title,
      } = g;
      return [
        locale,
        {
          label,
          subtitle,
          villa_city,
          villa_title,
          appt_city,
          appt_title,
          terrain_city,
          terrain_title,
          interieur_city,
          interieur_title,
          luxe_city,
          luxe_title,
        },
      ];
    })
  );

  const data = {
    id: showcase.id,
    published: true,
    sortOrder: index,
    images: showcase.images,
    translations,
  };

  fs.writeFileSync(
    path.join(outDir, `${showcase.id}.json`),
    JSON.stringify(data, null, 2) + "\n"
  );
  console.log("wrote", showcase.id);
});
