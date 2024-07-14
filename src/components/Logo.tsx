import { cn } from '../lib/util.ts';

interface LogoProps {
    className?: string;
}

export function Logo({ className }: LogoProps) {
    return (
        <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn('size-12', className)}
        >
            <g clipPath="url(#clip0_401_5)">
                <rect
                    x="16.0294"
                    y="4"
                    width="7.79726"
                    height="7.79726"
                    rx="0.5"
                    transform="rotate(45 16.0294 4)"
                    fill="#22C55E"
                />
                <rect
                    x="9.51349"
                    y="10.5159"
                    width="7.79726"
                    height="7.79726"
                    rx="0.5"
                    transform="rotate(45 9.51349 10.5159)"
                    fill="#FACC15"
                />
                <rect
                    x="16.0294"
                    y="17.0319"
                    width="7.79726"
                    height="7.79726"
                    rx="0.5"
                    transform="rotate(45 16.0294 17.0319)"
                    fill="#1D4ED8"
                />
                <rect
                    x="22.5454"
                    y="10.5159"
                    width="7.79726"
                    height="7.79726"
                    rx="0.5"
                    transform="rotate(45 22.5454 10.5159)"
                    fill="#DC2626"
                />
                <path
                    d="M22.4205 13.3693V5.32386H24.4545V13.3693H22.4205ZM19.4148 10.3636V8.32955H27.4602V10.3636H19.4148Z"
                    fill="white"
                />
            </g>
            <defs>
                <clipPath id="clip0_401_5">
                    <rect width="32" height="32" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
}
