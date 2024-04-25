import { motion } from 'framer-motion';
import Game from './Game.tsx';
import { useState } from 'react';
import InstructionsModal from './InstructionsModal.tsx';

export default function ClassicMode() {
    const [isStarted, setIsStarted] = useState<boolean>(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative grid size-full items-start p-4"
        >
            <div className="col-start-1 row-start-1 row-end-1">
                <Game
                    isPlaying={isStarted}
                    isSoundOn={true}
                    numberOfTiles={4}
                />
            </div>
            {!isStarted && (
                <div className="col-start-1 row-start-1 row-end-1 flex size-full items-start justify-center bg-slate-900/90 sm:items-center">
                    <InstructionsModal
                        onStartClick={() => setIsStarted(true)}
                    />
                </div>
            )}
        </motion.div>
    );
}
