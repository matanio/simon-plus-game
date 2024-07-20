import { createContext, ReactNode, useEffect, useState } from 'react';
import {
    guitar,
    Instrument,
    Mode,
    NOTES,
    Speed,
    synth,
    trumpet,
} from '../game/game.ts';

interface GeneralGameContext {
    isSoundOn: boolean;
    toggleSound: () => void;
    mode: Mode | null; // null means no mode is selected yet
    setModeToClassic: () => void;
    setModeToDaily: () => void;
    setModeToNull: () => void;
    isPlaying: boolean; // State management for the game — are we mid-game?
    setIsPlaying: (isPlaying: boolean) => void;
    playNote: (tile: number) => void;
    instrument: Instrument;
    setInstrument: (instrument: Instrument) => void;
    speed: Speed;
    setSpeed: (speed: Speed) => void;
    delay: number;
    tileColors: string[];
    flashColors: string[];
    activeTile: number | null;
    flashTile: (tile: number) => void;
    resetTile: (tile: number) => void;
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

    const colors = [
        'bg-green-500/75',
        'bg-red-600/75',
        'bg-yellow-400/75',
        'bg-blue-700/75',
        'bg-purple-700/75',
        'bg-orange-600/75',
        'bg-gray-400/75',
        'bg-pink-900/75',
    ];

    const flashColors = [
        'bg-green-300',
        'bg-red-300',
        'bg-yellow-100',
        'bg-blue-400',
        'bg-purple-400',
        'bg-orange-300',
        'bg-gray-100',
        'bg-pink-600',
    ];

    const [tileColors, setTileColors] = useState<string[]>(colors);
    const [activeTile, setActiveTile] = useState<number | null>(null);

    const flashTile = (tile: number) => {
        const newTileColors = [...tileColors];
        newTileColors[tile - 1] = flashColors[tile - 1];
        setTileColors(newTileColors);
        setActiveTile(tile); // Set the active tile
    };

    const resetTile = (tile: number) => {
        const newTileColors = [...tileColors];
        newTileColors[tile - 1] = colors[tile - 1];
        setTileColors(newTileColors);
        setActiveTile(null); // Reset the active tile
    };

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

    const setModeToNull = () => {
        setMode(null);
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
        switch (instrument) {
            case 'synthesizer':
                setDestination(synth.toDestination());
                break;
            case 'guitar':
                setDestination(guitar.toDestination());
                break;
            case 'trumpet':
                setDestination(trumpet.toDestination());
                break;
            default:
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
                setModeToNull,
                isPlaying,
                setIsPlaying,
                playNote,
                instrument,
                setInstrument,
                speed,
                setSpeed,
                delay,
                tileColors,
                flashColors,
                activeTile,
                flashTile,
                resetTile,
            }}
        >
            {children}
        </GeneralGameContext.Provider>
    );
};
