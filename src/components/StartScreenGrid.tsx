import { motion } from 'framer-motion';
import {
    startScreenGridContainer,
    startScreenSquare,
} from '../lib/animations.ts';

export default function StartScreenGrid() {
    return (
        <div className="aspect-square w-11/12 max-w-3xl sm:w-5/6">
            <motion.div
                variants={startScreenGridContainer}
                initial="hidden"
                animate="visible"
                className="grid size-full grid-cols-2 grid-rows-2 gap-4 p-4 sm:gap-8 sm:p-8"
            >
                <motion.div
                    className="w-full rounded-xl bg-green-500/55 shadow-push-button"
                    variants={startScreenSquare}
                ></motion.div>
                <motion.div
                    className="w-full rounded-xl bg-red-600/55 shadow-push-button"
                    variants={startScreenSquare}
                ></motion.div>
                <motion.div
                    className="w-full rounded-xl bg-yellow-400/55 shadow-push-button"
                    variants={startScreenSquare}
                ></motion.div>
                <motion.div
                    className="w-full rounded-xl bg-blue-700/55 shadow-push-button"
                    variants={startScreenSquare}
                ></motion.div>
            </motion.div>
        </div>
    );
}
