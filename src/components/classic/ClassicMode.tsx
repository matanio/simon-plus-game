import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Container from '../Container.tsx';
import ClassicGameOverModal from './ClassicGameOverModal.tsx';
import { ClassicGameStateContextProvider } from '../../contexts/ClassicGameContextProvider.tsx';
import { useGeneralGameState } from '../../game/game.ts';
import { ClassicInstructionsModal } from '../InstructionsModals.tsx';
import ClassicGame from './ClassicGame.tsx';

export default function ClassicMode() {
    const [showInstructions, setShowInstructions] = useState<boolean>(true);
    const [showGameOver, setShowGameOver] = useState<boolean>(false);

    const { isPlaying, setIsPlaying } = useGeneralGameState();

    const startGame = () => {
        setIsPlaying(true);
        setShowInstructions(false);
        setShowGameOver(false);
    };

    const handleGameOver = () => {
        setIsPlaying(false);
        setShowGameOver(true);
        setShowInstructions(false);
    };

    return (
        <ClassicGameStateContextProvider>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative grid size-full px-4 pb-12 pt-4"
            >
                <Container>
                    <ClassicGame
                        onGameOver={handleGameOver}
                        numberOfTiles={4}
                    />
                </Container>
                <AnimatePresence>
                    {!isPlaying && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute z-20 flex size-full items-start justify-center bg-slate-900/90 px-4 pt-8"
                        >
                            {showInstructions && (
                                <ClassicInstructionsModal
                                    onStartClick={startGame}
                                />
                            )}
                            {showGameOver && (
                                <ClassicGameOverModal
                                    onPlayAgainClick={startGame}
                                />
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </ClassicGameStateContextProvider>
    );
}
