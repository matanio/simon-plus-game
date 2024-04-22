import { motion } from 'framer-motion';
import Game from './Game.tsx';

export default function ClassicMode() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex size-full flex-col items-center justify-center"
        >
            <div className="flex flex-row items-center justify-between gap-12 text-white">
                <div>Volume</div>
                <div>Score</div>
                <div>Settings</div>
            </div>
            {/* TODO: change to only set isPlaying later */}
            <Game isPlaying={true} isSoundOn={true} numberOfTiles={4} />
        </motion.div>
    );
}
