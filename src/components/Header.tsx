import BrainIcon from './BrainIcon.tsx';

export default function Header() {
    return (
        <header className="grid place-content-center py-4">
            <div className="flex flex-row items-center justify-center gap-2 rounded-full bg-indigo-800 px-4 py-2.5 text-white shadow-lg">
                <div className="grid place-items-center">
                    <BrainIcon />
                </div>
                <h1 className="text-xl font-bold">Simon+</h1>
            </div>
        </header>
    );
}
