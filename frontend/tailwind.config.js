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
    // fontFamily: {
    //   poppins: ['Poppins', 'sans-serif'],
    // },
    extend: {
      fontFamily: {
        sans: [
          '"Poppins"',
          ...defaultTheme.fontFamily.sans
        ]
      },
      fontSize: {
        hl: '48px',
        hm: '40px',
        hs: '33px',
        tl: '28px',
        tm: '25px',
        ts: '23px',
        bl: '19px',
        bm: '16px',
        bs: '14px',
        ll: '14px',
        lm: '11px',
        ls: '11px',
      },

      fontWeight: {
        hl: 200,
        hm: 400,
        hs: 300,
        tl: 400,
        tm: 500,
        ts: 600,
        bl: 300,
        bm: 400,
        bs: 600,
        ll: 400,
        lm: 600,
        ls: 500,
      },

      colors: {
        'background-0': '#ffffff',
        'background-1': '#F8F8F8',
        'background-2': '#F0F0F0',
        'background-3': '#E8E8E8',
        'background-4': '#E0E0E0',
        'background-5': '#D8D8D8',
        'background-6': '#D0D0D0',

        'danger-50': 'hsl(2, 100, 95)',
        'danger-100': 'hsl(2, 100, 90)',
        'danger-200': 'hsl(2, 100, 80)',
        'danger-300': 'hsl(2, 100, 70)',
        'danger-400': 'hsl(2, 100, 60)',
        'danger-500': 'hsl(2, 100, 50)',
        'danger-600': 'hsl(2, 100, 40)',
        'danger-700': 'hsl(2, 100, 30)',
        'danger-800': 'hsl(2, 100, 20)',
        'danger-900': 'hsl(2, 100, 10)',

        'warning-50': 'hsl(53, 100, 95)',
        'warning-100': 'hsl(53, 100, 90)',
        'warning-200': 'hsl(53, 100, 80)',
        'warning-300': 'hsl(53, 100, 70)',
        'warning-400': 'hsl(53, 100, 60)',
        'warning-500': 'hsl(53, 100, 50)',
        'warning-600': 'hsl(53, 100, 40)',
        'warning-700': 'hsl(53, 100, 30)',
        'warning-800': 'hsl(53, 100, 20)',
        'warning-900': 'hsl(53, 100, 10)',

        'success-50': 'hsl(130, 100, 95)',
        'success-100': 'hsl(130, 100, 90)',
        'success-200': 'hsl(130, 100, 80)',
        'success-300': 'hsl(130, 100, 70)',
        'success-400': 'hsl(130, 100, 60)',
        'success-500': 'hsl(130, 100, 50)',
        'success-600': 'hsl(130, 100, 40)',
        'success-700': 'hsl(130, 100, 30)',
        'success-800': 'hsl(130, 100, 20)',
        'success-900': 'hsl(130, 100, 10)',

        'neutral-50': 'hsl(0, 0, 95)',
        'neutral-100': 'hsl(0, 0, 90)',
        'neutral-200': 'hsl(0, 0, 80)',
        'neutral-300': 'hsl(0, 0, 70)',
        'neutral-400': 'hsl(0, 0, 60)',
        'neutral-500': 'hsl(0, 0, 50)',
        'neutral-600': 'hsl(0, 0, 40)',
        'neutral-700': 'hsl(0, 0, 30)',
        'neutral-800': 'hsl(0, 0, 20)',
        'neutral-900': 'hsl(0, 0, 10)',

        'primary-50': 'hsl(226, 75, 95)',
        'primary-100': 'hsl(226, 75, 90)',
        'primary-200': 'hsl(226, 75, 80)',
        'primary-300': 'hsl(226, 75, 70)',
        'primary-400': 'hsl(226, 75, 60)',
        'primary-500': 'hsl(226, 75, 50)',
        'primary-600': 'hsl(226, 75, 40)',
        'primary-700': 'hsl(226, 75, 30)',
        'primary-800': 'hsl(226, 75, 20)',
        'primary-900': 'hsl(226, 75, 10)',

        'secondary-50': 'hsl(252, 100, 95)',
        'secondary-100': 'hsl(252, 100, 90)',
        'secondary-200': 'hsl(252, 100, 80)',
        'secondary-300': 'hsl(252, 100, 70)',
        'secondary-400': 'hsl(252, 100, 60)',
        'secondary-500': 'hsl(252, 100, 50)',
        'secondary-600': 'hsl(252, 100, 40)',
        'secondary-700': 'hsl(252, 100, 30)',
        'secondary-800': 'hsl(252, 100, 20)',
        'secondary-900': 'hsl(252, 100, 10)',

        'transparent': 'rgba(0, 0, 0, 0',
      }
    },
  },
  plugins: [],
}



