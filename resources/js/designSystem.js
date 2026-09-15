// Design System Tokens
export const colors = {
  navy: {
    50: '#F5F7FA',
    100: '#E4E7EC',
    200: '#C5C6C8',
    300: '#98A2B3',
    400: '#6B7285',
    500: '#172033',
    600: '#0B1F3A',
    700: '#09162E',
    800: '#071A33',
    900: '#051128',
  },
  primary: {
    50: '#EBF8FF',
    100: '#BDF2FF',
    200: '#9CD8FF',
    300: '#7DC6FF',
    400: '#5DB8FF',
    500: '#1677FF',
    600: '#136BFF',
    700: '#0F5DED',
    800: '#0C52CC',
    900: '#0A45BE',
  },
  secondary: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#98A2B3',
    500: '#6B7285',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#0F172A',
  },
  success: {
    50: '#DCFCE7',
    100: '#BBF7D0',
    200: '#86EFAC',
    300: '#4DEDC9',
    400: '#14B764',
    500: '#12B76A',
    600: '#0CA658',
    700: '#0A8F4F',
    800: '#0F6B3E',
    900: '#14532D',
  },
  warning: {
    50: '#FFFbEB',
    100: '#Fef3C7',
    200: '#Fde68a',
    300: '#Fcd34d',
    400: '#FBBF24',
    500: '#F79009',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },
  danger: {
    50: '#FEF2F2',
    100: '#FECACA',
    200: '#FDA4A4',
    300: '#FB9292',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },
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
  background: '#F5F7FA',
  surface: '#FFFFFF',
  border: '#E4E7EC',
  text: {
    primary: '#172033',
    secondary: '#667085',
    muted: '#98A2B3',
    inverse: '#FFFFFF',
    onNavy: '#FFFFFF',
    onLight: '#172033',
  },
  status: {
    draft: {
      bg: 'bg-navy-100',
      text: 'text-navy-800',
      border: 'border-navy-200',
    },
    disetujui: {
      bg: 'bg-success-100',
      text: 'text-success-800',
      border: 'border-success-200',
    },
    pending: {
      bg: 'bg-primary-100',
      text: 'text-primary-800',
      border: 'border-primary-200',
    },
    rejected: {
      bg: 'bg-danger-100',
      text: 'text-danger-800',
      border: 'border-danger-200',
    },
  },
};

// Spacing system - 8px base
export const spacing = {
  0: '0',
  1: '0.125rem',   // 2px
  2: '0.25rem',    // 4px
  3: '0.375rem',   // 6px
  4: '0.5rem',     // 8px
  5: '0.625rem',   // 10px
  6: '0.75rem',    // 12px
  8: '1rem',       // 16px
  10: '1.25rem',   // 20px
  12: '1.5rem',    // 24px
  16: '2rem',      // 32px
  20: '2.5rem',    // 40px
  24: '3rem',      // 48px
  32: '4rem',      // 64px
};

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  md: '0.25rem',     // 4px
  lg: '0.375rem',    // 6px
  xl: '0.5rem',      // 8px
  '2xl': '0.75rem',  // 12px
  full: '9999px',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
};

// Font sizes
export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
};

// Font weight
export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Transitions
export const transitions = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease',
};

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Z-index
export const zIndex = {
  dropdown: 50,
  modal: 60,
  popover: 70,
  tooltip: 80,
  toast: 90,
};