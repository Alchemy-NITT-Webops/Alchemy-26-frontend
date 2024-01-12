/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,tsx}"],
  theme: {
    colors : {
      white : '#ffffff',
      black : '#000000',
      blue : '#639FE8',
      cyan : '#63FBDB',
      green : '#00B36B',
      grey : 'cdcdcd'
    },
    extend: {
      fontFamily: {
        montserrat : ['"Montserrat"', "sans-serif"],
        chakraPetch : ['"Chakra Petch"', "sans-serif"],
        airnt : ['"Airnt"', "mono"],
        nunito : ["Nunito", "sans-serif"]
      },
      spacing:{
        30 : '7.5rem',
        68 : '17.5rem',
        22 : '5.5rem',
        18 : '4.5rem',
        13 : '3.25rem',
        108 : '27rem',
        58 : '14.75rem',
        100 : '25.25rem',
        34 : '8.5rem'
      }
    },
    backgroundImage:{
      navButton : "url('/src/assets/navbar-button.svg')"
    }
  },
  plugins: [],
}

