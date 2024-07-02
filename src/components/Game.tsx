import { cn, sleep } from '../lib/util.ts';
import { useEffect, useState } from 'react';
import * as Tone from 'tone';
import { AnimatePresence, motion } from 'framer-motion';
import { useClassicGameState } from '../game/game.ts';

interface GameProps {
    numberOfTiles: 4 | 6 | 8;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
}

const synth = new Tone.Synth().toDestination();

export default function Game({
    numberOfTiles,
    isPlaying,
    setIsPlaying,
}: GameProps) {
    const {
        highScore,
        isSoundOn,
        toggleSound,
        score,
        resetScore,
        incrementScore,
    } = useClassicGameState();
    const [generatedSequence, setGeneratedSequence] = useState<number[]>([]);

    const [isButtonsDisabled, setIsButtonsDisabled] = useState(true);

    const [sequenceClickCount, setSequenceClickCount] = useState(0);

    const [activeTile, setActiveTile] = useState<number | null>(null);

    const [correctAttempt, setCorrectAttempt] = useState(false);

    const buildTiles = (numberOfTiles: number) => {
        return Array.from({ length: numberOfTiles }, (_, index) => index + 1);
    };

    const startGame = () => {
        Tone.start();
        resetScore();
        playSequence();
    };

    useEffect(() => {
        if (isPlaying) {
            startGame();
        }
    }, [isPlaying]);

    const [tileColors, setTileColors] = useState<string[]>(colors);

    const playSequence = async () => {
        setIsButtonsDisabled(true);
        const randChoice = Math.floor(Math.random() * numberOfTiles) + 1;
        const newSequence = [...generatedSequence, randChoice];
        setGeneratedSequence(newSequence);
        for (let i = 0; i < newSequence.length; i++) {
            await sleep(500);
            playNote(newSequence[i]);
            flashTile(newSequence[i]);
            await sleep(500);
            resetTile(newSequence[i]);
        }
        setIsButtonsDisabled(false);
        setSequenceClickCount(0);
    };

    const onTileClick = async (tile: number) => {
        if (isButtonsDisabled) return;
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
            }
        } else {
            setGeneratedSequence([]);
            setIsButtonsDisabled(true);
            await flashCorrectTile();
            setIsPlaying(false);
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

    const playNote = (tile: number) => {
        // TODO: double check sound issue where muted while playing doesn't mute the sound
        const notes = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'];
        console.log(isSoundOn);
        if (isSoundOn) {
            synth.triggerAttackRelease(notes[tile - 1], '5n');
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
                            'w-full rounded-xl z-50 hover:brightness-125 disabled:hover:filter-none shadow-push-button focus:outline-none active:translate-y-1 active:pb-2 active:shadow-push-button-active',
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
