type Props = {
  variant?: "light" | "dark";
  className?: string;
};

export default function BrandMark({ variant = "light", className = "h-10 w-10" }: Props) {
  const isLight = variant === "light";
  const terracota = "#BE5B42";
  const sol = "#D9A152";
  const monoFill = isLight ? "#FFFFFF" : "#2A2622";

  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="100" cy="100" r="90" fill="none" stroke={terracota} strokeWidth="2.6" />
      <circle cx="100" cy="100" r="81" fill="none" stroke={sol} strokeWidth="1" />
      <g fill={sol}>
        <circle cx="100" cy="60" r="3.4" />
        <ellipse cx="100" cy="50" rx="3" ry="7.5" />
        <ellipse cx="100" cy="50" rx="3" ry="7.5" transform="rotate(45 100 60)" />
        <ellipse cx="100" cy="50" rx="3" ry="7.5" transform="rotate(90 100 60)" />
        <ellipse cx="100" cy="50" rx="3" ry="7.5" transform="rotate(135 100 60)" />
        <ellipse cx="100" cy="50" rx="3" ry="7.5" transform="rotate(180 100 60)" />
        <ellipse cx="100" cy="50" rx="3" ry="7.5" transform="rotate(225 100 60)" />
        <ellipse cx="100" cy="50" rx="3" ry="7.5" transform="rotate(270 100 60)" />
        <ellipse cx="100" cy="50" rx="3" ry="7.5" transform="rotate(315 100 60)" />
      </g>
      <text
        x="100"
        y="132"
        textAnchor="middle"
        fontSize="64"
        fontWeight="600"
        letterSpacing="-2"
        fill={monoFill}
        style={{ fontFamily: "var(--font-display), Georgia, serif" }}
      >
        EF
      </text>
      <g stroke={sol} strokeWidth="1.4">
        <line x1="74" y1="152" x2="90" y2="152" />
        <line x1="110" y1="152" x2="126" y2="152" />
      </g>
      <rect
        x="96.5"
        y="148.5"
        width="7"
        height="7"
        transform="rotate(45 100 152)"
        fill={terracota}
      />
    </svg>
  );
}
