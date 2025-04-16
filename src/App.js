import React, { useState, useEffect } from "react";
import VisemeDisplay from "./components/VisemeDisplay";
import ErrorBoundary from "./components/ErrorBoundary";
import "./App.css";

function App() {
    const [textToSpeak, setTextToSpeak] = useState("");

    useEffect(() => {
        const handleSpeakTextEvent = (event) => {
            console.log('Received speakText event:', event.detail);
            const text = event.detail?.trim();
            if (text) {
                setTextToSpeak(text);
            }
        };

        window.addEventListener('speakText', handleSpeakTextEvent);
        return () => window.removeEventListener('speakText', handleSpeakTextEvent);
    }, []);

    return (
        <div className="app-container">
            <ErrorBoundary>
                <main className="main-content">
                    <VisemeDisplay text={textToSpeak} />
                </main>
            </ErrorBoundary>
        </div>
    );
}

export default App;
