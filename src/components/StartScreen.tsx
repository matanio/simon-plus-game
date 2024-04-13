import { motion } from 'framer-motion';
import {
    startScreenGridContainer,
    startScreenOverlayFade,
    startScreenSquare,
} from '../lib/animations.ts';

const StartScreen = () => {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center bg-white">
            <div className="aspect-square w-11/12 max-w-3xl sm:w-5/6">
                <motion.div
                    variants={startScreenGridContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid h-full w-full grid-cols-2 grid-rows-2 gap-4 p-4 sm:gap-8 sm:p-8"
                >
                    <motion.div
                        className="w-full rounded-xl bg-green-500/65 shadow-lg"
                        variants={startScreenSquare}
                    ></motion.div>
                    <motion.div
                        className="w-full rounded-xl bg-red-600/65 shadow-lg"
                        variants={startScreenSquare}
                    ></motion.div>
                    <motion.div
                        className="w-full rounded-xl bg-yellow-400/65 shadow-lg"
                        variants={startScreenSquare}
                    ></motion.div>
                    <motion.div
                        className="w-full rounded-xl bg-blue-700/65 shadow-lg"
                        variants={startScreenSquare}
                    ></motion.div>
                </motion.div>
            </div>
            <motion.div
                variants={startScreenOverlayFade}
                initial="hidden"
                animate="visible"
                className="absolute flex h-full w-full flex-col items-center justify-center bg-white/80  "
            >
                <div>Hi</div>
            </motion.div>
        </div>
    );
};

export default StartScreen;
