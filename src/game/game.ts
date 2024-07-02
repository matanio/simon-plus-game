import { useContext } from 'react';
import { ClassicGameContext } from '../contexts/ClassicGameContextProvider.tsx';
import { GeneralGameContext } from '../contexts/GeneralGameContextProvider.tsx';

export type Mode = 'classic' | 'daily';

/**
 * Custom hook to access the classic game state.
 */
export const useClassicGameState = () => {
    const classicContext = useContext(ClassicGameContext);

    if (!classicContext)
        throw new Error(
            'useClassicGameState must be used inside the ClassicGameContextProvider'
        );

    const generalContext = useGeneralGameState();

    return { ...generalContext, ...classicContext };
};

export const useGeneralGameState = () => {
    const generalContext = useContext(GeneralGameContext);

    if (!generalContext)
        throw new Error(
            'useGeneralGameState must be used inside the GeneralGameContextProvider'
        );

    return generalContext;
};

/**
 * Used exclusively for the Game component to manage which game state to use.
 *
 * @param mode
 */
export const useGameState = (mode: Mode) => {
    switch (mode) {
        case 'classic':
            return useClassicGameState();
        case 'daily':
            throw new Error('Daily mode not implemented yet');
        default:
            throw new Error('Invalid mode');
    }
};
