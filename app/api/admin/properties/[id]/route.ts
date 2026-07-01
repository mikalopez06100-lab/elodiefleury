import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdminApi } from "@/lib/admin/api";
import { revalidatePropertyContent } from "@/lib/cms/revalidate";
import { deleteCmsFile, writeCmsJson } from "@/lib/cms/storage";
import {
  defaultPropertyShowcase,
  type PropertyShowcase,
} from "@/lib/properties.shared";
import { getPropertyById } from "@/lib/properties";

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

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const property = await getPropertyById(id);
  if (!property) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({ property });
}

export async function PUT(request: Request, context: RouteContext) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id: previousId } = await context.params;
  const parsed = propertySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_data" }, { status: 400 });
  }

  const data = parsed.data as PropertyShowcase;
  const existing = await getPropertyById(previousId);

  const property: PropertyShowcase = {
    ...(existing ?? defaultPropertyShowcase(data.id)),
    ...data,
  };

  if (previousId !== property.id) {
    await deleteCmsFile(`content/properties/${previousId}.json`);
  }

  await writeCmsJson(`content/properties/${property.id}.json`, property);
  revalidatePropertyContent();

  return NextResponse.json({ ok: true, property });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  await deleteCmsFile(`content/properties/${id}.json`);
  revalidatePropertyContent();

  return NextResponse.json({ ok: true });
}
