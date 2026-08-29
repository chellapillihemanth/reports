/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paytm: {
          navy: '#002970',
          'navy-dark': '#001948',
          blue: '#00baf2',
          'blue-hover': '#00a0d2',
          sky: '#f5f9fe',
          'sky-light': '#f0f7fe',
          'sky-border': '#dcecfe',
          gray: '#52617a',
          'gray-light': '#f8fafc',
          green: '#00ba88',
          orange: '#f58220',
          red: '#ea2b48',
        },
        risk: {
          high: '#ea2b48',
          medium: '#f58220',
          low: '#00ba88',
          info: '#00baf2',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'paytm': '0 2px 8px 0 rgba(0, 41, 112, 0.06)',
        'paytm-hover': '0 6px 16px 0 rgba(0, 41, 112, 0.09)',
        'paytm-card': '0 1px 3px 0 rgba(0, 41, 112, 0.04)',
      },
      borderRadius: {
        'paytm': '1rem',
      }
    },
  },
  plugins: [],
}
