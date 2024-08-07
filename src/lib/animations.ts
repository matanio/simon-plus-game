import { Variants } from 'framer-motion';

export const startScreenGridContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.4,
            staggerChildren: 0.1,
        },
    },
};

export const startScreenSquare: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

export const startScreenOverlayFade: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { delay: 1.3, duration: 0.3 },
    },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.4,
        },
    },
};

export const slideDown: Variants = {
    hidden: {
        y: -50,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: 'easeIn',
        },
    },
};
