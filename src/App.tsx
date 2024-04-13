import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import StartScreen from './components/StartScreen.tsx';

const App = () => {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            {/* Main Space */}
            <main className="grow">
                <StartScreen />
            </main>

            <div className="justify-self-end">
                <Footer />
            </div>
        </div>
    );
};

export default App;
