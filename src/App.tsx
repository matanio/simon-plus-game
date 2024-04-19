import Footer from './components/Footer.tsx';
import StartScreen from './components/StartScreen.tsx';

const App = () => {
    const handlePress = () => {
        console.log('Pressed');
    };

    return (
        <div className="flex h-screen flex-col">
            {/*<Header />*/}
            {/* Main Space */}
            <main className="grow">
                <StartScreen
                    onClassicClick={handlePress}
                    onDailyClick={handlePress}
                />
            </main>

            <div className="justify-self-end">
                <Footer />
            </div>
        </div>
    );
};

export default App;
