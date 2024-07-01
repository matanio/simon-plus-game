import { AnimatePresence, motion } from 'framer-motion';
import Game from './Game.tsx';
import { useState } from 'react';
import InstructionsModal from './InstructionsModal.tsx';
import Container from './Container.tsx';
import GameOverModal from './GameOverModal.tsx';

export default function ClassicMode() {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [showInstructions, setShowInstructions] = useState<boolean>(true);

    const startGame = () => {
        setIsPlaying(true);
        setShowInstructions(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative grid size-full px-4 pb-12 pt-4"
        >
            <Container>
                <Game
                    isPlaying={isPlaying}
                    numberOfTiles={4}
                    setIsPlaying={setIsPlaying}
                />
            </Container>
            <AnimatePresence>
                {!isPlaying && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute z-50 flex size-full items-start justify-center bg-slate-900/90 px-4 pt-8"
                    >
                        {showInstructions && (
                            <InstructionsModal onStartClick={startGame} />
                        )}
                        {!showInstructions && (
                            <GameOverModal onPlayAgainClick={startGame} />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
