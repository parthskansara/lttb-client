/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/*.{js,ts,tsx,jsx}",
    "./src/**/*.{js,ts,tsx, jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "spotify-green": "#1DB954",
      },
    },
  },
  plugins: [],
};
