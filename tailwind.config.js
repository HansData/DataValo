/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'judul': ['Bebas Neue', 'sans-serif'],
        'subJudul': ['Fira Sans Condensed', 'sans-serif'],
        'isi': ['Karma', 'serif'],
        'dekorasi': ['Fredericka the Great', 'cursive']
      }
    },
  },
  plugins: [],
}

