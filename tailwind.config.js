/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                jersey: ["'Jersey 25'", 'sans-serif'],
            },
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
