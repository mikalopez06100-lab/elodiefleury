import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        terracota: {
          DEFAULT: "#BE5B42",
          light: "#EFD0B6",
        },
        sol: {
          DEFAULT: "#D9A152",
          soft: "#EFE2D0",
        },
        olivo: {
          DEFAULT: "#5E6B4A",
        },
        mar: {
          DEFAULT: "#2C4A52",
          deep: "#1E3439",
        },
        cal: {
          DEFAULT: "#F5EEE6",
          dark: "#EDE6DA",
        },
        tinta: {
          DEFAULT: "#2A2622",
          muted: "#48423a",
        },
        line: "#E3D6C5",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "-apple-system", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      fontSize: {
        "hero-fr": [
          "clamp(3rem,6.5vw,5.4rem)",
          { lineHeight: "1.02", letterSpacing: "-0.01em" },
        ],
        "hero-es": [
          "clamp(1.5rem,3.2vw,2.7rem)",
          { lineHeight: "1.3", letterSpacing: "0.01em" },
        ],
        "hero-slogan": [
          "clamp(1.8rem,4vw,2.8rem)",
          { lineHeight: "1.2" },
        ],
        section: [
          "clamp(1.9rem,4vw,3.1rem)",
          { lineHeight: "1.08", letterSpacing: "-0.01em" },
        ],
      },
      transitionTimingFunction: {
        "ease-out-expo": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      keyframes: {
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
      animation: {
        "bounce-subtle": "bounce-subtle 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
