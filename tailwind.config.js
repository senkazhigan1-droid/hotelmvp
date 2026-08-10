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
          DEFAULT: '#B8860B',
          50: '#FDF8F0',
          100: '#FBF0D8',
          200: '#F7E0B0',
          300: '#F0CC85',
          400: '#E8B55A',
          500: '#B8860B',
          600: '#A0760A',
          700: '#886608',
          800: '#705506',
          900: '#584504',
        },
        warm: {
          DEFAULT: '#FFF8F0',
          light: '#FDF5E6',
          cream: '#FDF5E6',
          honey: '#FFF8F0',
          dark: '#3D2B1F',
          caramel: '#D4A574',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(184, 134, 11, 0.08)',
        'medium': '0 4px 24px rgba(184, 134, 11, 0.10)',
        'gold': '0 4px 20px rgba(184, 134, 11, 0.20)',
        'warm': '0 8px 32px rgba(184, 134, 11, 0.12)',
      },
      borderRadius: {
        'soft': '12px',
        'smooth': '16px',
      },
    },
  },
  plugins: [],
}