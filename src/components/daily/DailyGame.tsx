import { cn, sleep } from '../../lib/util.ts';
import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { AnimatePresence, motion } from 'framer-motion';
import {
    buildTiles,
    colors,
    flashColors,
    useDailyGameState,
    useTile,
} from '../../game/game.ts';
import { DEFAULT_MISTAKES_REMAINING } from '../../contexts/DailyGameContextProvider.tsx';

interface DailyGameProps {
    numberOfTiles: 4 | 6 | 8;
    onGameOver: () => void;
}

export default function DailyGame({
    numberOfTiles,
    onGameOver,
}: DailyGameProps) {
    const {
        isSoundOn,
        toggleSound,
        score,
        incrementScore,
        isPlaying,
        playNote,
        delay,
        decrementMistakesRemaining,
        mistakesRemaining,
        sequence,
    } = useDailyGameState();

    // Local state
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(true);
    const [sequenceClickCount, setSequenceClickCount] = useState(0);
    const [correctAttempt, setCorrectAttempt] = useState(false);

    const { tileColors, activeTile, flashTile, resetTile } = useTile(
        colors,
        flashColors
    );

    // Start Game Logic
    const startGame = () => {
        Tone.start();
        playDailySequence(score);
    };

    useEffect(() => {
        const startGameLogic = async () => {
            if (mistakesRemaining === 0) onGameOver();
            if (isPlaying) {
                await sleep(250); // Sleep to wait for modal animations to finish
                startGame();
            }
        };

        startGameLogic();
    }, [isPlaying]);

    const playDailySequence = async (newSequenceIndex: number) => {
        setIsButtonsDisabled(true);
        for (let i = 0; i <= newSequenceIndex; i++) {
            const DIVIDER = 10; // Increase for more gradual increase
            await sleep(delay * Math.exp(-score / DIVIDER));
            playNote(sequence[i]);
            flashTile(sequence[i]);
            await sleep(delay * Math.exp(-score / DIVIDER));
            resetTile(sequence[i]);
        }
        setIsButtonsDisabled(false);
        setSequenceClickCount(0);
    };

    const onTileClick = async (tile: number) => {
        if (isButtonsDisabled) return;
        setIsButtonsDisabled(true);
        playNote(tile);
        const isCorrectTile = tile === sequence[sequenceClickCount];
        if (isCorrectTile) {
            const isLastTile = sequenceClickCount === score;
            if (isLastTile) {
                // do it again
                setCorrectAttempt(true);
                await sleep(600);
                const newScore = score + 1;
                incrementScore();
                setCorrectAttempt(false);
                playDailySequence(newScore);
            } else {
                setSequenceClickCount(prev => prev + 1);
                setIsButtonsDisabled(false);
            }
        } else {
            if (mistakesRemaining > 1) {
                // If we have mistakes left, just flash the correct tile and continue
                decrementMistakesRemaining();
                setCorrectAttempt(false);
                await flashCorrectTile();
                setIsButtonsDisabled(false);
            } else {
                // Otherwise, game over
                decrementMistakesRemaining();
                setCorrectAttempt(false);
                await flashCorrectTile();
                onGameOver();
            }
        }
    };

    const flashCorrectTile = async () => {
        const NUMBER_OF_FLASHES = 3;
        for (let i = 0; i < NUMBER_OF_FLASHES; i++) {
            flashTile(sequence[sequenceClickCount]);
            await sleep(250);
            resetTile(sequence[sequenceClickCount]);
            await sleep(250);
        }
    };

    return (
        <div className="relative flex aspect-square w-full flex-col items-center gap-4">
            <div className="grid w-full grid-cols-3 text-xl text-white">
                <button className="justify-self-start" onClick={toggleSound}>
                    {isSoundOn ? '🔊' : '🔇'}
                </button>
                <div className="justify-self-center">Score: {score}</div>
                <div className="grid grid-cols-2 gap-2 justify-self-end">
                    <div>Lives</div>
                    <div>
                        {Array.from({ length: DEFAULT_MISTAKES_REMAINING }).map(
                            (_, index) =>
                                index < mistakesRemaining ? '❤️' : '💀'
                        )}
                    </div>
                </div>
            </div>
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
                        onClick={() => onTileClick(tile)}
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
