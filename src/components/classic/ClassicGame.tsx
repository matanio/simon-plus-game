import { cn, sleep } from '../../lib/util.ts';
import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { AnimatePresence, motion } from 'framer-motion';
import {
    buildTiles,
    colors,
    flashColors,
    useClassicGameState,
    useTile,
} from '../../game/game.ts';

interface ClassicGameProps {
    numberOfTiles: 4 | 6 | 8;
    onGameOver: () => void;
}

export default function ClassicGame({
    numberOfTiles,
    onGameOver,
}: ClassicGameProps) {
    const {
        highScore,
        isSoundOn,
        toggleSound,
        score,
        resetScore,
        incrementScore,
        isPlaying,
        playNote,
        delay,
    } = useClassicGameState();

    // Local state
    const [generatedSequence, setGeneratedSequence] = useState<number[]>([]);
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
        resetScore();
        playSequence();
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

    const playSequence = async () => {
        setIsButtonsDisabled(true);
        const randChoice = Math.floor(Math.random() * numberOfTiles) + 1;
        const newSequence = [...generatedSequence, randChoice];
        setGeneratedSequence(newSequence);
        for (let i = 0; i < newSequence.length; i++) {
            const DIVIDER = 10; // Increase for more gradual increase
            await sleep(delay * Math.exp(-score / DIVIDER));
            playNote(newSequence[i]);
            flashTile(newSequence[i]);
            await sleep(delay * Math.exp(-score / DIVIDER));
            resetTile(newSequence[i]);
        }
        setIsButtonsDisabled(false);
        setSequenceClickCount(0);
    };

    const onTileClick = async (tile: number) => {
        if (isButtonsDisabled) return;
        setIsButtonsDisabled(true);
        playNote(tile);
        const isCorrectTile = tile === generatedSequence[sequenceClickCount];
        if (isCorrectTile) {
            const isLastTile =
                sequenceClickCount === generatedSequence.length - 1;
            if (isLastTile) {
                // do it again
                setCorrectAttempt(true);
                await sleep(600);
                incrementScore();
                setCorrectAttempt(false);
                playSequence();
            } else {
                setSequenceClickCount(prev => prev + 1);
                setIsButtonsDisabled(false);
            }
        } else {
            setGeneratedSequence([]);
            setIsButtonsDisabled(true);
            await flashCorrectTile();
            onGameOver();
        }
    };

    const flashCorrectTile = async () => {
        const NUMBER_OF_FLASHES = 3;
        for (let i = 0; i < NUMBER_OF_FLASHES; i++) {
            flashTile(generatedSequence[sequenceClickCount]);
            await sleep(250);
            resetTile(generatedSequence[sequenceClickCount]);
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
                <div className="justify-self-end">Highscore: {highScore}</div>
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
