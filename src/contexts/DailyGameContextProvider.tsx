import { createContext, ReactNode, useEffect } from 'react';
import {
    clearLocalStorage,
    formatDateAsYearMonthDay,
    useLocalStorage,
} from '../lib/util.ts';
import { generateDailyGameSequence } from '../game/game.ts';

interface DailyGameStateContext {
    score: number;
    incrementScore: () => void;
    resetScore: () => void;
    mistakesRemaining: number;
    decrementMistakesRemaining: () => void;
    sequence: number[];
}

export const DailyGameContext = createContext<DailyGameStateContext | null>(
    null
);

interface DailyGameContextProviderProps {
    children: ReactNode;
}

export const DEFAULT_MISTAKES_REMAINING: number = 3;

/**
 * The context provider for the game state.
 *
 * @param children
 * @constructor
 */
export const DailyGameStateContextProvider = ({
    children,
}: DailyGameContextProviderProps) => {
    const [score, setScore] = useLocalStorage<number>('daily_score', 0);
    const [mistakesRemaining, setMistakesRemaining] = useLocalStorage<number>(
        'daily_mistakes_remaining',
        DEFAULT_MISTAKES_REMAINING
    );
    const [lastDate, setLastDate] = useLocalStorage<string | null>(
        'lastDate',
        null
    );

    const [sequence, setSequence] = useLocalStorage<number[]>(
        'daily_sequence',
        generateDailyGameSequence()
    );

    // Core game load logic
    useEffect(() => {
        const today = formatDateAsYearMonthDay(new Date());

        // If today is a new day,
        if (today !== lastDate) {
            resetForNewDay();
        }
    }, []);

    const resetForNewDay = () => {
        clearLocalStorage('daily_score');
        clearLocalStorage('daily_mistakes_remaining');
        clearLocalStorage('daily_sequence');
        resetScore();
        setMistakesRemaining(DEFAULT_MISTAKES_REMAINING);
        setLastDate(formatDateAsYearMonthDay(new Date()));
        setSequence(generateDailyGameSequence());
    };

    const decrementMistakesRemaining = () => {
        setMistakesRemaining(mistakesRemaining - 1);
    };

    const incrementScore = () => {
        setScore(prev => prev + 1); // TODO; update to prev
    };

    useEffect(() => {
        console.log('score updated');
    }, [score]);

    const resetScore = () => {
        setScore(0);
    };

    return (
        <DailyGameContext.Provider
            value={{
                score,
                incrementScore,
                resetScore,
                mistakesRemaining,
                decrementMistakesRemaining,
                sequence,
            }}
        >
            {children}
        </DailyGameContext.Provider>
    );
};
