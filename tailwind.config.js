/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#8C7343',
          50: '#F8F5EF',
          100: '#F0EADF',
          200: '#E0D5C0',
          300: '#C4B49A',
          400: '#A69273',
          500: '#8C7343',
          600: '#7A6238',
          700: '#68512E',
          800: '#564124',
          900: '#44311A',
        },
        cream: {
          DEFAULT: '#F5F2ED',
          50: '#FAF8F5',
          100: '#F5F2ED',
          200: '#EBE5DD',
          300: '#E0D8CD',
          400: '#D6CBBD',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 24px rgba(0, 0, 0, 0.06)',
        'gold': '0 4px 20px rgba(140, 115, 67, 0.2)',
      },
      borderRadius: {
        'soft': '12px',
        'smooth': '16px',
      },
    },
  },
  plugins: [],
}