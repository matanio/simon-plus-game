import Footer from './components/Footer.tsx';
import StartScreen from './components/StartScreen.tsx';
import Header from './components/Header.tsx';
import ClassicMode from './components/ClassicMode.tsx';
import { AnimatePresence } from 'framer-motion';
import { useGeneralGameState } from './game/game.ts';

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
