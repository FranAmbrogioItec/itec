/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#06565F',
        'primary-dark': '#05444C',
        'primary-light': '#0A7C8A',
        'accent': '#ffffff',
        'accent-light': '#FB923C',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
