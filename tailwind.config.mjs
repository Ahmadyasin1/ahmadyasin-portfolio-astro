/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'cyber-blue': '#00fff5',
        'cyber-purple': '#ff00ff',
        'cyber-dark': '#0a0a0a',
        'cyber-light': '#e0e0ff',
        primary: '#00fff5',
        secondary: '#ff00ff'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        orbitron: ['Orbitron', 'sans-serif']
      },
      animation: {
        'cyber-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cyber-glow': 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 10px #00fff5, 0 0 20px #00fff5' },
          '100%': { textShadow: '0 0 20px #00fff5, 0 0 30px #00fff5, 0 0 40px #00fff5' }
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(rgba(0, 255, 245, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 245, 0.1) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
}