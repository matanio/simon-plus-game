import { useState } from 'react';
import * as Tone from 'tone';
import { sleep } from '../../lib/util.ts';
import { useClassicGameState } from '../../game/game.ts';
import Game from '../Game.tsx';

interface ClassicGameProps {
    numberOfTiles: 4 | 6 | 8;
    onGameOver: () => void;
}

export default function ClassicGame({
    numberOfTiles,
    onGameOver,
}: ClassicGameProps) {
    const [isButtonsDisabled, setIsButtonsDisabled] = useState(true);
    const [sequenceClickCount, setSequenceClickCount] = useState(0);
    const [generatedSequence, setGeneratedSequence] = useState<number[]>([]);

    const {
        resetScore,
        score,
        playNote,
        flashTile,
        delay,
        resetTile,
        incrementScore,
    } = useClassicGameState();

    const startGameLogic = () => {
        Tone.start();
        resetScore();
        playSequence();
    };

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

    const flashCorrectTile = async () => {
        const NUMBER_OF_FLASHES = 3;
        for (let i = 0; i < NUMBER_OF_FLASHES; i++) {
            flashTile(generatedSequence[sequenceClickCount]);
            await sleep(250);
            resetTile(generatedSequence[sequenceClickCount]);
            await sleep(250);
        }
    };

    const handleIncorrectTileClick = async () => {
        setGeneratedSequence([]);
        setIsButtonsDisabled(true);
        await flashCorrectTile();
        onGameOver();
    };

    const handleCorrectRound = () => {
        incrementScore();
        playSequence();
    };

    return (
        <Game
            gameHeader={<ClassicGameHeader />}
            numberOfTiles={numberOfTiles}
            onIncorrectTileClick={handleIncorrectTileClick}
            onCorrectRound={handleCorrectRound}
            sequence={generatedSequence}
            score={score}
            isButtonsDisabled={isButtonsDisabled}
            setIsButtonsDisabled={setIsButtonsDisabled}
            playSequence={playSequence}
            startGameLogic={startGameLogic}
            sequenceClickCount={sequenceClickCount}
            setSequenceClickCount={setSequenceClickCount}
        />
    );
}

export function ClassicGameHeader() {
    const { score, highScore, isSoundOn, toggleSound } = useClassicGameState();

    return (
        <div className="grid w-full grid-cols-3 text-xl text-white">
            <button className="justify-self-start" onClick={toggleSound}>
                {isSoundOn ? '🔊' : '🔇'}
            </button>
            <div className="justify-self-center">Score: {score}</div>
            <div className="justify-self-end">Highscore: {highScore}</div>
        </div>
    );
}
