import "server-only";

import fs from "fs";
import path from "path";
import { put } from "@vercel/blob";

const BLOB_PREFIX = "cms";

function blobStorageEnabled(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function localPath(relativePath: string): string {
  return path.join(process.cwd(), relativePath);
}

function blobPath(relativePath: string): string {
  return `${BLOB_PREFIX}/${relativePath.replace(/\\/g, "/")}`;
}

function readLocal(relativePath: string): string | null {
  const filepath = localPath(relativePath);
  if (!fs.existsSync(filepath)) return null;
  return fs.readFileSync(filepath, "utf8");
}

async function readBlob(relativePath: string): Promise<string | null> {
  if (!blobStorageEnabled()) return null;

  try {
    const { list } = await import("@vercel/blob");
    const target = blobPath(relativePath);
    const { blobs } = await list({ prefix: target });
    const match = blobs.find((item) => item.pathname === target);
    if (!match) return null;
    const response = await fetch(match.url, { cache: "no-store" });
    if (!response.ok) return null;
    return response.text();
  } catch {
    return null;
  }
}

export async function readCmsText(relativePath: string): Promise<string | null> {
  const fromBlob = await readBlob(relativePath);
  if (fromBlob !== null) return fromBlob;
  return readLocal(relativePath);
}

export async function readCmsJson<T>(relativePath: string): Promise<T | null> {
  const raw = await readCmsText(relativePath);
  if (!raw) return null;
  return JSON.parse(raw) as T;
}

export async function writeCmsText(
  relativePath: string,
  content: string
): Promise<void> {
  if (blobStorageEnabled()) {
    await put(blobPath(relativePath), content, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN manquant : impossible d'enregistrer en production"
    );
  }

  const filepath = localPath(relativePath);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf8");
}

export async function writeCmsJson<T>(
  relativePath: string,
  data: T
): Promise<void> {
  await writeCmsText(relativePath, JSON.stringify(data, null, 2) + "\n");
}

export async function listCmsJsonFiles(
  relativeDir: string
): Promise<string[]> {
  const dir = relativeDir.replace(/\\/g, "/").replace(/\/$/, "");
  const localDir = localPath(dir);

  const localFiles = fs.existsSync(localDir)
    ? fs
        .readdirSync(localDir)
        .filter((f) => f.endsWith(".json"))
        .map((f) => `${dir}/${f}`)
    : [];

  if (!blobStorageEnabled()) {
    return localFiles;
  }

  // Merge blob overrides with local seed files
  const blobFiles = new Set<string>();
  try {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: `${BLOB_PREFIX}/${dir}/` });
    for (const blob of blobs) {
      const relative = blob.pathname.replace(`${BLOB_PREFIX}/`, "");
      if (relative.endsWith(".json")) blobFiles.add(relative);
    }
  } catch {
    // ignore list errors, fallback to local
  }

  return Array.from(new Set([...localFiles, ...Array.from(blobFiles)]));
}

export async function deleteCmsFile(relativePath: string): Promise<void> {
  if (blobStorageEnabled()) {
    try {
      const { del } = await import("@vercel/blob");
      await del(blobPath(relativePath));
    } catch {
      // file may not exist in blob
    }
  }

  const filepath = localPath(relativePath);
  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
}

export async function uploadPublicFile(
  filename: string,
  data: Buffer | Blob,
  contentType: string
): Promise<string> {
  if (blobStorageEnabled()) {
    const blob = await put(`uploads/${filename}`, data, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType,
    });
    return blob.url;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN manquant : impossible d'uploader en production"
    );
  }

  const filepath = localPath(`public/images/properties/${filename}`);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  const buffer = Buffer.isBuffer(data)
    ? data
    : Buffer.from(await data.arrayBuffer());
  fs.writeFileSync(filepath, buffer);
  return `/images/properties/${filename}`;
}
