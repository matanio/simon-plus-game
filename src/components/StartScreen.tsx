import { motion } from 'framer-motion';
import {
    startScreenGridContainer,
    startScreenOverlayFade,
    startScreenSquare,
} from '../lib/animations.ts';
import React from 'react';
import NewTag from './NewTag.tsx';

interface StartScreenProps {
    onDailyClick: React.MouseEventHandler<HTMLButtonElement>;
    onClassicClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StartScreen = ({ onDailyClick, onClassicClick }: StartScreenProps) => {
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center bg-slate-900">
            <div className="aspect-square w-11/12 max-w-3xl sm:w-5/6">
                <motion.div
                    variants={startScreenGridContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid h-full w-full grid-cols-2 grid-rows-2 gap-4 p-4 sm:gap-8 sm:p-8"
                >
                    <motion.div
                        className="w-full rounded-xl bg-green-500/55  shadow-lg"
                        variants={startScreenSquare}
                    ></motion.div>
                    <motion.div
                        className="w-full rounded-xl bg-red-600/55 shadow-lg"
                        variants={startScreenSquare}
                    ></motion.div>
                    <motion.div
                        className="w-full rounded-xl bg-yellow-400/55 shadow-lg"
                        variants={startScreenSquare}
                    ></motion.div>
                    <motion.div
                        className="w-full rounded-xl bg-blue-700/55 shadow-lg"
                        variants={startScreenSquare}
                    ></motion.div>
                </motion.div>
            </div>
            <motion.div
                variants={startScreenOverlayFade}
                initial="hidden"
                animate="visible"
                className="absolute flex h-full w-full flex-col items-center justify-center gap-4 bg-slate-900/95 px-4 text-center text-white"
            >
                <div className="text-5xl font-bold">Simon+</div>
                <div className="text-2xl">
                    The original memory game — with a few extras.
                </div>
                <div className="mt-3 flex flex-col gap-3">
                    <div className="grid">
                        <div className="col-start-1 col-end-1 row-start-1 row-end-1 flex">
                            <button
                                onClick={onDailyClick}
                                className="grow rounded-full border-2 border-amber-300 bg-amber-500 px-4 py-2 text-lg font-semibold transition-colors hover:bg-amber-600"
                            >
                                Daily
                            </button>
                        </div>
                        <div className="pointer-events-none col-start-1 row-start-1 row-end-1 -mr-1.5 -mt-1.5 justify-self-end">
                            <NewTag />
                        </div>
                    </div>
                    <button
                        onClick={onClassicClick}
                        className="rounded-full border-2 border-indigo-300 bg-indigo-500 px-4 py-2 text-lg font-semibold transition-colors hover:bg-indigo-600"
                    >
                        Classic
                    </button>
                    <div></div>
                </div>
            </motion.div>
        </div>
    );
};

export default StartScreen;
