/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public_html/**/*.{html,js}", "./javascript/**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'judul': ['Bebas Neue', 'sans-serif'],
        'subJudul': ['Fira Sans Condensed', 'sans-serif'],
        'isi': ['Karma', 'serif'],
        'dekorasi': ['Rye', 'cursive']
      },
      colors: {
        'fixNav': '#f1f5f9',
        'scrollNav': 'white',
        'textFixNav': '#52525b',
        'textScrollNav': '#52525b',
        'bgTerang': '#e2e8f0',
        'bgGelap': '#1e293b',
        'textTerang': '#18181b',
        'textGelap': '#cbd5e1',
        'bgGradasiTerang': 'linear-gradient(358deg, #e2e8f0 0%, rgba(240, 255, 255, 1) 47%, rgba(255, 233, 233, 1) 69%, rgba(200, 255, 235, 1) 100%);',
        'bgGradasiGelap': 'linear-gradient(347deg, rgba(33, 42, 62, 1) 45%, #1a5349 75%, rgba(33, 42, 62, 1) 100%);',

      }
    },
  },
  plugins: [],
}

