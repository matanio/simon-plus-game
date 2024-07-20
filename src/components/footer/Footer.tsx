export default function Footer() {
    return (
        <footer className="bg-slate-200 py-10">
            <div className="container mx-auto px-4">
                <div className="flex justify-center">
                    <p className="text-sm">
                        🚀 by{' '}
                        <a
                            target="_blank"
                            className="font-bold text-slate-700 underline-offset-4 hover:underline"
                            href="https://github.com/matanio"
                        >
                            @matanio
                        </a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    );
}
