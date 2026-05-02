/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.html",
    "./public/**/*.html",
    "./build.js"
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FAF7F2",
        "warm-dark": "#1C1A17",
        "warm-mid": "#4A4540",
        terracotta: "#C4623A",
        "terracotta-light": "#E8835F",
        "terracotta-pale": "#F5DDD4",
        "border-warm": "#E5DDD4",
        "sand": "#D4C5B0",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
