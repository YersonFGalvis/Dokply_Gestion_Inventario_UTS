/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.pug", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ]
}