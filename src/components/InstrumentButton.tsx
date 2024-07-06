import { cn } from '../lib/util.ts';
import { MouseEventHandler, ReactNode } from 'react';

interface InstrumentButtonProps {
    children?: ReactNode;
    isActive: boolean;
    onClick: MouseEventHandler;
}

export const InstrumentButton = ({
    children,
    isActive,
    onClick,
}: InstrumentButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                'grid aspect-square place-items-center rounded px-2 border-2 border-transparent',
                isActive
                    ? 'bg-slate-100'
                    : 'hover:border-2 hover:border-slate-400 hover:bg-slate-500'
            )}
        >
            {children}
        </button>
    );
};
