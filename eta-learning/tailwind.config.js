/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Paths to your files
  theme: {
    extend: {
      colors: {
        babyBlue: '#dff6ff',
        babyPink: '#ffd6e8',
        mainPink: '#ff007f',
        mainBlue: '#00bfff',
      },
    },
  },
  plugins: [],
};
