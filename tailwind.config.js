/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}", "!./node_modules/**/*"],
  theme: {
    extend: {
      fontFamily: {
        redHat: ['"Red Hat Display"', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        darkgreen: "#627056", // Dark Green
        creamwhite: "#F5F3EE", // Cream White
        brown: "#5A4633", // Brown
      },
    },
  },
  plugins: [],
};

