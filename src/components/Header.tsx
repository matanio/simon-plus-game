import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/util.ts';
import { fadeIn } from '../lib/animations.ts';
import Container from './Container.tsx';
import { useGeneralGameState } from '../game/game.ts';

export default function Header() {
    const { mode } = useGeneralGameState();

    return (
        <AnimatePresence>
            <header
                className={cn(
                    'z-20 bg-slate-900 py-4',
                    !mode && 'py-[2.125rem]'
                )}
            >
                {mode && (
                    <Container>
                        <motion.div
                            variants={fadeIn}
                            initial="hidden"
                            animate="visible"
                            className="grid w-full grid-cols-3 items-center"
                        >
                            <div className="col-start-2 flex flex-row items-center justify-center gap-1">
                                <h1 className="text-3xl font-bold text-white">
                                    Simon+
                                </h1>
                                {mode === 'classic' ? (
                                    <ClassicTag />
                                ) : (
                                    <DailyTag />
                                )}
                            </div>
                            <button className="col-start-3 flex flex-row gap-2 justify-self-end p-2 text-lg">
                                <span>⚙️</span>
                            </button>
                        </motion.div>
                    </Container>
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
