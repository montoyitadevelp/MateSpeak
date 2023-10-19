/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6785B4",
        },
        secondary: {
          DEFAULT: "#563189",
        },
        accent: {
          DEFAULT: "#E94675",
        },
        negromate: {
          DEFAULT: "#020336",
        },
        zinc: {
          DEFAULT: "#F2F2F2",
        },
        darkzinc: {
          DEFAULT: "#D9D9D9",
        },
      },
    },
  },
  plugins: [],
};