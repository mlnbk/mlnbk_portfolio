/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      transitionDuration: {
        3000: '3000ms',
      },
      fontFamily: {
        voyager: ['Voyager', 'serif'],
      },
    },
  },
  plugins: [],
};
