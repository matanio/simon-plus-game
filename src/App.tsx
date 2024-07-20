import Footer from './components/footer/Footer.tsx';
import StartScreen from './components/StartScreen.tsx';
import Header from './components/header/Header.tsx';
import ClassicMode from './components/classic/ClassicMode.tsx';
import { AnimatePresence } from 'framer-motion';
import { useGeneralGameState } from './game/game.ts';
import DailyMode from './components/daily/DailyMode.tsx';

const App = () => {
    const { mode, setModeToClassic, setModeToDaily } = useGeneralGameState();

    return (
        <div className="flex h-screen flex-col">
            <Header />

            <main className="grow bg-slate-900">
                <AnimatePresence>
                    {!mode && (
                        <StartScreen
                            onClassicClick={setModeToClassic}
                            onDailyClick={setModeToDaily}
                        />
                    )}
                    {mode === 'classic' && <ClassicMode />}
                    {mode === 'daily' && <DailyMode />}
                </AnimatePresence>
            </main>

            <div className="justify-self-end">
                <Footer />
            </div>
        </div>
    );
};

export default App;
