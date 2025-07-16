import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1c3129",
          50: "#f0f4f2",
          100: "#dce6e0",
          200: "#b9cdc1",
          300: "#8fb09d",
          400: "#689179",
          500: "#4f7460",
          600: "#3e5c4c",
          700: "#1c3129",
          800: "#162620",
          900: "#111d18",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#D2B48C",
          50: "#faf8f4",
          100: "#f4ede2",
          200: "#e8d7c0",
          300: "#dbc199",
          400: "#D2B48C",
          500: "#c4a373",
          600: "#b08f5e",
          700: "#927650",
          800: "#786147",
          900: "#62503c",
          foreground: "#1c3129",
        },
        accent: {
          DEFAULT: "#f0f4f2",
          foreground: "#1c3129",
        },
        muted: {
          DEFAULT: "#f0f4f2",
          foreground: "#689179",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
