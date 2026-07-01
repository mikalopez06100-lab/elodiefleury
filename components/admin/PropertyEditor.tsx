"use client";

import { useState } from "react";
import type { Locale } from "@/i18n/routing";
import {
  PROPERTY_IMAGE_KEYS,
  type PropertyImageKey,
  type PropertyShowcase,
  type PropertyTranslations,
} from "@/lib/properties.shared";

type Props = {
  initial: PropertyShowcase;
  mode: "create" | "edit";
};

const LOCALES: Locale[] = ["fr", "es", "en"];

const IMAGE_LABELS: Record<PropertyImageKey, string> = {
  villa: "Photo principale",
  appt: "Photo 2",
  terrain: "Photo 3",
  interieur: "Photo 4",
  luxe: "Photo 5",
};

export default function PropertyEditor({ initial, mode }: Props) {
  const [property, setProperty] = useState<PropertyShowcase>(initial);
  const [activeLocale, setActiveLocale] = useState<Locale>("fr");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");
  const [uploadingKey, setUploadingKey] = useState<PropertyImageKey | null>(
    null
  );

  function updateTranslation(
    locale: Locale,
    field: keyof PropertyTranslations,
    value: string
  ) {
    setProperty((prev) => ({
      ...prev,
      translations: {
        ...prev.translations,
        [locale]: {
          ...prev.translations[locale],
          [field]: value,
        },
      },
    }));
  }

  async function uploadImage(key: PropertyImageKey, file: File) {
    setUploadingKey(key);
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "filename",
      `${property.id || "bien"}-${key}-${file.name}`
    );

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    setUploadingKey(null);
    if (!response.ok) return;

    const data = (await response.json()) as { url: string; filename: string };
    setProperty((prev) => ({
      ...prev,
      images: prev.images.map((image) =>
        image.key === key
          ? {
              ...image,
              file: data.url.startsWith("http") ? data.url : data.filename,
            }
          : image
      ),
    }));
  }

  async function onSave() {
    setStatus("saving");
    setMessage("");

    const url =
      mode === "create"
        ? "/api/admin/properties"
        : `/api/admin/properties/${encodeURIComponent(initial.id)}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Enregistrement impossible. Vérifiez les champs et l'identifiant.");
      return;
    }

    const data = (await response.json()) as { property: PropertyShowcase };
    setStatus("saved");
    setMessage("Bien enregistré.");
    if (mode === "create") {
      window.location.href = `/admin/properties/${data.property.id}`;
    }
  }

  const copy = property.translations[activeLocale];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Identifiant (slug)">
          <input
            value={property.id}
            onChange={(e) =>
              setProperty((prev) => ({ ...prev, id: e.target.value }))
            }
            className="admin-input"
            placeholder="nice-centre"
          />
        </Field>
        <Field label="Ordre d'affichage">
          <input
            type="number"
            value={property.sortOrder}
            onChange={(e) =>
              setProperty((prev) => ({
                ...prev,
                sortOrder: Number(e.target.value),
              }))
            }
            className="admin-input"
          />
        </Field>
        <Field label="Publication">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={property.published}
              onChange={(e) =>
                setProperty((prev) => ({
                  ...prev,
                  published: e.target.checked,
                }))
              }
            />
            Visible sur le site
          </label>
        </Field>
      </div>

      <div className="rounded-xl border border-[#ddd6cc] bg-white p-5">
        <h2 className="mb-4 font-display text-xl font-semibold">Photos</h2>
        <div className="space-y-4">
          {PROPERTY_IMAGE_KEYS.map((key) => {
            const image = property.images.find((item) => item.key === key);
            if (!image) return null;
            return (
              <div
                key={key}
                className="grid gap-4 rounded-lg border border-[#ece7df] p-4 md:grid-cols-[180px_1fr]"
              >
                <div>
                  {image.file ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={
                        image.file.startsWith("http")
                          ? image.file
                          : `/images/properties/${image.file}`
                      }
                      alt={key}
                      className="h-32 w-full rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-32 items-center justify-center rounded-lg bg-[#f4f1ec] text-xs text-[#8b6f61]">
                      Aucune image
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <p className="font-medium">{IMAGE_LABELS[key]}</p>
                  <input
                    value={image.file}
                    onChange={(e) =>
                      setProperty((prev) => ({
                        ...prev,
                        images: prev.images.map((item) =>
                          item.key === key
                            ? { ...item, file: e.target.value }
                            : item
                        ),
                      }))
                    }
                    className="admin-input"
                    placeholder="nom-fichier.png ou URL"
                  />
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="admin-secondary-btn cursor-pointer">
                      {uploadingKey === key ? "Envoi…" : "Uploader"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadImage(key, file);
                        }}
                      />
                    </label>
                    {key === "villa" ? (
                      <label className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          checked={image.span}
                          onChange={(e) =>
                            setProperty((prev) => ({
                              ...prev,
                              images: prev.images.map((item) =>
                                item.key === key
                                  ? { ...item, span: e.target.checked }
                                  : item
                              ),
                            }))
                          }
                        />
                        Grande photo (2 lignes)
                      </label>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-xl border border-[#ddd6cc] bg-white p-5">
        <div className="mb-4 flex gap-2">
          {LOCALES.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => setActiveLocale(locale)}
              className={`rounded-full px-4 py-1.5 text-sm ${
                activeLocale === locale
                  ? "bg-[#2a2622] text-white"
                  : "bg-[#f4f1ec] text-[#5c564f]"
              }`}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Titre du bien">
            <input
              value={copy.label}
              onChange={(e) =>
                updateTranslation(activeLocale, "label", e.target.value)
              }
              className="admin-input"
            />
          </Field>
          <Field label="Sous-titre">
            <input
              value={copy.subtitle}
              onChange={(e) =>
                updateTranslation(activeLocale, "subtitle", e.target.value)
              }
              className="admin-input"
            />
          </Field>
        </div>

        <div className="mt-6 grid gap-4">
          {PROPERTY_IMAGE_KEYS.map((key) => (
            <div
              key={key}
              className="grid gap-4 rounded-lg border border-[#ece7df] p-4 md:grid-cols-2"
            >
              <Field label={`${IMAGE_LABELS[key]} — lieu`}>
                <input
                  value={copy[`${key}_city`]}
                  onChange={(e) =>
                    updateTranslation(activeLocale, `${key}_city`, e.target.value)
                  }
                  className="admin-input"
                />
              </Field>
              <Field label={`${IMAGE_LABELS[key]} — légende`}>
                <input
                  value={copy[`${key}_title`]}
                  onChange={(e) =>
                    updateTranslation(
                      activeLocale,
                      `${key}_title`,
                      e.target.value
                    )
                  }
                  className="admin-input"
                />
              </Field>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onSave}
          disabled={status === "saving"}
          className="admin-primary-btn"
        >
          {status === "saving" ? "Enregistrement…" : "Enregistrer"}
        </button>
        {message ? (
          <p
            className={`text-sm ${status === "error" ? "text-red-600" : "text-green-700"}`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[#5c564f]">
        {label}
      </span>
      {children}
    </label>
  );
}
