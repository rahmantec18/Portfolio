/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: '420px',
      },
      fontFamily: {
        display: ['Britney', 'Syne', 'sans-serif'],
        body: ['Quicksand', 'sans-serif'],
        ui: ['Quicksand', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        deep: {
          950: '#020205',
          900: '#05050d',
          850: '#090a16',
          800: '#0e1224',
        },
        brand: {
          cyan: '#00f2fe',
          blue: '#4facfe',
          purple: '#8b5cf6',
          violet: '#c084fc',
          amber: '#fbbf24',
          rose: '#f43f5e',
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
