const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function getSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? null;
}

async function signPayload(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function createSessionToken(): Promise<string> {
  const secret = getSessionSecret();
  if (!secret) throw new Error("ADMIN_PASSWORD is required");

  const payload = `${Date.now()}:${crypto.randomUUID()}`;
  const signature = await signPayload(payload, secret);
  return `${payload}.${signature}`;
}

export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;

  const secret = getSessionSecret();
  if (!secret) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = await signPayload(payload, secret);
  if (expected.length !== signature.length) return false;

  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  }
  if (mismatch !== 0) return false;

  const timestamp = Number(payload.split(":")[0]);
  if (!Number.isFinite(timestamp)) return false;
  return Date.now() - timestamp < SESSION_MAX_AGE_MS;
}

export const ADMIN_SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE_MS / 1000;
