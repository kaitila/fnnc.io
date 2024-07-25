import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      spacing: {
        '0.25': '0.06125rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
        '192': '48rem',
        '224': '56rem',
        '240': '60rem',
        '256': '64rem',
      },
      colors: {
        primary: '#0284c7',
        secondary: '#818cf8',
        hover: '#0369a1',
        active: '#075985',
        text: '#292524', /* 1. #334155 2. #1f2937 */
        light: '#64748b',
        lighter: '#cbd5e1',
        bg: '#f8fafc',
        bgVariant: '#f1f5f9',
        darkLight: '#cbd5e1',
        closed: '#f87171',
        open: '#4ade80',
      },
      borderRadius: {
        xs: '0.06125rem',
      },
      lineHeight: {
        '0': '0',
      }
    },
  },
  plugins: [],
};
export default config;
