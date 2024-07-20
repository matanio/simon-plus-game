import { useContext } from 'react';
import { ClassicGameContext } from '../contexts/ClassicGameContextProvider.tsx';
import { GeneralGameContext } from '../contexts/GeneralGameContextProvider.tsx';
import * as Tone from 'tone';
import { DailyGameContext } from '../contexts/DailyGameContextProvider.tsx';
import { formatDateAsYearMonthDay } from '../lib/util.ts';

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

/**
 * Custom hook to access the daily game state.
 */
export const useDailyGameState = () => {
    const dailyContext = useContext(DailyGameContext);

    if (!dailyContext)
        throw new Error(
            'useDailyGameState must be used inside the DailyGameContextProvider'
        );

    const generalContext = useGeneralGameState();

    return { ...generalContext, ...dailyContext };
};

/**
 * Custom hook to access the general game state (i.e. state that is the same between classic and daily modes).
 */
export const useGeneralGameState = () => {
    const generalContext = useContext(GeneralGameContext);

    if (!generalContext)
        throw new Error(
            'useGeneralGameState must be used inside the GeneralGameContextProvider'
        );

    return generalContext;
};

export type AllowedTileNumbers = 4 | 6 | 8;

/**
 * Generate a sequence of numbers for the daily game.
 * @param date
 * @param numberOfTiles
 * @param length
 */
export const generateDailyGameSequence = (
    date: Date = new Date(),
    numberOfTiles: number = 4,
    length: number = 200
) => {
    const dateString = formatDateAsYearMonthDay(date);
    let seed = 0;
    for (let i = dateString.length - 1; i >= 0; i--) {
        seed += dateString.charCodeAt(i);
    }

    const sequence = [];
    for (let i = 0; i < length; i++) {
        // Use the seed to generate a pseudo-random number
        seed = (seed * 9301 + 49297) % 233280;
        const random = seed / 233280;

        // Generate a number between 1 and numberOfTiles
        const number = Math.floor(random * numberOfTiles) + 1;
        sequence.push(number);
    }

    return sequence;
};

/**
 * Get the number of tiles for the daily game today.
 * @param date
 */
export const getNumberOfTilesToday = (date: Date = new Date()) => {
    const dateString = formatDateAsYearMonthDay(date);
    let seed = 0;
    for (let i = dateString.length - 1; i >= 0; i--) {
        seed += dateString.charCodeAt(i);
    }

    // Use the seed to generate a pseudo-random number
    seed = (seed * 1232 + 123123) % 104332;
    const random = seed / 104332;

    if (random < 0.33) return 4;
    if (random < 0.66) return 6;
    return 8;
};

export type Instrument = 'synthesizer' | 'trumpet' | 'guitar';

export const NOTES = ['C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3', 'C4'];
export const synth = new Tone.Synth();
export const guitar = new Tone.Sampler({
    urls: {
        C3: 'twang_c4_f_rr1.wav', // Purposeful incorrect mapping for ease of use
        D3: 'twang_d4_f_rr1.wav',
        E3: 'twang_e4_f_rr1.wav',
        F3: 'twang_f4_f_rr1.wav',
        G3: 'twang_g4_f_rr1.wav',
        A3: 'twang_a4_f_rr1.wav',
        B3: 'twang_b4_f_rr1.wav',
        C4: 'twang_c5_f_rr1.wav',
    },
    release: 1,
    baseUrl: '/simon-plus-game/samples/guitar/',
    onload: () => {
        console.log('Guitar samples loaded!');
    },
    onerror: error => {
        console.error(error);
    },
});
export const trumpet = new Tone.Sampler({
    urls: {
        C3: 'Sum_SHTrumpet_sus_C3_v1_rr1.wav', // Purposeful incorrect mapping for ease of use
        D3: 'Sum_SHTrumpet_sus_D4_v1_rr1.wav',
        E3: 'Sum_SHTrumpet_sus_Ds3_v1_rr1.wav',
        F3: 'Sum_SHTrumpet_sus_F4_v1_rr1.wav',
        G3: 'Sum_SHTrumpet_sus_G3_v1_rr1.wav',
        A3: 'Sum_SHTrumpet_sus_A2_v1_rr1.wav',
        B3: 'Sum_SHTrumpet_sus_As3_v1_rr1.wav',
        C4: 'Sum_SHTrumpet_sus_C5_v1_rr1.wav',
    },
    release: 1,
    baseUrl: '/simon-plus-game/samples/trumpet/',
    onload: () => {
        console.log('Trumpet samples loaded!');
    },
    onerror: error => {
        console.error(error);
    },
});

// Speed
export type Speed = 'Normal' | 'Fast' | 'Fastest';
