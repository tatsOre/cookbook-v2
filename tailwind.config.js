/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: "'Mona Sans', sans-serif",
      },
      fontSize: {
        10: '0.625rem',
        12: '0.75rem',
        14: '0.875rem',
        16: '1rem',
        18: '1.125rem',
        20: '1.25rem',
        24: '1.5rem',
        30: '1.875rem',
        32: '2rem',
        36: '2.25rem',
        48: '3rem',
        90: '5.625rem'
      },
      lineHeight: {
        120: '120%',
        130: '130%',
        140: '140%',
        150: '150%',
        160: '160%'
      },
      screens: {
        'xxs': '375px',
        'xs': '420px',
        'print': { 'raw': 'print' },
        screen: { raw: 'screen' },
      }
    }
  },
  plugins: []
}
