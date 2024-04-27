import Footer from './components/Footer.tsx';
import StartScreen from './components/StartScreen.tsx';
import Header, { mode } from './components/Header.tsx';
import { useState } from 'react';
import ClassicMode from './components/ClassicMode.tsx';
import { AnimatePresence } from 'framer-motion';

const App = () => {
    const [mode, setMode] = useState<mode | null>(null);

    const handleDailyClick = () => {
        setMode('daily');
    };

    const handleClassicClick = () => {
        setMode('classic');
    };

    return (
        <div className="flex h-screen flex-col">
            <Header mode={mode} />
            <main className="grow bg-slate-900">
                <AnimatePresence>
                    {!mode && (
                        <StartScreen
                            onClassicClick={handleClassicClick}
                            onDailyClick={handleDailyClick}
                        />
                    )}
                    {mode === 'classic' && <ClassicMode />}
                </AnimatePresence>
                {/* TODO */}
                {/*<ClassicMode />*/}
            </main>

            <div className="justify-self-end">
                <Footer />
            </div>
        </div>
    );
};

export default App;
