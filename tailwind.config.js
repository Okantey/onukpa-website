// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        primary: '#41b344',
        secondary: '#FCB501',
        surface: {
          DEFAULT: '#fafaf9',
          muted: '#f5f5f4',
          warm: '#f3f1ec',
          /** Soft green-gray banding */
          sage: '#e8eee9',
          /** Between white and stone-100 */
          parchment: '#f6f4f0',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}