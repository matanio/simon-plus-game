import { createContext, ReactNode, useEffect } from 'react';
import {
    clearLocalStorage,
    formatDateAsYearMonthDay,
    useLocalStorage,
} from '../lib/util.ts';
import { AllowedTileNumbers, generateDailyGameSequence } from '../game/game.ts';

interface DailyGameStateContext {
    score: number;
    incrementScore: () => void;
    resetScore: () => void;
    mistakesRemaining: number;
    decrementMistakesRemaining: () => void;
    sequence: number[];
    getFormattedResults: () => string;
}

export const DailyGameContext = createContext<DailyGameStateContext | null>(
    null
);

interface DailyGameContextProviderProps {
    numberOfTiles: AllowedTileNumbers;
    children: ReactNode;
}

export const DEFAULT_MISTAKES_REMAINING: number = 3;

/**
 * The context provider for the game state.
 *
 * @param children
 * @param numberOfTiles
 * @constructor
 */
export const DailyGameStateContextProvider = ({
    children,
    numberOfTiles,
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
        generateDailyGameSequence(new Date(), numberOfTiles)
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
        setSequence(generateDailyGameSequence(new Date(), numberOfTiles));
    };

    const decrementMistakesRemaining = () => {
        setMistakesRemaining(mistakesRemaining - 1);
    };

    const incrementScore = () => {
        setScore(prev => prev + 1); // TODO; update to prev
    };

    const resetScore = () => {
        setScore(0);
    };

    const getFormattedResults = () => {
        let emojis: string = '';
        switch (true) {
            case score > 50:
                emojis = '🎉🎉🎉';
                break;
            case score > 30:
                emojis = '🎉🎉';
                break;
            case score > 20:
                emojis = '🎉';
                break;
            case score > 15:
                emojis = '👍👍';
                break;
            default:
                emojis = '👍';
                break;
        }
        return `S+ Daily ${lastDate}: \n ${score} | ${emojis}`;
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
                getFormattedResults,
            }}
        >
            {children}
        </DailyGameContext.Provider>
    );
};
