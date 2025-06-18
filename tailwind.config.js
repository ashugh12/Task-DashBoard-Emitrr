/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        vibrate: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-1px)' },
          '40%': { transform: 'translateX(1px)' },
          '60%': { transform: 'translateX(-1px)' },
          '80%': { transform: 'translateX(1px)' },
        },
      },
      animation: {
        vibrate: 'vibrate 0.2s linear infinite',
      },
    },
  },
  plugins: [],
}
