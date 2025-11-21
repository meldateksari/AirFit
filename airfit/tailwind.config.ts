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
        brand: {
          black: "#000000",
          white: "#FFFFFF",
          grey: "#D9D9D9",       // Açık gri
          dark: "#1A1A1A",       // Koyu gri
          lightGrey: "#F2F2F2",  // Panel arka planı
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-montserrat)", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "#D4D4D4", // İnce gri çizgiler
      },
    },
  },
  plugins: [],
};

export default config;
