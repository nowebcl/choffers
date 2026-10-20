/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070f1e',
          900: '#0a192f',
          850: '#0c1d38',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
        },
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          500: '#38bdf8',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#0284c7',
        },
        slate: {
          850: '#172033',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -4px rgba(0, 0, 0, 0.02)',
        'card': '0 10px 30px -5px rgba(15, 23, 42, 0.04), 0 4px 10px -2px rgba(15, 23, 42, 0.02)',
        'elevated': '0 20px 40px -10px rgba(15, 23, 42, 0.08), 0 1px 3px 0 rgba(0, 0, 0, 0.04)',
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
