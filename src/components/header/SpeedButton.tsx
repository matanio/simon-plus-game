import { cn } from '../../lib/util.ts';
import { Speed } from '../../game/game.ts';

interface SpeedButtonProps {
    isActive: boolean;
    speed: Speed;
    onClick: (speed: Speed) => void;
}

export const SpeedButton = ({ isActive, speed, onClick }: SpeedButtonProps) => {
    return (
        <button
            onClick={() => onClick(speed)}
            className={cn(
                'grid aspect-square place-items-center rounded border-2 border-transparent w-10 text-xs',
                isActive
                    ? 'bg-slate-100 text-slate-900'
                    : 'hover:border-2 hover:border-slate-400 hover:bg-slate-500'
            )}
        >
            {speed}
        </button>
    );
};
