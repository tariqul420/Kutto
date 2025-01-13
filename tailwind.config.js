/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color-primary-d': '#09101a',
        'color-accent-d': '#F04335',
        'color-text-d': '#F4F4F9',

        'color-primary': '#F9FAFB',
        'color-accent': '#F04335',
        'color-text': "#09101a",
        'dark-lite': "#121b27",
      },
      fontFamily: {
        "Montserrat": ["Montserrat"],
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}