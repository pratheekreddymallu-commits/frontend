/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#123b2a',
        emerald: '#2d8f5f',
        lime: '#b7d94b',
        ivory: '#f6f4ee',
        charcoal: '#1f2933',
      },
      boxShadow: {
        soft: '0 12px 32px rgba(18,59,42,0.12)',
      },
    },
  },
  plugins: [],
}

