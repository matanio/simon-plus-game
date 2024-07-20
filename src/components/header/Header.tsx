import { AnimatePresence, motion } from 'framer-motion';
import { cn, useOutsideClick } from '../../lib/util.ts';
import { fadeIn } from '../../lib/animations.ts';
import Container from '../Container.tsx';
import { useGeneralGameState } from '../../game/game.ts';
import { useRef, useState } from 'react';
import { ChevronDown } from '../Icons.tsx';
import Settings from './Settings.tsx';
import { ClassicTag, DailyTag } from '../Tags.tsx';

export default function Header() {
    const { mode, setModeToNull } = useGeneralGameState();

    const [showSettings, setShowSettings] = useState(false);

    const settingsRef = useRef<HTMLDivElement | null>(null);

    useOutsideClick(settingsRef, () => {
        toggleSettings();
    });

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const goHome = () => {
        setModeToNull();
    };
    return (
        <AnimatePresence>
            <header
                className={cn('z-30 bg-slate-900', !mode && 'py-[2.125rem]')}
            >
                {mode && (
                    <Container>
                        <div className="relative">
                            <AnimatePresence>
                                {showSettings && (
                                    <div
                                        ref={settingsRef}
                                        className="absolute inset-0 -mx-4"
                                    >
                                        <Settings
                                            onCloseClick={toggleSettings}
                                        />
                                    </div>
                                )}
                            </AnimatePresence>
                            <motion.div
                                variants={fadeIn}
                                initial="hidden"
                                animate="visible"
                                className="grid w-full grid-cols-3 items-center py-4    "
                            >
                                <button
                                    onClick={goHome}
                                    className="group flex flex-row gap-1 justify-self-start text-white"
                                >
                                    <span className="self-start text-sm ">
                                        🏠
                                    </span>
                                    <span className="invisible mt-[0.0625rem] text-sm uppercase group-hover:visible">
                                        HOME
                                    </span>
                                </button>
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
                                {!showSettings && (
                                    <button
                                        onClick={toggleSettings}
                                        className="group col-start-3 flex flex-row gap-1 justify-self-end text-white"
                                    >
                                        <span className="invisible mt-[0.0625rem] text-sm uppercase group-hover:visible">
                                            Settings
                                        </span>
                                        <span className="self-start text-sm ">
                                            <ChevronDown />
                                        </span>
                                    </button>
                                )}
                            </motion.div>
                        </div>
                    </Container>
                )}
            </header>
        </AnimatePresence>
    );
}
