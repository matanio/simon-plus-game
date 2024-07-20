import { useDailyGameState } from '../../game/game.ts';
import { DEFAULT_MISTAKES_REMAINING } from '../../contexts/DailyGameContextProvider.tsx';
import Game from '../Game.tsx';
import { useState } from 'react';
import { sleep } from '../../lib/util.ts';
import * as Tone from 'tone';

interface DailyGameProps {
    numberOfTiles: 4 | 6 | 8;
    onGameOver: () => void;
}

const DIVIDER = 10; // Increase for more gradual speed increase of notes being played in a sequence
const NUMBER_OF_FLASHES_FOR_CORRECT_TILE = 3;

export default function DailyGame({
    numberOfTiles,
    onGameOver,
}: DailyGameProps) {
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(true);
    const [sequenceClickCount, setSequenceClickCount] = useState(0);

    const {
        score,
        mistakesRemaining,
        decrementMistakesRemaining,
        delay,
        playNote,
        flashTile,
        resetTile,
        sequence,
        incrementScore,
    } = useDailyGameState();

    const startGameLogic = () => {
        if (mistakesRemaining === 0) {
            onGameOver();
            return;
        }
        Tone.start();
        playDailySequence(score); // Score is 0 when day hasn't been played yet
    };

    const flashCorrectTile = async () => {
        for (let i = 0; i < NUMBER_OF_FLASHES_FOR_CORRECT_TILE; i++) {
            flashTile(sequence[sequenceClickCount]);
            await sleep(250);
            resetTile(sequence[sequenceClickCount]);
            await sleep(250);
        }
    };

    const handleIncorrectTileClick = async () => {
        if (mistakesRemaining > 1) {
            // If we have mistakes left, just flash the correct tile and continue
            decrementMistakesRemaining();
            await flashCorrectTile();
            setIsButtonsDisabled(false);
        } else {
            // Otherwise, game over
            decrementMistakesRemaining();
            await flashCorrectTile();
            onGameOver();
        }
    };

    const playDailySequence = async (newSequenceIndex: number) => {
        setIsButtonsDisabled(true);
        for (let i = 0; i <= newSequenceIndex; i++) {
            await sleep(delay * Math.exp(-score / DIVIDER));
            playNote(sequence[i]);
            flashTile(sequence[i]);
            await sleep(delay * Math.exp(-score / DIVIDER));
            resetTile(sequence[i]);
        }
        setIsButtonsDisabled(false);
        setSequenceClickCount(0);
    };

    const handleCorrectRound = () => {
        incrementScore();
        playDailySequence(score + 1);
    };

    return (
        <Game
            gameHeader={<DailyGameHeader />}
            numberOfTiles={numberOfTiles}
            onIncorrectTileClick={handleIncorrectTileClick}
            onCorrectRound={handleCorrectRound}
            sequence={sequence}
            score={score}
            isButtonsDisabled={isButtonsDisabled}
            setIsButtonsDisabled={setIsButtonsDisabled}
            playSequence={playDailySequence}
            startGameLogic={startGameLogic}
            sequenceClickCount={sequenceClickCount}
            setSequenceClickCount={setSequenceClickCount}
        />
    );
}

export function DailyGameHeader() {
    const { score, mistakesRemaining, isSoundOn, toggleSound } =
        useDailyGameState();
    return (
        <div className="grid w-full grid-cols-3 text-xl text-white">
            <button className="justify-self-start" onClick={toggleSound}>
                {isSoundOn ? '🔊' : '🔇'}
            </button>
            <div className="justify-self-center">Score: {score}</div>
            <div className="grid grid-cols-2 gap-2 justify-self-end">
                <div>Lives</div>
                <div>
                    {Array.from({ length: DEFAULT_MISTAKES_REMAINING }).map(
                        (_, index) => (index < mistakesRemaining ? '❤️' : '💀')
                    )}
                </div>
            </div>
        </div>
    );
}
