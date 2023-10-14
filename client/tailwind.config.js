/* @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      'background': "#1a1a1a",
    },
  },
  darkMode: "class",
  plugins: [require("flowbite/plugin")],
};
