import { MouseEventHandler } from 'react';

interface InstructionsModalProps {
    onStartClick: MouseEventHandler<HTMLButtonElement>;
}

export function ClassicInstructionsModal({
    onStartClick,
}: InstructionsModalProps) {
    return (
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-xl border-2 border-slate-600 bg-slate-800/[0.99] p-4 text-white shadow-xl">
            <h1 className="text-3xl font-extrabold">How To Play</h1>
            <h2 className="text-xl font-extralight">
                Test your memory by clicking the{' '}
                <span className="text-green-400">c</span>
                <span className="text-red-400">ol</span>
                <span className="text-yellow-400">or</span>
                <span className="text-blue-400">ed</span> squares.
            </h2>
            <ul className="ms-8 list-outside list-disc ">
                <li className="list-item">
                    When you click start, the colored squares will{' '}
                    <span className="animate-blink">flash</span> in a sequence.
                </li>
                <li className="list-item">
                    After the sequence, click the squares in the same order they
                    appeared.
                </li>
                <li className="list-item">
                    Each round, the length of the sequence increases by one.
                </li>
            </ul>
            <div className="mt-3 flex grow flex-col items-center gap-4">
                <div className="text-xl">Ready?</div>
                <button
                    onClick={onStartClick}
                    className="rounded-full border-4 border-sky-100 bg-blue-600 px-4 py-2 text-3xl text-white shadow transition-colors hover:bg-blue-500 hover:text-blue-200"
                >
                    START
                </button>
            </div>
        </div>
    );
}

export function DailyInstructionsModal({
    onStartClick,
}: InstructionsModalProps) {
    return (
        <div className="flex w-full max-w-lg flex-col items-center justify-center gap-4 rounded-xl border-2 border-slate-600 bg-slate-800/[0.99] p-4 text-white shadow-xl">
            <h1 className="text-3xl font-extrabold">The Daily — How To Play</h1>
            <h2 className="text-xl font-extralight">
                This is just like normal Simon; you're still testing your memory
                by clicking the <span className="text-green-400">c</span>
                <span className="text-red-400">ol</span>
                <span className="text-yellow-400">or</span>
                <span className="text-blue-400">ed</span> squares.
            </h2>
            <h2 className="self-start">The basics still apply:</h2>
            <ul className="ms-8 list-outside list-disc ">
                <li className="list-item">
                    When you click start, the colored squares will{' '}
                    <span className="animate-blink">flash</span> in a sequence.
                </li>
                <li className="list-item">
                    After the sequence, click the squares in the same order they
                    appeared.
                </li>
                <li className="list-item">
                    Each round, the length of the sequence increases by one.
                </li>
            </ul>
            <h2 className="self-start text-orange-200">
                But there's a few ✨NEW✨ key things to keep in mind:
            </h2>
            <ul className="ms-8 list-outside list-disc text-orange-200">
                <li className="list-item">
                    The sequence is different every day; but the{' '}
                    <span className="underline">same</span> for everyone around
                    the world.
                </li>
                <li className="list-item">
                    You get three mistakes before the game ends.
                </li>
                <li className="list-item">
                    If you make three mistakes; thats it — Game Over!
                </li>
            </ul>
            <div className="mt-3 flex grow flex-col items-center gap-4">
                <div className="text-xl">
                    Ready to give{' '}
                    <span className="text-amber-400">The Daily</span> a go?
                </div>
                <button
                    onClick={onStartClick}
                    className="rounded-full border-4 border-white bg-green-600 px-4 py-2 text-3xl text-green-50 shadow transition-colors hover:bg-green-500 hover:text-green-200"
                >
                    START
                </button>
            </div>
        </div>
    );
}
