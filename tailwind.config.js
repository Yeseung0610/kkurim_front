/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#FDF9F5',
        'text-primary': '#594D46',
        'accent-coral': '#E0A899',
        'accent-cream': '#E5D5C5',
        'accent-sage': '#A3B396',
        'accent-steel': '#8B9DAD',
        'accent-charcoal': '#31302E',
      },
      fontFamily: {
        'sans': ['Montserrat', 'Noto Sans KR', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'noto': ['Noto Sans KR', 'sans-serif'],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      borderRadius: {
        'card': '16px',
        'button': '12px',
      },
      boxShadow: {
        'card': '0 2px 8px rgba(89, 77, 70, 0.08)',
      },
    },
  },
  plugins: [],
}
