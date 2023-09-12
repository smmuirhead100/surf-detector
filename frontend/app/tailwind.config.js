/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'twosurfblue': '#257CFF',
        'twosurflightblue': '#5BE2FF'
      },
      height: {
        '1/2screen': '50vh'
      }
    },
  },
  plugins: [],
}