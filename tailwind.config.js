/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          cream: "#FAF3DD",
          navy: "#2B2D42",
          yellow: "#FFD166",
          lavender: "#CDB4DB",
          coral: "#FBC4B6"
        }
      },
      borderWidth: {
        3: '3px'
      },
      boxShadow: {
        retro: '4px 4px 0px #2B2D42',
        'retro-hover': '2px 2px 0px #2B2D42',
        'card-retro': '6px 6px 0px #2B2D42',
        'card-hover': '8px 8px 0px #2B2D42'
      }
    }
  },
  plugins: []
}
