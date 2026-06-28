type GuideLead = {
  email: string;
  name: string;
  phone: string;
  locale: string;
};

export class BrevoError extends Error {
  constructor(
    message: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "BrevoError";
  }
}

export async function subscribeGuideLead(data: GuideLead): Promise<void> {
  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_GUIDE_LIST_ID;

  if (!apiKey) {
    throw new BrevoError("BREVO_NOT_CONFIGURED");
  }

  const trimmedName = data.name.trim();
  const [firstName, ...rest] = trimmedName.split(/\s+/);
  const lastName = rest.join(" ") || undefined;

  const payload: Record<string, unknown> = {
    email: data.email.toLowerCase().trim(),
    attributes: {
      PRENOM: firstName,
      ...(lastName ? { NOM: lastName } : {}),
      SMS: data.phone,
      LANGUE: data.locale,
      SOURCE: "guide-popup",
    },
    updateEnabled: true,
  };

  if (listId) {
    payload.listIds = [Number(listId)];
  }

  const response = await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    return;
  }

  const body = (await response.json().catch(() => null)) as
    | { message?: string; code?: string }
    | null;

  if (
    response.status === 400 &&
    body?.code === "duplicate_parameter"
  ) {
    return;
  }

  throw new BrevoError(body?.message ?? "BREVO_ERROR", response.status);
}
