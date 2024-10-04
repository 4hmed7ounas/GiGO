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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          "50": "#edfcfe",
          "100": "#d1f6fc",
          "200": "#a9ecf8",
          "300": "#6ddcf3",
          "400": "#2bc3e5",
          "500": "#0fa6cb",
          "600": "#0f84ab",
          "700": "#136a8b",
          "800": "#195771",
          "900": "#19485f",
          "950": "#0a2f42",
        },
        secondary: {
          "50": "#f8f9ec",
          "100": "#eef1d6",
          "200": "#d9e0a4",
          "300": "#c8d284",
          "400": "#b0bf5c",
          "500": "#94a43e",
          "600": "#72822e",
          "700": "#586427",
          "800": "#475024",
          "900": "#3d4522",
          "950": "#1f250e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
