import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      // Custom color palette
      ink: '#17211b',
      muted: '#68736d',
      paper: '#f4f0e8',
      surface: '#fffdf8',
      coral: '#e9684b',
      teal: '#126b68',
      line: '#d9d4c9',
      // Standard colors
      transparent: 'transparent',
      white: '#ffffff',
      black: '#000000',
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827',
      },
      red: {
        600: '#dc2626',
      },
      yellow: {
        50: '#fefce8',
        100: '#fef3c7',
      },
    },
    fontFamily: {
      serif: ['Georgia', 'Times New Roman', 'serif'],
      sans: ['Arial', 'Helvetica', 'sans-serif'],
    },
    extend: {
      fontSize: {
        eyebrow: '12px',
      },
      spacing: {
        'container-padding': 'clamp(32px, 8vw, 120px)',
      },
      borderRadius: {
        'portrait': '48% 48% 8px 8px',
      },
      aspectRatio: {
        'portrait': '4 / 5',
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(#d9d4c9 0.8px, transparent 0.8px)',
      },
      backgroundSize: {
        'dot-grid': '18px 18px',
      },
      width: {
        'container': 'min(92%, 1160px)',
      },
      maxWidth: {
        'container': '1160px',
      },
      transitionDuration: {
        'fast': '200ms',
      },
    },
  },
  plugins: [],
};

export default config;

