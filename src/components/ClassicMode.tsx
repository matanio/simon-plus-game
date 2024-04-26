import { motion } from 'framer-motion';
import Game from './Game.tsx';
import { useState } from 'react';
import InstructionsModal from './InstructionsModal.tsx';

export default function ClassicMode() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const startGame = () => {
        setIsPlaying(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative grid size-full items-center px-4 pb-12 pt-4"
        >
            <Game
                isPlaying={isPlaying}
                numberOfTiles={4}
                setIsPlaying={setIsPlaying}
            />
            {!isPlaying && (
                <div className="absolute flex size-full items-start justify-center bg-slate-900/90 px-4 pt-8 ">
                    <InstructionsModal onStartClick={startGame} />
                </div>
            )}
        </motion.div>
    );
}
