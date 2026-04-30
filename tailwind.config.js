/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#003d9b',
        'primary-light': '#0052cc',

        background: '#f9f9ff',
        surface: '#f1f3ff',
        'surface-strong': '#d7e2ff',

        white: '#ffffff',
        border: '#DDDDDD',

        // text
        'text-primary': '#041b3c',
        'text-secondary': '#4f5f7b',
        'text-muted': '#9ca3af',
        'text-heading': '#333333',

        // brand / accent
        'accent-light': '#CDDDFF',
        accent: '#036EFF',

        // semantic
        success: '#82f9be',
        error: '#ba1a1a',
        warning: '#ffb300',
      },

      fontFamily: {
        base: ['Inter', 'sans-serif'],
      },
      borderWidth: { 1.5: '1.5px' },
      borderRadius: {
        bodys: '15px',
      },
      fontSize: {
        bodyxs: '10px',
        bodysm: '14px',
        bodylg: '18px',
        bodyxl: '22px',
      },
      spacing: {
        21: '84px',
        26: '106px',
        45: '182px',
        76: '306px',
        256: '1024px',
      },
      letterSpacing: {
        tight: '0.6px',
      },
      lineHeight: {
        tight: '15px',
        normal: '20px',
        relaxed: '26px',
      },
    },
  },
  plugins: [],
};
