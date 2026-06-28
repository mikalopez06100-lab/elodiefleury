import { NextResponse } from "next/server";
import { z } from "zod";
import { BrevoError, subscribeGuideLead } from "@/lib/brevo";
import { formatFullPhone, phoneCodes } from "@/lib/phone-codes";

const dialCodeSet = new Set(phoneCodes.map((c) => c.dial));

const guideSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  dialCode: z.string().refine((v) => dialCodeSet.has(v)),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(20)
    .regex(/^[\d\s().-]+$/, "invalid_phone"),
  locale: z.enum(["fr", "es", "en"]),
  consent: z.literal(true),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = guideSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "invalid_data" },
        { status: 400 }
      );
    }

    const { name, email, dialCode, phone, locale } = parsed.data;
    const fullPhone = formatFullPhone(dialCode, phone);

    await subscribeGuideLead({
      name,
      email,
      phone: fullPhone,
      locale,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof BrevoError) {
      if (error.message === "BREVO_NOT_CONFIGURED") {
        console.error("[guide] BREVO_API_KEY manquante");
        return NextResponse.json(
          { error: "not_configured" },
          { status: 503 }
        );
      }

      console.error("[guide] Brevo:", error.message);
      return NextResponse.json({ error: "provider_error" }, { status: 502 });
    }

    console.error("[guide]", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
