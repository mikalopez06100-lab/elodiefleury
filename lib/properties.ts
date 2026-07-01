import "server-only";

import { unstable_cache } from "next/cache";
import { listCmsJsonFiles, readCmsJson } from "@/lib/cms/storage";
import type { PropertyShowcase } from "@/lib/properties.shared";

export type {
  PropertyImageKey,
  PropertyShowcase,
  PropertyTranslations,
} from "@/lib/properties.shared";

export {
  PROPERTY_IMAGE_KEYS,
  biensIndexUrl,
  defaultPropertyShowcase,
  emptyPropertyTranslations,
  pickRandomShowcases,
  propertyImageSrc,
} from "@/lib/properties.shared";

const PROPERTIES_DIR = "content/properties";

async function loadPropertyShowcases(): Promise<PropertyShowcase[]> {
  const files = await listCmsJsonFiles(PROPERTIES_DIR);
  const showcases = (
    await Promise.all(
      files.map((file) => readCmsJson<PropertyShowcase>(file))
    )
  ).filter((item): item is PropertyShowcase => item !== null);

  return showcases
    .filter((item) => item.published !== false)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

async function loadAllPropertyShowcases(): Promise<PropertyShowcase[]> {
  const files = await listCmsJsonFiles(PROPERTIES_DIR);
  const showcases = (
    await Promise.all(
      files.map((file) => readCmsJson<PropertyShowcase>(file))
    )
  ).filter((item): item is PropertyShowcase => item !== null);

  return showcases.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

const getCachedShowcases = unstable_cache(
  loadPropertyShowcases,
  ["property-showcases"],
  { tags: ["properties"] }
);

const getCachedAllShowcases = unstable_cache(
  loadAllPropertyShowcases,
  ["property-showcases-all"],
  { tags: ["properties"] }
);

export async function getPropertyShowcases(): Promise<PropertyShowcase[]> {
  return getCachedShowcases();
}

export async function getAllPropertyShowcases(): Promise<PropertyShowcase[]> {
  return getCachedAllShowcases();
}

export async function getPropertyById(
  id: string
): Promise<PropertyShowcase | null> {
  return readCmsJson<PropertyShowcase>(`${PROPERTIES_DIR}/${id}.json`);
}
