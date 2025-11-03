/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      colors: {
        paper: '#fafaf7',
        ink: '#1f2937',
        accent: '#3f6a8a',
      },
      container: { center: true, padding: '1rem' },
    },
  },
  plugins: [],
}
