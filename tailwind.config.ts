import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "ui-monospace", "monospace"]
      },
      colors: {
        deepGreen: "#0D5A49",
        darkGreen: "#064437",
        mutedGreen: "#2F6B5A",
        waterGreen: "#426F61",
        paleMint: "#EAF1ED",
        lightGray: "#D9DEDC",
        cream: "#F7F5EF",
        redSon: "#B72124",
        gold: "#D7A83F",
        ink: "#111111"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(6, 68, 55, 0.13)",
        poster: "0 18px 35px rgba(6, 68, 55, 0.18)"
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-20%)", opacity: "0.15" },
          "50%": { opacity: "0.35" },
          "100%": { transform: "translateX(20%)", opacity: "0.15" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        dash: {
          "0%": { strokeDashoffset: "70" },
          "100%": { strokeDashoffset: "0" }
        }
      },
      animation: {
        shimmer: "shimmer 5s ease-in-out infinite alternate",
        float: "float 5s ease-in-out infinite",
        dash: "dash 2.5s ease-in-out infinite alternate"
      }
    }
  },
  plugins: []
};

export default config;
