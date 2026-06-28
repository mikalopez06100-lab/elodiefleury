"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  defaultDialCode,
  phoneCodes,
} from "@/lib/phone-codes";
import type { Locale } from "@/i18n/routing";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = {
  name: string;
  email: string;
  dialCode: string;
  phone: string;
  consent: boolean;
};

type Status = "idle" | "submitting" | "success" | "error";

export default function GuideModal({ isOpen, onClose }: Props) {
  const t = useTranslations("guideModal");
  const locale = useLocale() as Locale;
  const titleId = useId();
  const [status, setStatus] = useState<Status>("idle");

  const schema = z.object({
    name: z.string().trim().min(2, t("errors.name")),
    email: z.string().trim().email(t("errors.email")),
    dialCode: z.string().min(1),
    phone: z
      .string()
      .trim()
      .min(6, t("errors.phone"))
      .regex(/^[\d\s().-]+$/, t("errors.phone")),
    consent: z
      .boolean()
      .refine((value) => value === true, { message: t("errors.consent") }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      dialCode: defaultDialCode(locale),
      phone: "",
      consent: false,
    },
  });

  useEffect(() => {
    if (!isOpen) return;
    setStatus("idle");
    reset({
      name: "",
      email: "",
      dialCode: defaultDialCode(locale),
      phone: "",
      consent: false,
    });
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, locale, reset]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus("submitting");

    try {
      const response = await fetch("/api/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          dialCode: values.dialCode,
          phone: values.phone.trim(),
          locale,
          consent: true,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[600] flex items-end justify-center p-0 sm:items-center sm:p-4">
          <motion.button
            type="button"
            aria-label={t("close")}
            className="absolute inset-0 bg-tinta/72 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-[601] w-full max-w-[480px] overflow-hidden rounded-t-[14px] border border-line bg-cal shadow-[0_24px_80px_rgba(42,38,34,0.28)] sm:rounded-[14px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative bg-mar px-6 pb-5 pt-6 sm:px-7">
              <button
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-cal/70 transition-colors hover:bg-white/10 hover:text-cal"
                aria-label={t("close")}
              >
                ✕
              </button>
              <div className="flex items-start gap-4 pr-8">
                <div className="relative hidden h-[72px] w-[52px] shrink-0 overflow-hidden rounded shadow-md sm:block">
                  <Image
                    src="/images/guide-cover.jpg"
                    alt=""
                    fill
                    sizes="52px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="mb-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-sol/75">
                    {t("eyebrow")}
                  </p>
                  <h2
                    id={titleId}
                    className="font-display text-[1.55rem] font-semibold leading-tight text-cal"
                  >
                    {t("title")}
                  </h2>
                  <p className="mt-1.5 text-[0.84rem] text-cal/62">{t("subtitle")}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-6 sm:px-7">
              {status === "success" ? (
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-olivo/15 text-2xl">
                    ✓
                  </div>
                  <h3 className="mb-2 font-display text-[1.35rem] font-semibold text-mar">
                    {t("success_title")}
                  </h3>
                  <p className="mb-6 text-[0.9rem] leading-relaxed text-tinta-muted">
                    {t("success_body")}
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded bg-terracota px-6 py-3.5 text-[0.86rem] font-semibold text-cal transition-opacity hover:opacity-90"
                  >
                    {t("close")}
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div>
                    <label
                      htmlFor="guide-name"
                      className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-wider text-olivo"
                    >
                      {t("name_label")}
                    </label>
                    <input
                      id="guide-name"
                      type="text"
                      autoComplete="name"
                      placeholder={t("name_placeholder")}
                      className="w-full rounded border border-line bg-white px-4 py-3 text-[0.92rem] text-tinta outline-none transition-colors placeholder:text-tinta-muted/50 focus:border-terracota"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[0.78rem] text-terracota">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="guide-email"
                      className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-wider text-olivo"
                    >
                      {t("email_label")}
                    </label>
                    <input
                      id="guide-email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder={t("email_placeholder")}
                      className="w-full rounded border border-line bg-white px-4 py-3 text-[0.92rem] text-tinta outline-none transition-colors placeholder:text-tinta-muted/50 focus:border-terracota"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[0.78rem] text-terracota">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="guide-phone"
                      className="mb-1.5 block text-[0.72rem] font-semibold uppercase tracking-wider text-olivo"
                    >
                      {t("phone_label")}
                    </label>
                    <div className="flex gap-2">
                      <select
                        aria-label={t("dial_label")}
                        className="w-[118px] shrink-0 rounded border border-line bg-white px-2 py-3 text-[0.84rem] text-tinta outline-none focus:border-terracota"
                        {...register("dialCode")}
                      >
                        {phoneCodes.map((item) => (
                          <option key={item.dial} value={item.dial}>
                            {item.flag} {item.dial}
                          </option>
                        ))}
                      </select>
                      <input
                        id="guide-phone"
                        type="tel"
                        autoComplete="tel-national"
                        inputMode="tel"
                        placeholder={t("phone_placeholder")}
                        className="min-w-0 flex-1 rounded border border-line bg-white px-4 py-3 text-[0.92rem] text-tinta outline-none transition-colors placeholder:text-tinta-muted/50 focus:border-terracota"
                        {...register("phone")}
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-[0.78rem] text-terracota">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 rounded border border-line/80 bg-cal-dark/40 px-3.5 py-3">
                    <input
                      type="checkbox"
                      className="mt-0.5 h-4 w-4 shrink-0 accent-terracota"
                      {...register("consent")}
                    />
                    <span className="text-[0.78rem] leading-relaxed text-tinta-muted">
                      {t("consent")}
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="-mt-2 text-[0.78rem] text-terracota">
                      {errors.consent.message}
                    </p>
                  )}

                  {status === "error" && (
                    <p className="rounded border border-terracota/25 bg-terracota/8 px-3.5 py-2.5 text-[0.82rem] text-terracota">
                      {t("error_generic")}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex w-full items-center justify-center gap-2 rounded bg-terracota px-6 py-3.5 text-[0.86rem] font-semibold text-cal transition-all hover:-translate-y-px hover:opacity-92 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "submitting" ? t("submitting") : t("submit")}
                  </button>

                  <p className="text-center text-[0.72rem] text-tinta-muted/70">
                    {t("privacy_note")}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
