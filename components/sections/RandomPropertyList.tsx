"use client";

import { useEffect, useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PropertyGrid from "@/components/sections/PropertyGrid";
import {
  pickRandomShowcases,
  type PropertyShowcase,
} from "@/lib/properties.shared";

const HOME_PREVIEW_COUNT = 3;

export default function RandomPropertyList({
  pool,
}: {
  pool: PropertyShowcase[];
}) {
  const [showcases, setShowcases] = useState<PropertyShowcase[] | null>(null);

  useEffect(() => {
    setShowcases(pickRandomShowcases(HOME_PREVIEW_COUNT, pool));
  }, [pool]);

  if (!showcases) {
    return (
      <div className="mt-[52px] flex flex-col gap-14" aria-hidden>
        {Array.from({ length: HOME_PREVIEW_COUNT }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="mb-6 h-4 w-32 rounded bg-white/10" />
            <div className="h-[400px] rounded-[10px] bg-white/8 lg:h-[550px]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-[52px] flex flex-col gap-14">
      {showcases.map((showcase, i) => (
        <RevealOnScroll key={showcase.id} delay={i * 0.05}>
          <PropertyGrid showcase={showcase} />
        </RevealOnScroll>
      ))}
    </div>
  );
}
