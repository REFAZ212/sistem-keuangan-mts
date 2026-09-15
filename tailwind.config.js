import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
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
                    50: '#FFFBEB',
                    100: '#FEF3C7',
                    200: '#FDE68A',
                    300: '#FCD34D',
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
            },
        },
    },

    plugins: [forms],
};
