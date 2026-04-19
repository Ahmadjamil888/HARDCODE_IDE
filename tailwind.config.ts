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
        primary: "#4287f5",
        secondary: "#e8e8ea",
        background: "#0c0c0e",
        surface: "#111114",
        "on-surface": "#e8e8ea",
        "on-surface-variant": "#888890",
        "surface-container": "#161619",
        "outline": "rgba(255,255,255,0.07)",
        "outline-variant": "rgba(255,255,255,0.12)",
        blue: {
          DEFAULT: "#4287f5",
          dark: "#2563eb",
          dim: "rgba(66,135,245,0.15)",
          dim2: "rgba(66,135,245,0.08)",
        }
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest: '0.1em',
        extreme: '0.2em',
      }
    },
  },
  plugins: [],
};
export default config;
