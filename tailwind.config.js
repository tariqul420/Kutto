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
        'color-accent-d': '#38BD67',
        'color-text-d': '#F4F4F9',

        'color-primary': '#F9FAFB',
        'color-accent': '#38BD67',
        // 'color-text': '#212121',
        'color-text': "#09101a",
        'dark-lite': "#121b27",
        // 'primary1': "#2FA258",
        // 'primary2': "#38BD67",
      },
      fontFamily: {
        "Montserrat": ["Montserrat"],
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}