/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#D4AF37',
          600: '#BF953F',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      fontFamily: {
        'cormorant': ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        'montserrat': ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        'sans': ['var(--font-montserrat)', 'Montserrat', 'system-ui', 'sans-serif'],
        'serif': ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      }
    },
  },
  plugins: [],
}