import { useDailyGameState } from '../../game/game.ts';
import { useState } from 'react';
import CountdownTimer from '../CountdownTimer.tsx';

export default function DailyGameOverModal() {
    const { score, getFormattedResults } = useDailyGameState();
    const [shareButtonText, setShareButtonText] =
        useState<string>('Share Results');

    const copyResultsToClipboard = () => {
        const results = getFormattedResults();
        navigator.clipboard.writeText(results).then(() => {
            setShareButtonText('Copied!');
            setTimeout(() => {
                setShareButtonText('Share Results');
            }, 2000);
        });
    };

    return (
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-xl border-2 border-red-600 bg-red-200/[0.99] p-4 text-red-600 shadow-xl">
            <h1 className="text-3xl font-extrabold uppercase ">Daily Over</h1>
            <h2 className="text-2xl text-red-400">SCORE: {score}</h2>
            <button
                onClick={copyResultsToClipboard}
                className="rounded-full border-4 border-slate-500 bg-slate-800 px-4 py-2 text-xl text-white shadow transition-colors hover:bg-slate-400 hover:text-slate-200"
            >
                {shareButtonText}
            </button>
            <hr className="mt-2 h-1 w-1/2 border-2 border-red-400" />
            <div className="flex flex-col items-center gap-1">
                <span className="text-slate-900">NEXT SEQUENCE IN</span>
                <CountdownTimer />
            </div>
        </div>
    );
}
