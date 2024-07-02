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
