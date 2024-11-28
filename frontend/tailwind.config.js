/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#212121",
        "secondary-color": "#D68A2E",
        "dark-color": "#171717",
        "accent-color": "#F4E1D2",
      }
    },
  },
  plugins: [],
}