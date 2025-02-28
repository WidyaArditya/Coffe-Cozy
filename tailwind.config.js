/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./public/*.{html,js}', './src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        coffe: '#b6895b',
        bg: '#010101',
      },
      fontFamily: {
        poppins: ['Poppins', 'Sans-serif'],
        roboto: ['Roboto', 'Sans-serif'],
      },
      screens: {
        xl: '1440px',
        xxl: '2560px',
      },
    },
  },
  plugins: [],
};
