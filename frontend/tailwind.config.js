/** @type {import('tailwindcss').Config} */

// const defaultTheme = require('tailwindcss/defaultTheme')
import defaultTheme from 'tailwindcss/defaultTheme'



export default {
  content: [
    "./index.html",
    "./src/**/*.html",
    "./src/**/*.css",
    "./src/**/*.js",
    "./src/**/*.jsx"
  ],
  theme: {
    extend: {
      sans: [
        
        ...defaultTheme.fontFamily.sans
      ]
    },
  },
  plugins: [],
}

