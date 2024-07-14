import Container from './Container.tsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useGeneralGameState } from '../game/game.ts';
import { MouseEventHandler, useState } from 'react';
import { formatDateAsMonthDayYear } from '../lib/util.ts';
import { Logo } from './Logo.tsx';
import { DailyInstructionsModal } from './InstructionsModals.tsx';

interface TitleScreenProps {
    onStartClick: MouseEventHandler;
}

function TitleScreen({ onStartClick }: TitleScreenProps) {
    return (
        <div className="flex size-full flex-col items-center justify-center text-white ">
            <Logo className="size-20" />
            <p className="mt-8 text-lg uppercase">
                {formatDateAsMonthDayYear(new Date())}
            </p>
            <h1 className="text-6xl font-bold">The Daily.</h1>
            <p className="mt-12 text-center text-xl">
                Normal ol' Simon; but you only get one shot.
            </p>
            <p className="mt-4 text-center">Oh — and three mistakes.</p>
            <button
                onClick={onStartClick}
                className="mt-12 rounded-md bg-white px-8 py-2 text-xl text-slate-900 hover:bg-slate-400 hover:text-slate-700"
            >
                Let's go
            </button>
        </div>
    );
}

export default function DailyMode() {
    const { isPlaying } = useGeneralGameState();

    const [showTitleScreen, setShowTitleScreen] = useState<boolean>(true);
    const [showInstructions, setShowInstructions] = useState<boolean>(true);

    function handleTitleStartClick() {
        setShowTitleScreen(false);
        setShowInstructions(true);
    }

    function startGame() {}

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative grid size-full px-4 pb-12 pt-4"
        >
            <Container>
                {showTitleScreen && (
                    <TitleScreen
                        onStartClick={() => setShowTitleScreen(false)}
                    />
                )}
                {/*{!showTitleScreen && (*/}
                {/*    // Game starts when isPlaying is true*/}
                {/*    <Game*/}
                {/*        onGameOver={handleGameOver}*/}
                {/*        numberOfTiles={4}*/}
                {/*        mode="daily"*/}
                {/*    />*/}
                {/*)}*/}
            </Container>
            <AnimatePresence>
                {!isPlaying && !showTitleScreen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute z-20 flex size-full items-start justify-center bg-slate-900/90 px-4 pt-8"
                    >
                        {showInstructions && (
                            <DailyInstructionsModal onStartClick={startGame} />
                        )}
                        {/*{showGameOver && (*/}
                        {/*    <GameOverModal onPlayAgainClick={startGame} />*/}
                        {/*)}*/}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
