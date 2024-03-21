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
          '"Inter"',
          ...defaultTheme.fontFamily.sans
        ]
      },
      fontSize: {
        hl: '48px', hm: '40px', hs: '33px',
        tl: '28px', tm: '24px', ts: '20px',
        bl: '18px', bm: '16px', bs: '14px',
        ll: '14px', lm: '12px', ls: '12px',
      },

      fontWeight: {
        hl: 200, hm: 400, hs: 300,
        tl: 400, tm: 500, ts: 600,
        bl: 300, bm: 400, bs: 600,
        ll: 400, lm: 700, ls: 400,
      },

      colors: {
        'background-0': '#ffffff',
        'background-1': '#F8F8F8',
        'background-2': '#F0F0F0',
        'background-3': '#E8E8E8',
        'background-4': '#E0E0E0',
        'background-5': '#D8D8D8',
        'background-6': '#D0D0D0',

        'danger-50': '#ffe6e5',
        'danger-100': '#ffcecc',
        'danger-200': '#ff9c99',
        'danger-300': '#ff6b66',
        'danger-400': '#ff3a33',
        'danger-500': '#ff0800',
        'danger-600': '#cc0700',
        'danger-700': '#990500',
        'danger-800': '#660300',
        'danger-900': '#330200',
        
        'neutral-50': '#f2f2f2',
        'neutral-100': '#e6e6e6',
        'neutral-200': '#cccccc',
        'neutral-300': '#b3b3b3',
        'neutral-400': '#999999',
        'neutral-500': '#808080',
        'neutral-600': '#666666',
        'neutral-700': '#4d4d4d',
        'neutral-800': '#333333',
        'neutral-900': '#1a1a1a',  'black': '#1a1a1a',
        
        
        'primary-50': '#e9edfc',
        'primary-100': '#d2dbf9',
        'primary-200': '#a6b8f2',
        'primary-300': '#7994ec',
        'primary-400': '#4d70e5',
        'primary-500': '#204ddf', 'primary': '#1a3db3',
        'primary-600': '#1a3db3', 
        'primary-700': '#132e86', 
        'primary-800': '#0d1f59',
        'primary-900': '#060f2d',
        
        'secondary-50': '#ebe5ff',
        'secondary-100': '#d6ccff',
        'secondary-200': '#ad99ff',
        'secondary-300': '#8566ff',
        'secondary-400': '#5c33ff',
        'secondary-500': '#3300ff',
        'secondary-600': '#2900cc', 'secondary': '#2900cc',
        'secondary-700': '#1f0099',
        'secondary-800': '#140066',
        'secondary-900': '#0a0033',
        
        'success-50': '#e5ffea',
        'success-100': '#ccffd4',
        'success-200': '#99ffaa',
        'success-300': '#66ff7f',
        'success-400': '#33ff55',
        'success-500': '#00ff2a',
        'success-600': '#00cc22',
        'success-700': '#009919',
        'success-800': '#006611',
        'success-900': '#003308',
        
        'warning-50': '#fffce5',
        'warning-100': '#fff9cc',
        'warning-200': '#fff399',
        'warning-300': '#ffed66',
        'warning-400': '#ffe733',
        'warning-500': '#ffe100',
        'warning-600': '#ccb400',
        'warning-700': '#998700',
        'warning-800': '#665a00',
        'warning-900': '#332d00',

        'transparent': '#ffffff00',
      },

      animation: {
        'slidein-rl': 'slidein-rl 0.25s ease-in',
      },
      keyframes: {
        'slidein-rl': {
          '0%': { 
            transform: 'scale(0.9, 0.9)',
            opacity: 0
          },
          '100%': { 
            transform: 'scale(1, 1)' ,
            opacity: 100
          },
        }
      }
    },
  },
  plugins: [],
}



