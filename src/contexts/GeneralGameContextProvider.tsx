import { createContext, ReactNode, useEffect, useState } from 'react';
import { guitar, Instrument, Mode, notes, synth } from '../game/game.ts';

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

    // TODO: update type
    const [destination, setDestination] = useState<any>(synth.toDestination());

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
        destination.triggerAttackRelease(notes[tile - 1], '5n');
    };

    // Mute + Unmute
    useEffect(() => {
        destination.volume.value = isSoundOn ? 0 : -Infinity;
    }, [isSoundOn]);

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
            }}
        >
            {children}
        </GeneralGameContext.Provider>
    );
};
