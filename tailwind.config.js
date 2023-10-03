/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        pulsate: 'pulsate 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
