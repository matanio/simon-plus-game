import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
