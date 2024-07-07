import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../lib/util.ts';
import { fadeIn, slideDown } from '../lib/animations.ts';
import Container from './Container.tsx';
import { Speed, useGeneralGameState } from '../game/game.ts';
import { MouseEventHandler, useState } from 'react';
import { InstrumentButton } from './InstrumentButton.tsx';
import { SpeedButton } from './SpeedButton.tsx';

interface SettingsProps {
    onCloseClick: MouseEventHandler;
}

function ChevronDown(props: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={cn('size-5', props.className)}
        >
            <path
                fillRule="evenodd"
                d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

function ChevronUp(props: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={cn('size-5', props.className)}
        >
            <path
                fillRule="evenodd"
                d="M9.47 6.47a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 1 1-1.06 1.06L10 8.06l-3.72 3.72a.75.75 0 0 1-1.06-1.06l4.25-4.25Z"
                clipRule="evenodd"
            />
        </svg>
    );
}

type Instrument = 'synthesizer' | 'trumpet' | 'guitar';

function Settings({ onCloseClick }: SettingsProps) {
    const { instrument, setInstrument, speed, setSpeed } =
        useGeneralGameState();

    const handleInstrumentClick = (instrument: Instrument) => {
        console.log(instrument);
        setInstrument(instrument);
    };

    const handleSpeedClick = (speed: Speed) => {
        setSpeed(speed);
    };

    return (
        <motion.div
            variants={slideDown}
            animate="visible"
            initial="hidden"
            exit="hidden"
            className="grid grid-cols-4 justify-items-center rounded-xl rounded-t-none bg-slate-600 p-4 text-xs uppercase text-white"
        >
            <div className="flex flex-col gap-1">
                <div className="text-center text-lg"> Instrument 🎶</div>
                <div className="grid grid-cols-3 gap-2 text-lg">
                    <InstrumentButton
                        isActive={instrument === 'synthesizer'}
                        onClick={() => handleInstrumentClick('synthesizer')}
                    >
                        🎹
                    </InstrumentButton>
                    <InstrumentButton
                        isActive={instrument === 'trumpet'}
                        onClick={() => handleInstrumentClick('trumpet')}
                    >
                        🎺
                    </InstrumentButton>
                    <InstrumentButton
                        isActive={instrument === 'guitar'}
                        onClick={() => handleInstrumentClick('guitar')}
                    >
                        🎸
                    </InstrumentButton>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="text-center text-lg"> Speed ⚡️</div>
                <div className="grid grid-cols-3 gap-2 text-lg">
                    <SpeedButton
                        speed="Normal"
                        onClick={handleSpeedClick}
                        isActive={speed === 'Normal'}
                    />
                    <SpeedButton
                        speed="Fast"
                        onClick={handleSpeedClick}
                        isActive={speed === 'Fast'}
                    />
                    <SpeedButton
                        speed="Fastest"
                        onClick={handleSpeedClick}
                        isActive={speed === 'Fastest'}
                    />
                </div>
            </div>
            <div>Mode</div>
            <div className="col-start-4 justify-self-end">
                <button
                    onClick={onCloseClick}
                    className="group flex flex-row gap-1 text-sm "
                >
                    <span className="invisible mt-[0.0625rem] uppercase group-hover:visible">
                        Close
                    </span>
                    <span className="self-start ">
                        <ChevronUp />
                    </span>
                </button>
            </div>
        </motion.div>
    );
}

export default function Header() {
    const { mode } = useGeneralGameState();

    const [showSettings, setShowSettings] = useState(false);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
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
                                    <div className="absolute inset-0 -mx-4">
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
