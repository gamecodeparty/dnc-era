import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Medieval dark theme
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Medieval palette
        medieval: {
          bg: {
            deep: "#0d0b09",
            panel: "#1a1612",
            card: "#2a2318",
            parchment: "#3d3428",
          },
          primary: "#d4a574",
          "primary-bright": "#e8c79a",
          accent: "#c41e3a",
          "accent-glow": "#ff4d6d",
          text: {
            primary: "#f5e6d3",
            secondary: "#b8a082",
            muted: "#6b5c4a",
          },
        },

        // Game resources
        grain: {
          DEFAULT: "#daa520",
          light: "#e8c252",
          dark: "#b8860b",
        },
        wood: {
          DEFAULT: "#8b5a2b",
          light: "#a0724a",
          dark: "#6b4423",
        },
        gold: {
          DEFAULT: "#ffd700",
          light: "#ffdf33",
          dark: "#ccac00",
        },

        // Eras
        era: {
          peace: "#4a7c59",
          war: "#a41e1e",
          invasion: "#6b2d6b",
        },

        // Clan colors
        clan: {
          ferronatos: "#b22222",
          verdaneos: "#2e8b57",
          umbral: "#663399",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        cinzel: ["var(--font-cinzel)"],
        "cinzel-decorative": ["var(--font-cinzel-decorative)"],
        crimson: ["var(--font-crimson)"],
      },
      backgroundImage: {
        "parchment-texture": "url('/textures/parchment-noise.png')",
        "medieval-gradient": "linear-gradient(to bottom, #2a2318, #1a1612)",
      },
      boxShadow: {
        "golden-glow": "0 0 20px rgba(212, 165, 116, 0.4)",
        "golden-glow-lg": "0 0 40px rgba(212, 165, 116, 0.6)",
        "crimson-glow": "0 0 20px rgba(196, 30, 58, 0.4)",
        "era-peace": "0 0 20px rgba(74, 124, 89, 0.4)",
        "era-war": "0 0 20px rgba(164, 30, 30, 0.4)",
        "era-invasion": "0 0 20px rgba(107, 45, 107, 0.4)",
        "metal-inset": "inset 0 1px 0 rgba(255,255,255,0.1), 0 4px 8px rgba(0,0,0,0.5)",
      },
      animation: {
        "pulse-golden": "pulse-golden 2s ease-in-out infinite",
        "float-up": "float-up 1.2s ease-out forwards",
        "shake": "shake 0.4s ease-in-out",
        "glow-pulse": "glow-pulse 1s ease-in-out infinite",
      },
      keyframes: {
        "pulse-golden": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 165, 116, 0)" },
          "50%": { boxShadow: "0 0 20px 8px rgba(212, 165, 116, 0.3)" },
        },
        "float-up": {
          "0%": { opacity: "1", transform: "translateY(0) scale(1)" },
          "50%": { opacity: "1", transform: "translateY(-30px) scale(1.3)" },
          "100%": { opacity: "0", transform: "translateY(-60px) scale(1)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
