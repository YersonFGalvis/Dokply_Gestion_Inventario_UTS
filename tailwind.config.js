/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/**/*.pug", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      screens: {
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ]
}