import { createContext, ReactNode } from 'react';
import { useLocalStorage } from '../lib/util.ts';

interface ClassicGameStateContext {
    highScore: number;
    setHighScore: (highScore: number) => void;
}

export const ClassicGameContext = createContext<ClassicGameStateContext | null>(
    null
);

interface GameContextProviderProps {
    children: ReactNode;
}

/**
 * The context provider for the game state.
 *
 * @param children
 * @constructor
 */
export const ClassicGameStateContextProvider = ({
    children,
}: GameContextProviderProps) => {
    // Data
    const [highScore, setHighScore] = useLocalStorage<number>(
        'classic_high_score',
        0
    );

    return (
        <ClassicGameContext.Provider
            value={{
                highScore,
                setHighScore,
            }}
        >
            {children}
        </ClassicGameContext.Provider>
    );
};
