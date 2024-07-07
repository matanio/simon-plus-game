import { useContext } from 'react';
import { ClassicGameContext } from '../contexts/ClassicGameContextProvider.tsx';
import { GeneralGameContext } from '../contexts/GeneralGameContextProvider.tsx';
import * as Tone from 'tone';

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

export type Instrument = 'synthesizer' | 'trumpet' | 'guitar';

export const NOTES = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'];
export const synth = new Tone.Synth();
export const guitar = new Tone.Sampler({
    urls: {
        C3: 'twang_c4_f_rr1.wav', // Purposeful C3 to C4 mapping for ease of use
        D3: 'twang_d4_f_rr1.wav',
        E3: 'twang_e4_f_rr1.wav',
        F3: 'twang_f4_f_rr1.wav',
        G3: 'twang_g4_f_rr1.wav',
        A3: 'twang_a4_f_rr1.wav',
        B3: 'twang_b4_f_rr1.wav',
        C4: 'twang_c5_f_rr1.wav',
    },
    release: 1,
    baseUrl: '/samples/guitar/',
    onload: () => {
        console.log('Guitar samples loaded!');
    },
    onerror: error => {
        console.error(error);
    },
});

// Speed
export type Speed = 'Normal' | 'Fast' | 'Fastest';
