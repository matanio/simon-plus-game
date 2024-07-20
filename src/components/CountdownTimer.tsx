import { useEffect, useState } from 'react';

interface Countdown {
    hours: number;
    minutes: number;
    seconds: number;
}

/**
 * A countdown timer that shows the time left until midnight.
 *
 * @constructor
 */
export default function CountdownTimer() {
    const calculateTimeLeft = (now: Date): Countdown => {
        const midnight = new Date(now);
        midnight.setHours(24, 0, 0, 0);

        const diff = Math.abs(midnight.getTime() - now.getTime());
        const hours = Math.floor(diff / 3_600_000);
        const minutes = Math.floor((diff % 3_600_000) / 60_000);
        const seconds = Math.floor((diff % 60_000) / 1000);
        return { hours, minutes, seconds };
    };

    const [, setTime] = useState<Date>(new Date());
    const [countdown, setCountdown] = useState<Countdown>(
        calculateTimeLeft(new Date())
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setTime(now);
            setCountdown(calculateTimeLeft(now));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center text-4xl font-extrabold text-slate-900">
            <span className="w-12 text-center">
                {countdown.hours.toString().padStart(2, '0')}
            </span>
            :
            <span className="w-12 text-center">
                {countdown.minutes.toString().padStart(2, '0')}
            </span>
            :
            <span className="w-12 text-center">
                {countdown.seconds.toString().padStart(2, '0')}
            </span>
        </div>
    );
}
