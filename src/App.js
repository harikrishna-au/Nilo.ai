import React, { useState, useEffect } from "react";
import VisemeDisplay from "./components/VisemeDisplay";

function App() {
    const [textToSpeak, setTextToSpeak] = useState("");

    useEffect(() => {
        const handleSpeakTextEvent = (event) => {
            setTextToSpeak(event.detail);
        };

        window.addEventListener('speakText', handleSpeakTextEvent);

        return () => {
            window.removeEventListener('speakText', handleSpeakTextEvent);
        };
    }, []);

    return (
        <div>
            <VisemeDisplay text={textToSpeak} />
        </div>
    );
}

export default App;
