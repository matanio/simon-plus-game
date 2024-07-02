import { createContext, ReactNode, useState } from 'react';
import { Mode } from '../game/game.ts';

interface GeneralGameContext {
    isSoundOn: boolean;
    toggleSound: () => void;
    mode: Mode | null; // null means no mode is selected yet
    setModeToClassic: () => void;
    setModeToDaily: () => void;
    isPlaying: boolean; // State management for the game — are we mid-game?
    setIsPlaying: (isPlaying: boolean) => void;
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

    const toggleSound = () => {
        setIsSoundOn(prev => !prev);
    };

    const setModeToClassic = () => {
        setMode('classic');
    };

    const setModeToDaily = () => {
        setMode('daily');
    };

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
            }}
        >
            {children}
        </GeneralGameContext.Provider>
    );
};
