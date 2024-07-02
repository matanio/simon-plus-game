import { useContext } from 'react';
import { ClassicGameContext } from '../contexts/ClassicGameContextProvider.tsx';

export type Mode = 'classic' | 'daily';

/**
 * Custom hook to access the classic game state.
 */
export const useClassicGameState = () => {
    const context = useContext(ClassicGameContext);

    if (!context)
        throw new Error(
            'useClassicGameState must be used inside the ClassicGameContextProvider'
        );

    return context;
};
