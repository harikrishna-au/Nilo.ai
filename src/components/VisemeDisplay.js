import React, { useState, useEffect, useRef } from "react";
import cartoonAvatarVideo from "../AvatarImages/cartoonAvatar.png";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { config } from "../config";
import { cartoonVisemes } from "../visemes/cartoonVisemes";
import "./VisemeDisplay.css";

const VisemeDisplay = ({ text }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [isVisemesActive, setIsVisemesActive] = useState(false);
    const synthesizerRef = useRef(null);
    const timeoutsRef = useRef([]);

    useEffect(() => {
        if (text) {
            cleanup();
            handleVisemes(text);
        }
    }, [text]);

    const cleanup = () => {
        // Clear all active viseme timeouts
        timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
        timeoutsRef.current = [];

        // Stop synthesizer if running
        if (synthesizerRef.current) {
            synthesizerRef.current.close();
            synthesizerRef.current = null;
        }

        setIsVisemesActive(false);
    };

    useEffect(() => {
        return () => cleanup();
    }, []);

    const handleVisemes = (text) => {
        try {
            const speechConfig = sdk.SpeechConfig.fromSubscription(
                config.SpeechKey,
                config.SpeechRegion
            );

            speechConfig.setProperty("SpeechServiceConnection_ReconnectOnError", "1");
            speechConfig.setProperty("SpeechServiceConnection_InitialSilenceTimeoutMs", "5000");

            const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();

            synthesizerRef.current = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
            let visemesArr = [];

            synthesizerRef.current.visemeReceived = function (s, e) {
                console.log('Viseme received:', e.visemeId);
                visemesArr.push(e);
            };

            synthesizerRef.current.speakTextAsync(
                text,
                (result) => {
                    if (result.errorDetails) {
                        console.error('Speech synthesis error:', result.errorDetails);
                    } else {
                        console.log('Speech synthesis successful, processing visemes');
                        setIsVisemesActive(true);

                        visemesArr.forEach((e) => {
                            const duration = e.audioOffset / 10000;
                            const timeout = setTimeout(() => {
                                setImageIndex(e.visemeId);
                            }, duration);
                            timeoutsRef.current.push(timeout);
                        });

                        const lastViseme = visemesArr[visemesArr.length - 1];
                        if (lastViseme) {
                            const finalTimeout = setTimeout(() => {
                                setIsVisemesActive(false);
                            }, (lastViseme.audioOffset / 10000) + 500);
                            timeoutsRef.current.push(finalTimeout);
                        }
                    }
                },
                (error) => {
                    console.error('Speech synthesis error:', error);
                    cleanup();
                }
            );
        } catch (error) {
            console.error('Error initializing speech synthesis:', error);
            cleanup();
        }
    };

    return (
        <div className="faces-container">
            <div className="face-container cartoon-face">
                <div className="avatar-wrapper">
                    <img
                        src={cartoonAvatarVideo}
                        alt="Cartoon Avatar"
                        className="avatar-base"
                    />
                    <img
                        src={cartoonVisemes[imageIndex] || cartoonVisemes[0]}
                        alt="Cartoon Viseme"
                        className={`viseme-image cartoon-viseme ${isVisemesActive ? 'animate' : ''}`}
                    />
                </div>
            </div>
        </div>
    );
};

export default VisemeDisplay;
