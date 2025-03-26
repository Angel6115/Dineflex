// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dineflex: {
          primary: "#5B2A86",      // Violeta oscuro elegante
          secondary: "#A678B0",    // Violeta claro suave
          background: "#F9FAFB",   // Fondo general claro
          light: "#FFFFFF",        // Blanco puro
          dark: "#111827",         // Negro suave
        },
      },
    },
  },
  plugins: [],
};
