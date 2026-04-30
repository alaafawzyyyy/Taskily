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
        border: '#DDDDDD',

        white: '#ffffff',
        'bg-light': '#CDDDFF',
        'bg-primary': '#036EFF',
        'bg-soft': '#EEF4FB',
        dark: '#C3C6D64D',

        'text-primary': '#041b3c',
        'text-secondary': '#4f5f7b',
        'text-muted': '#9ca3af',
        'text-heading': '#333333',
        'text-mid': '#434654',
        'text-icon': '#9ca3af',

        'text-primary-60': '#041B3C99',
        'text-primary-40': '#041B3C66',

        'slate-900': '#041b3c',

        'slate-700': '#4f5f7b',
        'slate-300': '#c3c6d6',
        slate: '#64748B',

        accent: '#036EFF',
        'accent-light': '#CDDDFF',
        'accent-muted': '#51617E',

        success: '#82f9be',
        error: '#ba1a1a',
        warning: '#ffb300',
      },
      fontFamily: {
        base: ['Inter', 'sans-serif'],
      },
      borderWidth: { 1.5: '1.5px'},
      borderRadius: {
        bodys: '15px',
      },
      fontSize: {
        bodyxs: '10px',
        bodysm: '14px',
        bodylg: '18px',
        bodyxl: '22.5px',
      },
      spacing: {
        21: '84px',
        26: '106px',
        45: '182px',
        76: '306px',
        256: '1024px',
        672: '672px',
        8.5: '8.5px',
        10: '10px',
        15: '15px',
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
