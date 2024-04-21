import { cn } from '../lib/util.ts';

export type mode = 'classic' | 'daily';

interface HeaderProps {
    mode: mode | null;
}

export default function Header({ mode }: HeaderProps) {
    return (
        <header className="grid place-content-center bg-slate-900 py-4">
            <div className="flex flex-row items-center justify-center gap-1">
                <h1
                    className={cn(
                        'text-3xl font-bold text-white',
                        mode ? 'visible' : 'invisible'
                    )}
                >
                    Simon+
                </h1>
                {mode && (mode === 'classic' ? <ClassicTag /> : <DailyTag />)}
            </div>
        </header>
    );
}

const ClassicTag = () => {
    return (
        <div className="rounded-full border-[1.5px] border-indigo-300 bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white">
            Classic
        </div>
    );
};

const DailyTag = () => {
    return (
        <div className="rounded-full border-[1.5px] border-amber-300 bg-amber-500 px-3 py-1.5 text-xs font-medium text-white">
            Daily
        </div>
    );
};
