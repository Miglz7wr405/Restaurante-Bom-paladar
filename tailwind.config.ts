import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

// Brand tokens taken from the physical Bom Paladar menus: black boards, gold script, red pizza accent.
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        ink: {
          950: '#0b0b0c',
          900: '#131315',
          800: '#1c1c1f',
          700: '#2a2a2e',
          600: '#4a4a50',
        },
        gold: {
          200: '#f3e2b3',
          300: '#ecd08a',
          400: '#e0b85a',
          500: '#c99a3b',
          600: '#a87c27',
        },
        ember: {
          400: '#ef4a3f',
          500: '#d62f2a',
          600: '#b3241f',
          700: '#8c1b17',
        },
        cream: {
          50: '#fbf8f1',
          100: '#f4eee1',
          200: '#e8dfcb',
        },
        basil: {
          500: '#3f7d3a',
          600: '#2f6229',
        },
        muted: '#5c5852',
        wood: {
          600: '#6a4424',
          700: '#5b3a1f',
          800: '#4a2f19',
          900: '#3a2414',
        },
        brick: {
          700: '#2e1a14',
          800: '#2a1712',
          900: '#1a1210',
        },
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'Arial Narrow', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.75rem, 7vw, 6.25rem)', { lineHeight: '0.95', letterSpacing: '-0.01em' }],
        section: ['clamp(2rem, 4.2vw, 3.25rem)', { lineHeight: '1.05' }],
      },
      spacing: {
        section: 'clamp(4.5rem, 9vw, 8rem)',
        gutter: '1rem',
        nav: '4.5rem',
      },
      maxWidth: {
        site: '80rem',
      },
      borderRadius: {
        card: '1.25rem',
        blob: '58% 42% 55% 45% / 45% 52% 48% 55%',
      },
      boxShadow: {
        card: '0 10px 30px -12px rgb(11 11 12 / 0.25)',
        'card-hover': '0 24px 48px -16px rgb(11 11 12 / 0.45)',
        glow: '0 0 80px 10px rgb(224 184 90 / 0.25)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) rotate(0deg)' },
          '50%': { transform: 'translate3d(0, -14px, 0) rotate(6deg)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        progress: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        // Must match SLIDE_MS in Hero.tsx.
        'slide-progress': 'progress 5s linear forwards',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('hover-hover', '@media (hover: hover)')
    }),
  ],
} satisfies Config
