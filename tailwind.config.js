/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'jm-primary':    '#536049',
        'jm-accent':     '#6c7960',
        'jm-bg':         '#fbf9f5',
        'jm-bg-section': '#f6f3ef',
        'jm-bg-card':    '#f0edea',
        'jm-heading':    '#1b1c1a',
        'jm-body':       '#454840',
      },
      fontFamily: {
        'manrope': ['Manrope', 'sans-serif'],
        'inter':   ['Inter', 'sans-serif'],
      },
      keyframes: {
        'scroll-left': {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'scroll-right': {
          from: { transform: 'translateX(-50%)' },
          to:   { transform: 'translateX(0)' },
        },
      },
      animation: {
        'scroll-left':  'scroll-left 40s linear infinite',
        'scroll-right': 'scroll-right 40s linear infinite',
      },
    },
  },
  plugins: [],
}

