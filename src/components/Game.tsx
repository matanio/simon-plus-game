import { useGeneralGameState } from '../game/game.ts';
import { cn, sleep } from '../lib/util.ts';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface GameProps {
    gameHeader: ReactNode;
    numberOfTiles: 4 | 6 | 8;
    onIncorrectTileClick: () => void;
    onCorrectRound: () => void;
    sequence: number[];
    score: number;
    isButtonsDisabled: boolean;
    setIsButtonsDisabled: (isDisabled: boolean) => void;
    playSequence: (newSequenceIndex: number) => void;
    startGameLogic: () => void;
    sequenceClickCount: number;
    setSequenceClickCount: (sequenceClickCount: number) => void;
}

export default function Game({
    gameHeader,
    numberOfTiles,
    onIncorrectTileClick,
    onCorrectRound,
    sequence,
    score,
    isButtonsDisabled,
    setIsButtonsDisabled,
    startGameLogic,
    sequenceClickCount,
    setSequenceClickCount,
}: GameProps) {
    const [correctAttempt, setCorrectAttempt] = useState(false);

    const { playNote, isPlaying, activeTile, tileColors, flashColors } =
        useGeneralGameState();

    // Game starts when isPlaying is true
    useEffect(() => {
        const startGame = async () => {
            if (isPlaying) {
                await sleep(250); // Sleep to wait for modal animations to finish
                startGameLogic();
            }
        };
        startGame();
    }, [isPlaying]);

    const handleTileClick = async (tile: number) => {
        if (isButtonsDisabled) return;
        setIsButtonsDisabled(true);
        playNote(tile);
        const isCorrectTile = tile === sequence[sequenceClickCount];
        if (isCorrectTile) {
            const isLastTile = sequenceClickCount === score;
            if (isLastTile) {
                setCorrectAttempt(true);
                await sleep(600);
                setCorrectAttempt(false);
                onCorrectRound();
            } else {
                setSequenceClickCount(sequenceClickCount + 1);
                setIsButtonsDisabled(false);
            }
        } else {
            onIncorrectTileClick();
        }
    };

    return (
        <div className="relative flex aspect-square w-full flex-col items-center gap-4">
            {gameHeader}
            <div
                className={cn(
                    'relative mt-4 grid size-full gap-4 sm:gap-8 grid-cols-2',
                    numberOfTiles === 4 && 'grid-rows-2',
                    numberOfTiles === 6 && 'grid-rows-3',
                    numberOfTiles === 8 && 'grid-rows-4'
                )}
            >
                {buildTiles(numberOfTiles).map((tile, index) => (
                    <button
                        onClick={() => handleTileClick(tile)}
                        disabled={isButtonsDisabled}
                        key={tile}
                        className={cn(
                            ` active:${flashColors[index]}`,
                            'w-full rounded-xl hover:brightness-125 disabled:hover:filter-none shadow-push-button focus:outline-none active:translate-y-1 active:pb-2 active:shadow-push-button-active',
                            isButtonsDisabled &&
                                'cursor-not-allowed pointer-events-none',
                            `${tileColors[index]}`,
                            tile === activeTile &&
                                flashColors[index] +
                                    ' shadow-push-button-active translate-y-1 pb-2'
                        )}
                    ></button>
                ))}
                <AnimatePresence>
                    {correctAttempt && (
                        <motion.div
                            animate={{ opacity: 1 }}
                            initial={{ opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-10 size-full animate-radial-outwards bg-blue-radial-gradient bg-top text-2xl text-white"
                        ></motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const buildTiles = (numberOfTiles: number) => {
    return Array.from({ length: numberOfTiles }, (_, index) => index + 1);
};
