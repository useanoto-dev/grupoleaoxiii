/**
 * NOTE: This project uses Tailwind CSS v4, which configures design tokens
 * via CSS `@theme` blocks in globals.css rather than this config file.
 * This file is kept for tooling compatibility and documentation purposes.
 *
 * The actual design tokens are defined in src/app/globals.css.
 * See: https://tailwindcss.com/docs/v4-upgrade
 */
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B63A3',
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#2472B6',
          foreground: '#FFFFFF',
        },
        cta: {
          DEFAULT: '#068419',
          foreground: '#FFFFFF',
        },
        background: '#f0f7ff',
        surface: '#FFFFFF',
        muted: {
          DEFAULT: '#4a5c70',
          foreground: '#374151',
        },
        border: '#d0dde8',
        destructive: {
          DEFAULT: '#EF4444',
          foreground: '#FFFFFF',
        },
        warning: {
          DEFAULT: '#F59E0B',
          foreground: '#FFFFFF',
        },
        // Design system tokens
        'clinic-primary': '#1B63A3',
        'clinic-secondary': '#2472B6',
        'clinic-cta': '#068419',
        'clinic-bg': '#f0f7ff',
        'clinic-text': '#0a1628',
        'clinic-surface': '#FFFFFF',
        'clinic-muted': '#4a5c70',
        'clinic-border': '#d0dde8',
        'clinic-error': '#EF4444',
        'clinic-warning': '#F59E0B',
      },
      fontFamily: {
        heading: ['Figtree', 'sans-serif'],
        body: ['Noto Sans', 'sans-serif'],
        sans: ['Noto Sans', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        elevated:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        floating:
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

export default config
