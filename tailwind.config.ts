/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
    "node_modules/tailvue/dist/tailvue.es.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        outline: "0 4px 12px rgba(0,0,0,.04)",
      },
      colors: {
        primary: "#1e429f",
        secondary: "#2d3d8b",
        success: "#09815C",
        danger: "#e3363e",
        warning: "#e38836",
        info: "#4da7d4",
        light: "#f8f9f9",
        grey: "#f7f8f9",
        dark: "#000c2d",
        mutted: "#687385",
        "dark-mutted": "#b4bfd0",
        "primary-border": "#9b9b9b",
        "secondary-border": "#f0f8ff",
        "mutted-border": "#eaecee",
        "dark-mutted-border": "#3e4451",
        "dark-grey": "#1f2326",
      },
    },
    container: {
      screens: {
        sm: "540px",
        md: "720px",
        lg: "960px",
        xl: "1140px",
        "2xl": "1320px",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
