/** @type {import('tailwindcss').Config} */
const dbSans = ["'DB Sans'", "sans-serif"];

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FFA53F",
      },
      // DB Sans is used for the entire site; legacy font utilities map to it too
      fontFamily: {
        sans: dbSans,
        serif: dbSans,
        mono: dbSans,
        montserrat: dbSans,
        cormorant: dbSans,
      },
    },
  },
  plugins: [],
};
