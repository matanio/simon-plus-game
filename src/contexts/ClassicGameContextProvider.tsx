import { createContext, ReactNode, useState } from 'react';
import { useLocalStorage } from '../lib/util.ts';

interface ClassicGameStateContext {
    highScore: number;
    score: number;
    incrementScore: () => void;
    resetScore: () => void;
}

export const ClassicGameContext = createContext<ClassicGameStateContext | null>(
    null
);

interface ClassicGameContextProviderProps {
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
}: ClassicGameContextProviderProps) => {
    // Data
    const [highScore, setHighScore] = useLocalStorage<number>(
        'classic_high_score',
        0
    );
    const [score, setScore] = useState(0);

    const incrementScore = () => {
        const newScore = score + 1;
        if (newScore > highScore) {
            setHighScore(newScore);
        }
        setScore(newScore);
    };

    const resetScore = () => {
        setScore(0);
    };

    return (
        <ClassicGameContext.Provider
            value={{
                highScore,
                score,
                incrementScore,
                resetScore,
            }}
        >
            {children}
        </ClassicGameContext.Provider>
    );
};
