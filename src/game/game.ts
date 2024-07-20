import { useContext, useState } from 'react';
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

export const useGeneralGameState = () => {
    const generalContext = useContext(GeneralGameContext);

    if (!generalContext)
        throw new Error(
            'useGeneralGameState must be used inside the GeneralGameContextProvider'
        );

    return generalContext;
};

export const useTile = (colors: string[], flashColors: string[]) => {
    const [tileColors, setTileColors] = useState<string[]>(colors);
    const [activeTile, setActiveTile] = useState<number | null>(null);

    const flashTile = (tile: number) => {
        const newTileColors = [...tileColors];
        newTileColors[tile - 1] = flashColors[tile - 1];
        setTileColors(newTileColors);
        setActiveTile(tile); // Set the active tile
    };

    const resetTile = (tile: number) => {
        const newTileColors = [...tileColors];
        newTileColors[tile - 1] = colors[tile - 1];
        setTileColors(newTileColors);
        setActiveTile(null); // Reset the active tile
    };

    return { tileColors, activeTile, flashTile, resetTile };
};

export const buildTiles = (numberOfTiles: number) => {
    return Array.from({ length: numberOfTiles }, (_, index) => index + 1);
};

export const colors = [
    'bg-green-500/75',
    'bg-red-600/75',
    'bg-yellow-400/75',
    'bg-blue-700/75',
    'bg-purple-700/75',
    'bg-orange-600/75',
    'bg-gray-400/75',
    'bg-pink-900/75',
];

export const flashColors = [
    'bg-green-300',
    'bg-red-300',
    'bg-yellow-100',
    'bg-blue-400',
    'bg-purple-400',
    'bg-orange-300',
    'bg-gray-100',
    'bg-pink-600',
];

export const generateDailyGameSequence = (
    date: Date = new Date(),
    numberOfTiles: number = 4,
    length: number = 200 // TODO: make this a constant and deal with what happens if we get to it
) => {
    const dateString = formatDateAsYearMonthDay(date);
    let seed = 0;
    for (let i = 0; i < dateString.length; i++) {
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
    baseUrl: '/samples/trumpet/',
    onload: () => {
        console.log('Trumpet samples loaded!');
    },
    onerror: error => {
        console.error(error);
    },
});

// Speed
export type Speed = 'Normal' | 'Fast' | 'Fastest';
