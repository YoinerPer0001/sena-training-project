const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'verdeSena': '#39a900',
        'verdeSecundario': '#dbffc9',
        'azulSena': '#00324D',
        'azulSecundarioSena': '#6fccff',
        'naranjaSena': '#FF6C20',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};