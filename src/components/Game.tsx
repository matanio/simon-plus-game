import { cn } from '../lib/util.ts';
import { useState } from 'react';

interface GameProps {
    isSoundOn: boolean;
    numberOfTiles: 4 | 6 | 8;
    isPlaying: true;
}

export default function Game({
    isSoundOn,
    numberOfTiles,
    isPlaying,
}: GameProps) {
    const [score, setScore] = useState(0);

    const [generatedSequence, setGeneratedSequence] = useState<number[]>([]);

    const [isButtonsDisabled, setIsButtonsDisabled] = useState(true);

    const [sequenceClickCount, setSequenceClickCount] = useState(0);

    const buildTiles = (numberOfTiles: number) => {
        return Array.from({ length: numberOfTiles }, (_, index) => index + 1);
    };

    const startGame = async () => {
        console.log('game started');
        setScore(0);
        await playSequence();
    };

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

    const [tileColors, setTileColors] = useState<string[]>(colors);

    const playSequence = async () => {
        setIsButtonsDisabled(true);
        const randChoice = Math.floor(Math.random() * numberOfTiles) + 1;
        const newSequence = [...generatedSequence, randChoice];
        setGeneratedSequence(newSequence);
        for (let i = 0; i < newSequence.length; i++) {
            await sleep(500);
            flashTile(newSequence[i]);
            await sleep(500);
            resetTile(newSequence[i]);
        }
        setIsButtonsDisabled(false);
        setSequenceClickCount(0);
    };

    const onTileClick = (tile: number) => {
        if (isButtonsDisabled) return;
        const isCorrectTile = tile === generatedSequence[sequenceClickCount];
        if (isCorrectTile) {
            const isLastTile =
                sequenceClickCount === generatedSequence.length - 1;
            if (isLastTile) {
                // do it again
                console.log('nice, one more...'); // TODO: make message
                setScore(prev => prev + 1);
                playSequence();
            } else {
                setSequenceClickCount(prev => prev + 1);
            }
        } else {
            console.log('Game Over');
            setScore(0);
            setGeneratedSequence([]);
            setIsButtonsDisabled(true);
        }
    };
    const sleep = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const flashTile = (tile: number) => {
        const newTileColors = [...tileColors];
        newTileColors[tile - 1] = flashColors[tile - 1];
        setTileColors(newTileColors);
    };

    const resetTile = (tile: number) => {
        const newTileColors = [...tileColors];
        newTileColors[tile - 1] = colors[tile - 1];
        setTileColors(newTileColors);
    };

    return (
        <>
            <button onClick={startGame}>Start</button>

            <div className="flex size-full flex-col items-center justify-center">
                <div className="aspect-square w-11/12 max-w-3xl sm:w-5/6">
                    <div className="grid size-full grid-cols-2 grid-rows-2 gap-4 p-4 sm:gap-8 sm:p-8">
                        {buildTiles(numberOfTiles).map((tile, index) => (
                            <button
                                onClick={() => onTileClick(tile)}
                                disabled={isButtonsDisabled}
                                key={tile}
                                className={cn(
                                    'w-full rounded-xl',
                                    `${tileColors[index]}`,
                                    'shadow-lg'
                                )}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}