"use client";

import { useState } from "react";
import type { BlogArticle, BlogFaq } from "@/lib/blog.shared";
import type { Locale } from "@/i18n/routing";

type Props = {
  initial: BlogArticle;
  mode: "create" | "edit";
};

const LOCALES: Locale[] = ["fr", "es", "en"];

export default function BlogEditor({ initial, mode }: Props) {
  const [article, setArticle] = useState<BlogArticle>(initial);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  function updateField<K extends keyof BlogArticle>(
    key: K,
    value: BlogArticle[K]
  ) {
    setArticle((prev) => ({ ...prev, [key]: value }));
  }

  function updateFaq(index: number, field: keyof BlogFaq, value: string) {
    setArticle((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  }

  function addFaq() {
    setArticle((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  }

  function removeFaq(index: number) {
    setArticle((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  }

  async function onSave() {
    setStatus("saving");
    setMessage("");

    const url =
      mode === "create"
        ? "/api/admin/blog"
        : `/api/admin/blog/${encodeURIComponent(initial.slug)}?locale=${initial.locale}`;
    const method = mode === "create" ? "POST" : "PUT";

    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...article,
        keywords: article.keywords.filter(Boolean),
        faqs: article.faqs.filter((faq) => faq.question && faq.answer),
      }),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Enregistrement impossible. Vérifiez les champs.");
      return;
    }

    const data = (await response.json()) as { article: BlogArticle };
    setStatus("saved");
    setMessage("Article enregistré.");
    if (mode === "create") {
      window.location.href = `/admin/blog/${data.article.slug}?locale=${data.article.locale}`;
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Langue">
          <select
            value={article.locale}
            onChange={(e) =>
              updateField("locale", e.target.value as Locale)
            }
            className="admin-input"
          >
            {LOCALES.map((locale) => (
              <option key={locale} value={locale}>
                {locale.toUpperCase()}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Slug URL">
          <input
            value={article.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            className="admin-input"
            placeholder="mon-article"
          />
        </Field>
        <Field label="Titre" className="md:col-span-2">
          <input
            value={article.title}
            onChange={(e) => updateField("title", e.target.value)}
            className="admin-input"
          />
        </Field>
        <Field label="Date de publication">
          <input
            type="date"
            value={article.date}
            onChange={(e) => updateField("date", e.target.value)}
            className="admin-input"
          />
        </Field>
        <Field label="Catégorie">
          <input
            value={article.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="admin-input"
          />
        </Field>
        <Field label="Description SEO" className="md:col-span-2">
          <textarea
            value={article.description}
            onChange={(e) => updateField("description", e.target.value)}
            className="admin-input min-h-24"
          />
        </Field>
        <Field label="Mots-clés (séparés par des virgules)" className="md:col-span-2">
          <input
            value={article.keywords.join(", ")}
            onChange={(e) =>
              updateField(
                "keywords",
                e.target.value
                  .split(",")
                  .map((k) => k.trim())
                  .filter(Boolean)
              )
            }
            className="admin-input"
          />
        </Field>
      </div>

      <div className="rounded-xl border border-[#ddd6cc] bg-white p-5">
        <h2 className="mb-4 font-display text-xl font-semibold">
          Versions liées (slugs)
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {LOCALES.map((locale) => (
            <Field key={locale} label={locale.toUpperCase()}>
              <input
                value={article.alternates[locale]}
                onChange={(e) =>
                  updateField("alternates", {
                    ...article.alternates,
                    [locale]: e.target.value,
                  })
                }
                className="admin-input"
              />
            </Field>
          ))}
        </div>
      </div>

      <Field label="Contenu HTML">
        <textarea
          value={article.bodyHtml}
          onChange={(e) => updateField("bodyHtml", e.target.value)}
          className="admin-input min-h-[320px] font-mono text-xs"
        />
      </Field>

      <div className="rounded-xl border border-[#ddd6cc] bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">FAQ</h2>
          <button type="button" onClick={addFaq} className="admin-secondary-btn">
            + Ajouter une question
          </button>
        </div>
        <div className="space-y-4">
          {article.faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg border border-[#ece7df] p-4"
            >
              <Field label="Question">
                <input
                  value={faq.question}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  className="admin-input"
                />
              </Field>
              <Field label="Réponse">
                <textarea
                  value={faq.answer}
                  onChange={(e) => updateFaq(index, "answer", e.target.value)}
                  className="admin-input min-h-24"
                />
              </Field>
              <button
                type="button"
                onClick={() => removeFaq(index)}
                className="text-sm text-red-600"
              >
                Supprimer
              </button>
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
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-[#5c564f]">
        {label}
      </span>
      {children}
    </label>
  );
}
