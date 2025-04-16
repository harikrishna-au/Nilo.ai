import React, { useState, useEffect } from "react";
import avatarImage from "../AvatarImages/1.png";
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

import viseme_id_0 from "../../src/visemes/viseme_id_0.svg";
import viseme_id_1 from "../../src/visemes/viseme_id_1.svg";
import viseme_id_2 from "../../src/visemes/viseme_id_2.svg";
import viseme_id_3 from "../../src/visemes/viseme_id_3.svg";
import viseme_id_4 from "../../src/visemes/viseme_id_4.svg";
import viseme_id_5 from "../../src/visemes/viseme_id_5.svg";
import viseme_id_6 from "../../src/visemes/viseme_id_6.svg";
import viseme_id_7 from "../../src/visemes/viseme_id_7.svg";
import viseme_id_8 from "../../src/visemes/viseme_id_8.svg";
import viseme_id_9 from "../../src/visemes/viseme_id_9.svg";
import viseme_id_10 from "../../src/visemes/viseme_id_10.svg";
import viseme_id_11 from "../../src/visemes/viseme_id_11.svg";
import viseme_id_12 from "../../src/visemes/viseme_id_12.svg";
import viseme_id_13 from "../../src/visemes/viseme_id_13.svg";
import viseme_id_14 from "../../src/visemes/viseme_id_14.svg";
import viseme_id_15 from "../../src/visemes/viseme_id_15.svg";
import viseme_id_16 from "../../src/visemes/viseme_id_16.svg";
import viseme_id_17 from "../../src/visemes/viseme_id_17.svg";
import viseme_id_18 from "../../src/visemes/viseme_id_18.svg";
import viseme_id_19 from "../../src/visemes/viseme_id_19.svg";
import viseme_id_20 from "../../src/visemes/viseme_id_20.svg";
import viseme_id_21 from "../../src/visemes/viseme_id_21.svg";

const config = require("../config.json");

const visemeImages = {
    0: viseme_id_0,
    1: viseme_id_1,
    2: viseme_id_2,
    3: viseme_id_3,
    4: viseme_id_4,
    5: viseme_id_5,
    6: viseme_id_6,
    7: viseme_id_7,
    8: viseme_id_8,
    9: viseme_id_9,
    10: viseme_id_10,
    11: viseme_id_11,
    12: viseme_id_12,
    13: viseme_id_13,
    14: viseme_id_14,
    15: viseme_id_15,
    16: viseme_id_16,
    17: viseme_id_17,
    18: viseme_id_18,
    19: viseme_id_19,
    20: viseme_id_20,
    21: viseme_id_21,
};

const VisemeDisplay = ({ text }) => {
    const [imageIndex, setImageIndex] = useState(0);

    useEffect(() => {
        if (text) {
            handleVisemes(text);
        }
    }, [text]);

    function handleVisemes(text) {
        const speechConfig = sdk.SpeechConfig.fromSubscription(
            config.SpeechKey,
            config.SpeechRegion
        );
        const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();  // Ensure audio plays through the default speakers
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        let visemesArr = [];

        synthesizer.visemeReceived = function (s, e) {
            visemesArr.push(e);
        };

        synthesizer.speakTextAsync(
            text,
            (result) => {
                if (result.errorDetails) {
                    console.error(result.errorDetails);
                } else {
                    visemesArr.forEach((e) => {
                        const duration = e.audioOffset / 10000;
                        setTimeout(() => {
                            setImageIndex(e.visemeId);
                        }, duration);
                    });
                }

                visemesArr = [];
                synthesizer.close();
            },
            (error) => {
                console.error(error);
                visemesArr = [];
                synthesizer.close();
            }
        );
    }

    return (
        <div
            style={{
                position: "relative",
                width: "300px",  // Increased from 150px
                height: "300px", // Increased from 150px
                margin: "0 auto",
            }}
        >
            <img
                src={avatarImage}
                alt="Avatar"
                style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                }}
            />
            <img
                src={visemeImages[imageIndex] || visemeImages[0]}
                alt="Viseme"
                style={{
                    position: "absolute",
                    top: "67%",
                    left: "49.5%",
                    transform: "translate(-50%, -50%)",
                    width: "80px",    // Increased from 40px
                    height: "80px",   // Increased from 40px
                }}
            />
        </div>
    );
};

export default VisemeDisplay;
