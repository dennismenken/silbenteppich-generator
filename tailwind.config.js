/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'geist': ['Geist', 'system-ui', 'sans-serif'],
        'andika': ['Andika', 'system-ui', 'sans-serif'],

        'clean': ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        'primary': '#0f172a',
        'secondary': '#64748b',
        'accent': '#3b82f6',
        'muted': '#f8fafc',
        'border': '#e2e8f0',
        'subtle': '#94a3b8',
        'surface': '#ffffff',
        'surface-muted': '#f1f5f9'
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'moderate': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'print': 'none'
      },

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}