import { motion } from 'framer-motion';
import { startScreenOverlayFade } from '../lib/animations.ts';
import React from 'react';
import NewTag from './NewTag.tsx';
import StartScreenGrid from './StartScreenGrid.tsx';

interface StartScreenProps {
    onDailyClick: React.MouseEventHandler<HTMLButtonElement>;
    onClassicClick: React.MouseEventHandler<HTMLButtonElement>;
}

const StartScreen = ({ onDailyClick, onClassicClick }: StartScreenProps) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex size-full flex-col items-center justify-center"
        >
            <StartScreenGrid />
            <motion.div
                variants={startScreenOverlayFade}
                initial="hidden"
                animate="visible"
                className="absolute flex size-full flex-col items-center justify-center gap-4 bg-slate-900/95 px-4 text-center text-white"
            >
                <div className="text-5xl font-semibold">Simon+</div>
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
                </div>
            </motion.div>
        </motion.div>
    );
};

export default StartScreen;
