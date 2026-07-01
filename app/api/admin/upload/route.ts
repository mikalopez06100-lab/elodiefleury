import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin/api";
import { uploadPublicFile } from "@/lib/cms/storage";

export async function POST(request: Request) {
  const unauthorized = await requireAdminApi();
  if (unauthorized) return unauthorized;

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "missing_file" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  const rawName = (formData.get("filename") as string | null) ?? file.name;
  const safeName = rawName
    .toLowerCase()
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-");

  const url = await uploadPublicFile(
    safeName,
    Buffer.from(await file.arrayBuffer()),
    file.type
  );

  return NextResponse.json({ ok: true, url, filename: safeName });
}
