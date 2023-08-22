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
  ],
  theme: {
    extend: {
      boxShadow: {
        outline: "0 4px 12px rgba(0,0,0,.04)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
