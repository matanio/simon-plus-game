import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GeneralGameStateContextProvider } from './contexts/GeneralGameContextProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <GeneralGameStateContextProvider>
            <App />
        </GeneralGameStateContextProvider>
    </React.StrictMode>
);
