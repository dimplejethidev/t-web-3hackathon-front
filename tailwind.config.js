/** @type {import('tailwindcss').Config} */

const primaryBaseColor = "#ff5c28";
const secondaryBaseColor = "#5535f2";
const bgColorBaseColor = "#a9abb1";
const innerShadowColor = "#1C1C1C";

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: primaryBaseColor,
          50: "#fbeae8",
          100: "#ffcdbe",
          200: "#ffad94",
          300: "#ff8d69",
          400: "#ff7448",
          500: primaryBaseColor,
          600: "#f85524",
          700: "#ea4e1f",
          800: "#dc471b",
          900: "#c33b13",
          shadow: "#c33b13",
          "i-shadow": innerShadowColor,
        },
        secondary: {
          DEFAULT: secondaryBaseColor,
          50: "#eee7fd",
          100: "#d2c5fa",
          200: "#b49ef8",
          300: "#9375f7",
          400: "#7655f5",
          500: secondaryBaseColor,
          600: "#4631eb",
          700: "#2b29e3",
          800: "#0023dd",
          900: "#0015d6",
          shadow: "#0015d6",
          "i-shadow": innerShadowColor,
        },
        black: {
          DEFAULT: bgColorBaseColor,
          50: "#f9fcff",
          100: "#f5f7fd",
          200: "#f0f2f8",
          300: "#e8ebf0",
          400: "#c7c9ce",
          500: bgColorBaseColor,
          600: "#7f8186",
          700: "#6b6d71",
          800: "#4b4d51",
          900: "#292b2f",
          shadow: "#4b4d51",
          "i-shadow": innerShadowColor,
        },
        error: "#B00020",
      },
      boxShadow: {
        "inner-main-s": `inset 10px 10px 0 0 ${innerShadowColor}`,
        "main-s": `5px 5px 0 0 ${innerShadowColor}`,
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("@tailwindcss/line-clamp"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "2px 2px 0px darkgrey",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  variants: {
    scrollbar: ["rounded"],
  },
};
