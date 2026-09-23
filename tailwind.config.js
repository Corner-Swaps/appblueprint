/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#0071e3',
          'blue-hover': '#0077ed',
          gray: {
            50: '#fbfbfd',
            100: '#f5f5f7',
            200: '#e5e5ea',
            300: '#d1d1d6',
            400: '#8e8e93',
            500: '#636366',
            600: '#48484a',
            700: '#3a3a3c',
            800: '#2c2c2e',
            900: '#1c1c1e',
            950: '#000000',
          },
          green: '#34c759',
          yellow: '#ff9f0a',
          red: '#ff3b30',
          purple: '#af52de',
          indigo: '#5856d6',
          teal: '#30b0c7'
        }
      },
      fontFamily: {
        google: [
          '"Google Sans"',
          'Product Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          'sans-serif'
        ],
        sans: [
          '"Google Sans"',
          'Product Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
        mono: [
          '"SF Mono"',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          'monospace'
        ]
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'apple-sm': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'apple-md': '0 4px 14px rgba(0,0,0,0.08)',
        'apple-lg': '0 12px 30px rgba(0,0,0,0.12)',
      },
      backdropBlur: {
        'apple': '20px',
      }
    },
  },
  plugins: [],
}
