import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment:    '#F5F0E8',
        hunter:       '#2A5220',
        forest:       '#3B6D11',
        sage:         '#EAF0E2',
        charcoal:     '#1C1C1A',
        muted:        '#5C5C52',
        divider:      '#C4B99A',
        'green-soft': '#A8C490',
        'green-bright':'#97C459',
        placeholder:  '#B4B099',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        sans:     ['var(--font-dm-sans)', 'sans-serif'],
        headline: ['var(--font-playfair)', 'serif'],
        body:     ['var(--font-dm-sans)', 'sans-serif'],
        label:    ['var(--font-dm-sans)', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        sm:  '0px',
        md:  '0px',
        lg:  '0px',
        xl:  '0px',
        '2xl': '0px',
        full: '9999px', // keep for star ratings & video ring
      },
      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'clip-reveal': {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up-16': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%':   { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'reveal-scroll': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up':    'fade-in-up 0.5s ease both',
        'clip-reveal':   'clip-reveal 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in':       'fade-in 0.5s ease both',
        'fade-in-up-16': 'fade-in-up-16 0.6s ease both',
        'slide-up':      'slide-up 0.3s ease both',
      },
    },
  },
  plugins: [],
}

export default config
