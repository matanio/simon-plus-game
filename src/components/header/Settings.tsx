import { Instrument, Speed, useGeneralGameState } from '../../game/game.ts';
import { motion } from 'framer-motion';
import { slideDown } from '../../lib/animations.ts';
import { InstrumentButton } from './InstrumentButton.tsx';
import { SpeedButton } from './SpeedButton.tsx';
import { ChevronUp } from '../Icons.tsx';
import { MouseEventHandler } from 'react';

interface SettingsProps {
    onCloseClick: MouseEventHandler;
}

export default function Settings({ onCloseClick }: SettingsProps) {
    const { instrument, setInstrument, speed, setSpeed } =
        useGeneralGameState();

    const handleInstrumentClick = (instrument: Instrument) => {
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
            className="flex flex-col justify-items-center gap-4 rounded-xl rounded-t-none bg-slate-600 p-4 text-xs uppercase text-white sm:grid sm:grid-cols-4 sm:gap-0"
        >
            <div className="col-start-2 -mt-9 flex flex-col items-center gap-1 sm:mt-auto">
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
            <div className="col-start-3 flex flex-col items-center gap-1">
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
            <div className="z-20 order-first col-start-4 self-end sm:z-auto sm:order-none sm:self-auto sm:justify-self-end">
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
