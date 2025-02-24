const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  // mode: 'jit',
  // purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'nav-text-hover': '#FD4717',
        primary: '#6F9BFC',
        'dark-primary': '#0B56FA',
        secondary: '#252A34',
      },
      boxShadow: {
        large: '0px 0px 14px 0px rgba(0, 0, 0, 0.39)', // This matches your value
      },
      textStrokeWidth: {
        1: '1px',
        2: '2px',
      },
      textStrokeColor: {
        black: '#000',
        white: '#fff',
      },
    },
    fontFamily: {
      body: ['eczar'],
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [
  //   require('@tailwindcss/forms'),
  //   require('@tailwindcss/aspect-ratio'),
  // ],
};
