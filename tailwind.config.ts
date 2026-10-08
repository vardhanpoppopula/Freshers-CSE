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
        background: "#030712",
        foreground: "#f8fafc",
        nexora: {
          dark: "#050b18",
          darker: "#02050e",
          card: "rgba(13, 23, 51, 0.65)",
          border: "rgba(234, 179, 8, 0.25)",
          gold: {
            light: "#fef08a",
            DEFAULT: "#f59e0b",
            dark: "#b45309",
            metallic: "#ffd700",
          },
          blue: {
            light: "#38bdf8",
            DEFAULT: "#00d2ff",
            deep: "#0f172a",
            electric: "#2563eb",
          },
          purple: {
            glow: "#a855f7",
            deep: "#581c87",
            neon: "#c084fc",
          },
          fire: {
            light: "#fdba74",
            DEFAULT: "#f97316",
            ember: "#ea580c",
          },
        },
      },
      fontFamily: {
        cinematic: ["Cinzel", "Cinzel Decorative", "serif"],
        display: ["Outfit", "sans-serif"],
        body: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        code: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      boxShadow: {
        "gold-glow": "0 0 25px rgba(245, 158, 11, 0.45)",
        "gold-intense": "0 0 40px rgba(255, 215, 0, 0.65)",
        "blue-glow": "0 0 30px rgba(0, 210, 255, 0.4)",
        "purple-glow": "0 0 35px rgba(168, 85, 247, 0.4)",
        "fire-glow": "0 0 30px rgba(249, 115, 22, 0.5)",
      },
      animation: {
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "float-slow": "floatSlow 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
