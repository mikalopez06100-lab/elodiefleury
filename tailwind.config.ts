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
        marine: {
          DEFAULT: "#0E2C45",
          mid: "#174268",
          deep: "#081c2e",
        },
        sable: {
          DEFAULT: "#C8A97A",
          soft: "#F0E6D5",
        },
        blanc: "#FDFAF6",
        gris: {
          DEFAULT: "#6B7A8D",
          light: "#EEF2F7",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "-apple-system", "sans-serif"],
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
