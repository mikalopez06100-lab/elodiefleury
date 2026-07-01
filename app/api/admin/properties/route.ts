import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/api";
import { revalidatePropertyContent } from "@/lib/cms/revalidate";
import { writeCmsJson } from "@/lib/cms/storage";
import {
  defaultPropertyShowcase,
  type PropertyShowcase,
} from "@/lib/properties.shared";
import { getAllPropertyShowcases } from "@/lib/properties";

const translationsSchema = z.object({
  label: z.string().min(1),
  subtitle: z.string().min(1),
  villa_city: z.string().min(1),
  villa_title: z.string().min(1),
  appt_city: z.string().min(1),
  appt_title: z.string().min(1),
  terrain_city: z.string().min(1),
  terrain_title: z.string().min(1),
  interieur_city: z.string().min(1),
  interieur_title: z.string().min(1),
  luxe_city: z.string().min(1),
  luxe_title: z.string().min(1),
});

const propertySchema = z.object({
  id: z.string().min(1).regex(/^[a-z0-9-]+$/),
  published: z.boolean(),
  sortOrder: z.number().int(),
  images: z
    .array(
      z.object({
        key: z.enum(["villa", "appt", "terrain", "interieur", "luxe"]),
        file: z.string().min(1),
        span: z.boolean(),
      })
    )
    .length(5),
  translations: z.object({
    fr: translationsSchema,
    es: translationsSchema,
    en: translationsSchema,
  }),
});

export async function GET() {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const properties = await getAllPropertyShowcases();
  return NextResponse.json({ properties });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const parsed = propertySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_data" }, { status: 400 });
  }

  const data = parsed.data as PropertyShowcase;
  const existing = await getAllPropertyShowcases();
  if (existing.some((item) => item.id === data.id)) {
    return NextResponse.json({ error: "duplicate_id" }, { status: 409 });
  }

  const property: PropertyShowcase = {
    ...defaultPropertyShowcase(data.id),
    ...data,
    sortOrder: data.sortOrder ?? existing.length,
  };

  await writeCmsJson(`content/properties/${property.id}.json`, property);
  revalidatePropertyContent();

  return NextResponse.json({ ok: true, property });
}
