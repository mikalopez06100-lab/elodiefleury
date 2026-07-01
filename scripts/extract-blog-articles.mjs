import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as cheerio from "cheerio";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HTML_PATH = path.join(
  ROOT,
  "..",
  "..",
  "Desktop",
  "MasterPrompt",
  "analyse",
  "Elodie Fleury",
  "files",
  "blog-articles-elodie-fleury.html"
);
const OUT_DIR = path.join(ROOT, "content", "blog");

const ARTICLES = [
  {
    id: "a1",
    category: "conseil",
    readingTime: 6,
    date: "2026-07-01",
    slugs: {
      fr: "agent-immobilier-espagnol-cote-azur",
      es: "agente-inmobiliario-espanol-costa-azul",
      en: "spanish-speaking-estate-agent-french-riviera",
    },
    titles: {
      fr: "Agent immobilier espagnol sur la Côte d'Azur — pourquoi le choix de la langue change tout",
      es: "Agente inmobiliario español en la Costa Azul — por qué el idioma lo cambia todo",
      en: "Spanish-speaking estate agent on the French Riviera — why language changes everything",
    },
    keywords: {
      fr: [
        "agent immobilier espagnol Nice",
        "agent bilingue Côte d'Azur",
        "achat immobilier hispanophone France",
      ],
      es: [
        "agente inmobiliario español Niza",
        "agente bilingüe Costa Azul",
        "compra inmueble hispanohablante Francia",
      ],
      en: [
        "Spanish speaking estate agent Nice",
        "bilingual agent French Riviera",
        "hispanic buyer property France",
      ],
    },
  },
  {
    id: "a2",
    category: "guide",
    readingTime: 8,
    date: "2026-07-01",
    slugs: {
      fr: "acheter-appartement-nice-etranger-non-resident",
      es: "comprar-piso-niza-no-residente",
      en: "buying-property-nice-foreigner-non-resident",
    },
    titles: {
      fr: "Acheter un appartement à Nice en tant qu'étranger non-résident : le guide complet 2026",
      es: "Comprar un piso en Niza como extranjero no residente: guía completa 2026",
      en: "Buying an apartment in Nice as a foreign non-resident: complete 2026 guide",
    },
    keywords: {
      fr: [
        "acheter appartement Nice étranger",
        "non-résident immobilier France",
        "achat immobilier Côte d'Azur",
      ],
      es: [
        "comprar piso Niza extranjero",
        "no residente inmobiliaria Francia",
        "compra inmueble Costa Azul",
      ],
      en: [
        "buying property Nice foreigner",
        "non-resident real estate France",
        "French Riviera buyer guide",
      ],
    },
  },
  {
    id: "a3",
    category: "marche",
    readingTime: 7,
    date: "2026-07-01",
    slugs: {
      fr: "prix-immobilier-cote-azur-2026",
      es: "precios-inmuebles-costa-azul-2026",
      en: "french-riviera-property-prices-2026",
    },
    titles: {
      fr: "Prix immobilier Côte d'Azur 2026 : analyse par ville (Cannes, Nice, Antibes, Menton)",
      es: "Precios inmobiliarios Costa Azul 2026: análisis por ciudad",
      en: "French Riviera property prices 2026: city-by-city analysis",
    },
    keywords: {
      fr: [
        "prix immobilier Côte d'Azur 2026",
        "prix m2 Nice Cannes",
        "marché immobilier Alpes-Maritimes",
      ],
      es: [
        "precios inmuebles Costa Azul 2026",
        "precio m2 Niza Cannes",
        "mercado inmobiliario Riviera",
      ],
      en: [
        "French Riviera property prices 2026",
        "Nice Cannes price per sqm",
        "Côte d'Azur real estate market",
      ],
    },
  },
  {
    id: "a4",
    category: "conciergerie",
    readingTime: 6,
    date: "2026-07-01",
    slugs: {
      fr: "conciergerie-airbnb-cote-azur",
      es: "gestion-alquiler-vacacional-costa-azul",
      en: "airbnb-property-management-french-riviera",
    },
    titles: {
      fr: "Conciergerie Airbnb Côte d'Azur : comment rentabiliser son appartement en 2026",
      es: "Gestión de alquiler vacacional en la Costa Azul: cómo rentabilizar su piso en 2026",
      en: "Airbnb property management on the French Riviera: how to monetize your apartment in 2026",
    },
    keywords: {
      fr: [
        "conciergerie Airbnb Côte d'Azur",
        "gestion locative saisonnière Nice",
        "YourBnB06",
      ],
      es: [
        "gestión alquiler vacacional Costa Azul",
        "Airbnb Niza gestión",
        "conciergería temporada",
      ],
      en: [
        "Airbnb management French Riviera",
        "short-term rental Nice",
        "vacation rental concierge",
      ],
    },
  },
  {
    id: "a5",
    category: "investissement",
    readingTime: 7,
    date: "2026-07-01",
    slugs: {
      fr: "investir-immobilier-cote-azur-depuis-espagne",
      es: "invertir-inmobiliario-costa-azul-desde-espana",
      en: "investing-french-riviera-real-estate-from-spain",
    },
    titles: {
      fr: "Investir dans l'immobilier sur la Côte d'Azur depuis l'Espagne : guide patrimonial 2026",
      es: "Invertir en inmobiliario en la Costa Azul desde España: guía patrimonial 2026",
      en: "Investing in French Riviera real estate from Spain: 2026 wealth guide",
    },
    keywords: {
      fr: [
        "investir immobilier Côte d'Azur Espagne",
        "patrimoine immobilier France",
        "acheteur espagnol Riviera",
      ],
      es: [
        "invertir inmobiliario Costa Azul España",
        "patrimonio inmobiliario Francia",
        "comprador español Riviera",
      ],
      en: [
        "invest French Riviera from Spain",
        "Spanish buyer property France",
        "cross-border real estate investment",
      ],
    },
  },
];

const html = fs.readFileSync(HTML_PATH, "utf8");
const $ = cheerio.load(html);

for (const article of ARTICLES) {
  for (const locale of ["fr", "es", "en"]) {
    const block = $(`#${article.id}-${locale}`);
    const intro = block.find(".article-body .intro").first().text().trim();
    const bodyHtml = block.find(".article-body").html()?.trim() ?? "";
    const faqs = block
      .find(".faq-section .faq-item")
      .map((_, el) => ({
        question: $(el).find(".faq-q").text().replace(/^Q —\s*/, "").trim(),
        answer: $(el).find(".faq-a").text().replace(/^R —\s*/, "").trim(),
      }))
      .get();

    const slug = article.slugs[locale];
    const alternates = {
      fr: article.slugs.fr,
      es: article.slugs.es,
      en: article.slugs.en,
    };

    const data = {
      title: article.titles[locale],
      slug,
      locale,
      date: article.date,
      updatedAt: article.date,
      description: intro.slice(0, 160),
      keywords: article.keywords[locale],
      category: article.category,
      readingTime: article.readingTime,
      alternates,
      bodyHtml,
      faqs,
    };

    const dir = path.join(OUT_DIR, locale);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
      path.join(dir, `${slug}.json`),
      JSON.stringify(data, null, 2),
      "utf8"
    );
    console.log(`✓ ${locale}/${slug}.json (${faqs.length} FAQ)`);
  }
}

console.log("\nDone — 15 articles extracted.");
