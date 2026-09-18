/**
 * Tailwind CSS Configuration — ETA Learning
 *
 * Mobile-First Breakpoints (Tailwind default, no overrides):
 *   (base)  → < 640px   small phones      (mobile-first default styles)
 *   sm:     → ≥ 640px   large phones
 *   md:     → ≥ 768px   tablet portrait / small laptops
 *   lg:     → ≥ 1024px  desktop
 *   xl:     → ≥ 1280px  large desktop
 *   2xl:    → ≥ 1536px  4K / ultrawide
 *
 * Desktop styles are defined at md: and above to preserve the
 * existing desktop experience unchanged.
 */
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
