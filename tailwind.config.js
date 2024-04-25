import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Jersey 25"', ...defaultTheme.fontFamily.sans],
                inter: ["'Inter'", 'sans-serif'],
            },
            animation: {
                shimmer: 'shimmer 1.5s infinite ease-out',
                blink: 'blink 1.8s infinite',
            },
            keyframes: {
                blink: {
                    '0%': {
                        opacity: 1,
                    },
                    '5%': {
                        opacity: 0,
                    },
                    '50%': {
                        opacity: 0,
                    },
                    '51%': {
                        opacity: 1,
                    },
                    '100%': {
                        opacity: 1,
                    },
                },
                shimmer: {
                    '0%': {
                        backgroundPositionX: '200%',
                    },
                    '100%': {
                        backgroundPositionX: '0%',
                    },
                },
            },
            backgroundImage: {
                shimmer:
                    'linear-gradient(-45deg, transparent 40%, rgba(255, 255, 255, 0.6) 50%, transparent 60%)',
            },
            backgroundSize: {
                200: '200%',
            },
        },
    },
    plugins: [],
};
