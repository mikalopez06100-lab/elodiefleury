"use client";

import Image from "next/image";
import { useLocale } from "next-intl";
import type { Locale } from "@/i18n/routing";
import {
  propertyImageSrc,
  type PropertyImageKey,
  type PropertyShowcase,
} from "@/lib/properties.shared";

export default function PropertyGrid({
  showcase,
}: {
  showcase: PropertyShowcase;
}) {
  const locale = useLocale() as Locale;
  const { images } = showcase;
  const copy =
    showcase.translations[locale] ?? showcase.translations.fr;

  return (
    <div>
      <div className="mb-6">
        <span className="mb-2 block text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-terracota-light">
          {copy.label}
        </span>
        <p className="font-display text-[1.35rem] font-medium italic text-cal/90">
          {copy.subtitle}
        </p>
      </div>
      <div className="overflow-hidden rounded-[10px]">
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr] lg:grid-rows-[275px_275px]">
          {images.map((prop) => {
            const city = copy[`${prop.key as PropertyImageKey}_city`];
            const title = copy[`${prop.key as PropertyImageKey}_title`];
            return (
              <div
                key={prop.key}
                className={`group relative h-[200px] overflow-hidden lg:h-auto ${
                  prop.span ? "lg:row-span-2" : ""
                }`}
              >
                <Image
                  src={propertyImageSrc(prop.file)}
                  alt={title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover brightness-[1.02] contrast-[0.95] transition-transform duration-700 ease-out-expo group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-tinta/32 transition-colors group-hover:bg-tinta/12" />
                <div className="absolute bottom-3.5 left-3.5 text-white">
                  <span className="mb-0.5 block font-sans text-[0.62rem] uppercase tracking-wider text-sol">
                    {city}
                  </span>
                  <span className="font-display text-[1.05rem] italic opacity-88">
                    {title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
