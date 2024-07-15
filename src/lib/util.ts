import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
    Dispatch,
    RefObject,
    SetStateAction,
    useEffect,
    useState,
} from 'react';

export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};

export function useLocalStorage<T>(
    key: string,
    initialValue: T | null = null
): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        try {
            const data = window.localStorage.getItem(key);
            return data ? JSON.parse(data) : initialValue;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export function clearLocalStorage(key: string) {
    window.localStorage.removeItem(key);
}

export const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export function useOutsideClick(
    ref: RefObject<HTMLElement>,
    callback: () => void
) {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [ref, callback]);
}

/**
 * Formats a date as a string in the format "Month Day, Year". e.g. "January 1, 2022".
 * @param date
 */
export const formatDateAsMonthDayYear = (date: Date): string => {
    const year = date.getFullYear();
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const month = monthNames[date.getMonth()]; // Months are 0 indexed so no need to +1
    const day = date.getDate();
    return `${month} ${day}, ${year}`;
};

/**
 * Formats a date as a string in the format "YYYY-MM-DD". e,g. "2022-01-01".
 * @param date
 */
export const formatDateAsYearMonthDay = (date: Date): string => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are 0 indexed so +1 and pad with 0 if needed
    const day = ('0' + date.getDate()).slice(-2); // Pad with 0 if needed
    return `${year}-${month}-${day}`;
};
