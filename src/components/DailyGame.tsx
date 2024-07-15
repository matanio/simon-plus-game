import { cn, sleep } from '../lib/util.ts';
import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { AnimatePresence, motion } from 'framer-motion';
import { useDailyGameState } from '../game/game.ts';

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
        resetScore,
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
    const [activeTile, setActiveTile] = useState<number | null>(null);
    const [correctAttempt, setCorrectAttempt] = useState(false);
    const [tileColors, setTileColors] = useState<string[]>(colors);
    const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);

    // Start Game Logic
    const startGame = () => {
        Tone.start();
        resetScore();
        playDailySequence(0);
    };

    useEffect(() => {
        const startGameLogic = async () => {
            if (isPlaying) {
                await sleep(250); // Sleep to wait for modal animations to finish
                startGame();
            }
        };

        startGameLogic();
    }, [isPlaying]);

    const playDailySequence = async (newSequenceIndex: number) => {
        setIsButtonsDisabled(true);
        console.log(`SCORE: ${score}`);
        console.log(`SEQUENCE: ${sequence}`);
        for (let i = 0; i <= newSequenceIndex; i++) {
            console.log(`CURR: ${sequence[i]}`);
            // TODO: move to state?
            await sleep(delay);
            playNote(sequence[i]);
            flashTile(sequence[i]);
            await sleep(delay);
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
        console.log(isCorrectTile);
        if (isCorrectTile) {
            console.log(sequenceClickCount);
            console.log(score);
            const isLastTile = sequenceClickCount === score;
            console.log(isLastTile);
            if (isLastTile) {
                // do it again
                setCorrectAttempt(true);
                await sleep(600);
                incrementScore();
                setCurrentSequenceIndex(currentSequenceIndex + 1);
                setCorrectAttempt(false);
                playDailySequence(currentSequenceIndex + 1);
            } else {
                setSequenceClickCount(prev => prev + 1);
                setIsButtonsDisabled(false);
            }
        } else {
            console.log(mistakesRemaining);
            // First check if we have any mistakes remaining
            if (mistakesRemaining > 0) {
                // TODO: do something here
                decrementMistakesRemaining();
                setCorrectAttempt(false);
                await flashCorrectTile();
                setIsButtonsDisabled(false);
            } else {
                // Game over
                setCorrectAttempt(false);
                await flashCorrectTile();
                onGameOver();
            }
        }
    };

    const flashTile = (tile: number) => {
        const newTileColors = [...tileColors];
        newTileColors[tile - 1] = flashColors[tile - 1];
        setTileColors(newTileColors);
        setActiveTile(tile); // Set the active tile
    };

    const resetTile = (tile: number) => {
        const newTileColors = [...tileColors];
        newTileColors[tile - 1] = colors[tile - 1];
        setTileColors(newTileColors);
        setActiveTile(null); // Reset the active tile
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
                {/*<div className="justify-self-end">Highscore: {highScore}</div>*/}
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

const colors = [
    'bg-green-500/75',
    'bg-red-600/75',
    'bg-yellow-400/75',
    'bg-blue-700/75',
    'bg-purple-700/75',
    'bg-orange-600/75',
    'bg-gray-400/75',
    'bg-pink-900/75',
];

const flashColors = [
    'bg-green-300',
    'bg-red-300',
    'bg-yellow-100',
    'bg-blue-400',
    'bg-purple-400',
    'bg-orange-300',
    'bg-gray-100',
    'bg-pink-600',
];

const buildTiles = (numberOfTiles: number) => {
    return Array.from({ length: numberOfTiles }, (_, index) => index + 1);
};
