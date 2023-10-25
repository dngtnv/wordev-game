/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        berkshire: ['Berkshire Swash'],
      },
      colors: {
        primary: '#24283b',
        secondary: '#b4f9f8',
        main: {
          red: '#f7768e',
          'light-orange': '#ff9e64',
          orange: '#965027',
          cyan: '#b4f9f8',
          purple: '#bb9af7',
          blue: '#7aa2f7',
          green: '#9ece6a',
          yellow: '#e0af68',
          gray: '#414868',
          'light-gray': '#9aa5ce',
        },
      },
      animation: {
        pop: 'pop 0.1s ease-in',
        shake: 'shake 0.6s ease-out',
        flip: 'flip 0.5s linear',
        jump: 'jump 0.5s ease',
        slideIn: 'slideIn 0.2s ease',
        slideOut: 'slideOut 0.2s ease',
      },
      keyframes: {
        // pop: {
        //   '0%': { transform: 'scale(1.1)' },
        //   '100%': { transform: 'scale(1)' },
        // },
        pop: {
          from: { transform: 'scale(0.8)', opacity: 0 },
          '40%': { transform: 'scale(1.1)', opacity: 1 },
        },
        shake: {
          '10%, 90%': { transform: 'translateX(-1px)' },
          '20%, 80%': { transform: 'translateX(2px)' },
          '30%, 50%, 70%': { transform: 'translateX(-4px)' },
          '40%, 60%': { transform: 'translateX(4px)' },
        },
        flip: {
          '0%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0)' },
          '100%': { transform: 'scaleY(1)' },
        },
        jump: {
          '0%': { transform: 'translateY(-18px)' },
          '25%': { transform: 'translateY(4px)' },
          '50%': { transform: 'translateY(-10px)' },
          '75%': { transform: 'translateY(2px)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateY(30px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideOut: {
          '0%': { transform: 'translateY(0)', opacity: 1 },
          '100%': { transform: 'translateY(30px)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
