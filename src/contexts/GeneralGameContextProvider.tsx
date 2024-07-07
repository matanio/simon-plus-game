import { createContext, ReactNode, useEffect, useState } from 'react';
import { guitar, Instrument, Mode, NOTES, Speed, synth } from '../game/game.ts';

interface GeneralGameContext {
    isSoundOn: boolean;
    toggleSound: () => void;
    mode: Mode | null; // null means no mode is selected yet
    setModeToClassic: () => void;
    setModeToDaily: () => void;
    isPlaying: boolean; // State management for the game — are we mid-game?
    setIsPlaying: (isPlaying: boolean) => void;
    playNote: (tile: number) => void;
    instrument: Instrument;
    setInstrument: (instrument: Instrument) => void;
    speed: Speed;
    setSpeed: (speed: Speed) => void;
    delay: number;
}

export const GeneralGameContext = createContext<GeneralGameContext | null>(
    null
);

interface GeneralGameStateContextProps {
    children: ReactNode;
}

/**
 * The context provider for the game state.
 *
 * @param children
 * @constructor
 */
export const GeneralGameStateContextProvider = ({
    children,
}: GeneralGameStateContextProps) => {
    const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
    const [mode, setMode] = useState<Mode | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [instrument, setInstrument] = useState<Instrument>('synthesizer');
    const [speed, setSpeed] = useState<Speed>('Normal');

    // TODO: update type
    const [destination, setDestination] = useState<any>(synth.toDestination());

    const [delay, setDelay] = useState<number>(500);

    const toggleSound = () => {
        setIsSoundOn(prev => !prev);
    };

    const setModeToClassic = () => {
        setMode('classic');
    };

    const setModeToDaily = () => {
        setMode('daily');
    };

    const playNote = (tile: number) => {
        destination.triggerAttackRelease(NOTES[tile - 1], '5n');
    };

    // Mute + Unmute
    useEffect(() => {
        destination.volume.value = isSoundOn ? 0 : -Infinity;
    }, [isSoundOn]);

    // Instrument Change
    useEffect(() => {
        console.log('Instrument changed');
        switch (instrument) {
            case 'synthesizer':
                setDestination(synth.toDestination());
                break;
            case 'guitar':
                setDestination(guitar.toDestination());
                break;
            default:
                console.log('Not implemented yet');
                setDestination(synth.toDestination()); // Default to synth
                break;
        }
    }, [instrument]);

    useEffect(() => {
        switch (speed) {
            case 'Fast':
                setDelay(300);
                break;
            case 'Fastest':
                setDelay(150);
                break;
            default:
                setDelay(500);
        }
    }, [speed]);

    return (
        <GeneralGameContext.Provider
            value={{
                isSoundOn,
                toggleSound,
                mode,
                setModeToClassic,
                setModeToDaily,
                isPlaying,
                setIsPlaying,
                playNote,
                instrument,
                setInstrument,
                speed,
                setSpeed,
                delay,
            }}
        >
            {children}
        </GeneralGameContext.Provider>
    );
};
