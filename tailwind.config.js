/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dcf2dc',
          500: '#2C5F2D',
          600: '#1e3f1f',
          700: '#1a351b',
          800: '#162b17',
          900: '#122412',
        },
        secondary: {
          100: '#f1f8e9',
          500: '#97BC62',
          600: '#7da552',
          700: '#6b8f45',
        },
        accent: {
          100: '#faf6e6',
          500: '#D4AF37',
          600: '#b8961f',
          700: '#9c7f1a',
        },
        surface: '#F5F5F5',
        border: '#E5E5E5',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.12)',
        'feature': '0 8px 32px rgba(44, 95, 45, 0.12)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}