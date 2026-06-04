import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A435",
          light: "#E8D48A",
          dark: "#A07830",
          50: "#FBF5E0",
        },
        navy: {
          DEFAULT: "#1A237E",
          dark: "#141966",
        },
        red: {
          DEFAULT: "#C8102E",
        },
        dark: {
          DEFAULT: "#0A0A0A",
          surface: "#141414",
          card: "#1C1C1C",
          border: "#2A2A2A",
        },
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #E8D48A 0%, #C9A84C 50%, #A07830 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
