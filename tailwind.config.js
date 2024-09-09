import tailwindcssPrimeui from 'tailwindcss-primeui';
/** @type {import('tailwindcss').Config} */
export default {

  darkMode: 'class', // or 'media' for automatic based on user's OS setting
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [
    tailwindcssPrimeui
  ],
}

