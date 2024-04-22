import Footer from './components/Footer.tsx';
import StartScreen from './components/StartScreen.tsx';
import Header, { mode } from './components/Header.tsx';
import { useState } from 'react';
import ClassicMode from './components/ClassicMode.tsx';
import { AnimatePresence } from 'framer-motion';

const App = () => {
    const [mode, setMode] = useState<mode | null>(null);

    const handlePress = () => {
        setMode('daily');
        console.log('Pressed');
    };

    const handleClassicClick = () => {
        setMode('classic');
        console.log('Classic Clicked');
    };

    return (
        <div className="flex h-screen flex-col">
            <Header mode={mode} />
            {/* Main Space */}
            <main className="grow bg-slate-900">
                <AnimatePresence>
                    {!mode && (
                        <StartScreen
                            onClassicClick={handleClassicClick}
                            onDailyClick={handlePress}
                        />
                    )}
                    {mode === 'classic' && <ClassicMode />}
                </AnimatePresence>
                {/*TODO*/}
                {/*<ClassicMode />*/}
            </main>

            <div className="justify-self-end">
                <Footer />
            </div>
        </div>
    );
};

export default App;
