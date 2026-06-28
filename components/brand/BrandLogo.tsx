import { siteConfig } from "@/lib/config";
import BrandMark from "./BrandMark";

type Props = {
  variant?: "light" | "dark";
  layout?: "horizontal" | "stacked";
  showTagline?: boolean;
  className?: string;
};

export default function BrandLogo({
  variant = "light",
  layout = "horizontal",
  showTagline = true,
  className = "",
}: Props) {
  const isLight = variant === "light";

  if (layout === "stacked") {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <BrandMark variant={variant} className="h-14 w-14" />
        <div className="text-center">
          <span
            className={`block font-display text-[1.15rem] font-semibold tracking-wide ${
              isLight ? "text-cal" : "text-mar"
            }`}
          >
            {siteConfig.name}
          </span>
          {showTagline && (
            <span
              className={`mt-0.5 block text-[0.62rem] font-medium uppercase tracking-[0.22em] ${
                isLight ? "text-sol/85" : "text-olivo"
              }`}
            >
              {siteConfig.tagline}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BrandMark variant={variant} className="h-10 w-10 shrink-0" />
      <span
        className={`hidden h-9 w-px shrink-0 sm:block ${
          isLight ? "bg-sol/35" : "bg-line"
        }`}
        aria-hidden
      />
      <div className="min-w-0">
        <span
          className={`block truncate font-display text-[1.05rem] font-semibold leading-none tracking-wide sm:text-[1.12rem] ${
            isLight ? "text-cal" : "text-mar"
          }`}
        >
          {siteConfig.name}
        </span>
        {showTagline && (
          <span
            className={`mt-1 block truncate text-[0.58rem] font-medium uppercase tracking-[0.2em] sm:text-[0.62rem] ${
              isLight ? "text-sol/90" : "text-olivo"
            }`}
          >
            {siteConfig.tagline}
          </span>
        )}
      </div>
    </div>
  );
}
