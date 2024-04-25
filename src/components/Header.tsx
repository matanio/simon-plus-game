import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/util.ts';
import { fadeInUpwards } from '../lib/animations.ts';

export type mode = 'classic' | 'daily';

interface HeaderProps {
    mode: mode | null;
}

export default function Header({ mode }: HeaderProps) {
    return (
        <AnimatePresence>
            <header
                className={cn(
                    'z-20 grid place-content-center bg-slate-900 py-4',
                    !mode && 'py-[2.125rem]'
                )}
            >
                {mode && (
                    <motion.div
                        variants={fadeInUpwards}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-row items-center justify-center gap-1"
                    >
                        <h1 className="text-3xl font-bold text-white">
                            Simon+
                        </h1>
                        {mode === 'classic' ? <ClassicTag /> : <DailyTag />}
                    </motion.div>
                )}
            </header>
        </AnimatePresence>
    );
}

export const ClassicTag = () => {
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
