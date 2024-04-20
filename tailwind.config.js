/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            animation: {
                shimmer: 'shimmer 1.5s infinite linear',
            },
            keyframes: {
                shimmer: {
                    '0%': {
                        backgroundPositionX: '200%',
                    },
                    '100%': {
                        backgroundPositionX: '0%',
                    },
                },
            },
        },
    },
    plugins: [],
};
