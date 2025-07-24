/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // Watch all tsx/jsx files across the monorepo
    '../../apps/*/src/**/*.{tsx,jsx,ts,js}',
    '../../packages/*/src/**/*.{tsx,jsx,ts,js}',
    // Exclude node_modules and dist directories
    '!../../**/node_modules/**',
    '!../../**/dist/**',
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
}