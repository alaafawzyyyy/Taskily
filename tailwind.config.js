/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // primary
        primary: '#003d9b',
        'primary-container': ' #0052cc',
        'surface-highest': '#d7e2ff',
        'surface-low': '#f1f3ff',
        background: '#f9f9ff',

        // slate neutrals
        'slate-900': '#041b3c',
        'slate-700': '#4f5f7b',
        'slate-300': '#c3c6d6',

        // semantic
        success: '#82f9be',
        error: '#ba1a1a',
        warning: '#ffb300',
      },
      fontFamily: {
        base: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
