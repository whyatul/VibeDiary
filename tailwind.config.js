/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode removed
  presets: [
    require('@tailwindcss/utilities')
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
        },
        secondary: {
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        // Simplified color palette - only light mode colors
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        blue: {
          100: '#DBEAFE',
          300: '#93C5FD',
          600: '#2563EB',
        },
        green: {
          100: '#D1FAE5',
          300: '#6EE7B7',
          600: '#059669',
        },
        yellow: {
          300: '#FCD34D',
        },
        purple: {
          100: '#EDE9FE',
          300: '#C4B5FD',
          600: '#7C3AED',
        },
        indigo: {
          100: '#E0E7FF',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
        },
        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
  plugins: [],
}
