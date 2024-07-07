import { MouseEventHandler } from 'react';
import { useClassicGameState } from '../game/game.ts';

interface GameOverModalProps {
    onPlayAgainClick: MouseEventHandler<HTMLButtonElement>;
}

export default function GameOverModal({
    onPlayAgainClick,
}: GameOverModalProps) {
    const { score, highScore } = useClassicGameState();

    return (
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-xl border-2 border-red-600 bg-red-200/[0.99] p-4 text-red-600 shadow">
            <h1 className="text-3xl font-extrabold uppercase ">Game Over 😭</h1>
            <div className="text-left">
                <h2 className="text-2xl text-red-400">SCORE: {score}</h2>
                <h2 className="text-2xl">HIGH SCORE: {highScore}</h2>
            </div>
            <hr className="mt-2 h-1 w-1/2 border-2 border-red-400" />
            <button
                onClick={onPlayAgainClick}
                className="rounded-full border-4 border-red-100 bg-red-500 px-4 py-2 text-2xl text-white shadow transition-colors hover:bg-red-400 hover:text-red-200"
            >
                PLAY AGAIN
            </button>
        </div>
    );
}
