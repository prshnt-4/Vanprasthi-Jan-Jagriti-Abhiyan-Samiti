/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FDFBF7',
          200: '#F7F3E9',
          300: '#EFE9DA',
          400: '#E3D7BF',
        },
        maroon: {
          50: '#FDF2F4',
          100: '#FBE5E9',
          500: '#B82E49',
          600: '#9B1D35',
          700: '#800020',
          800: '#6B1D2F',
          900: '#4A111F',
        },
        saffron: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        forest: {
          50: '#F0F7F1',
          100: '#DCEDE0',
          600: '#2E7D32',
          700: '#1E5128',
          800: '#153E1D',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-devanagari)', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(107, 29, 47, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 4px 10px -2px rgba(0, 0, 0, 0.02)',
      }
    },
  },
  plugins: [],
}
