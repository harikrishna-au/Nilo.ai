# 🤖 Nilo AI – Human-like AI Avatar Platform

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Built With](https://img.shields.io/badge/Built%20with-React%2C%20Node%2C%20Gemini-blue)

> Your smart AI avatar – multilingual, real-time, and always ready to talk.

---

## 🌐 About the Project

**Nilo AI** is a real-time, multilingual avatar platform that brings **human-like conversations** to life using voice and text. Whether it’s customer support, virtual onboarding, or smart education, Nilo AI offers 24/7 intelligent, emotionally-aware interactions that reduce costs and boost productivity.

![Demo Preview](https://github.com/harikrishna-au/Nilo.ai/assets/your-gif-or-image-link.gif)

---

## 🚀 Live Demo

🔗 [Try the Live Demo](https://niloai.onrender.com/)  
🎤 Use voice or text input, see the avatar lip-sync in real-time, and receive intelligent responses.

---

## 🙋‍♂️ My Contribution

I developed the interactive frontend using **React**, including the real-time **lip-sync animation system** with Microsoft's Speech SDK and **viseme mapping**.  
I integrated the **Gemini API** for generating lifelike conversational responses and implemented the **emotion-aware** expression engine.  
I also designed the modular architecture to support multilingual input and future API extensibility.

---

## 🧠 Features

- 🎙️ Voice & Text Input
- 🌍 Multilingual Support
- 👄 Lip-Synced Avatar Animations
- 🧠 Emotion-aware Responses
- 🔌 Task Execution via APIs
- 🧱 Scalable and Modular Codebase

---

## 🛠️ Tech Stack

**Frontend**
- React.js
- Viseme JS for lip animations
- Canva, Photoshop, Ezgif (avatar design)

**Backend**
- Node.js
- Google Gemini API (LLM)
- Microsoft Cognitive Services Speech SDK
- Web Speech API

**AI Models**
| Feature            | Tool/Model                    |
|--------------------|-------------------------------|
| Text Generation    | `gemini-2.0-flash`            |
| Lip Sync Animation | Google TTS + Viseme Mapping  |
| Voice Recognition  | Web Speech API, MS SDK       |
| Emotion Detection  | Custom JS-based Engine       |

---

## ⚙️ How It Works

1. User inputs voice or text  
2. Gemini API generates a contextual response  
3. The response is converted to speech using Microsoft's TTS engine  
4. The Speech SDK emits viseme IDs mapped to mouth shapes  
5. The avatar’s lips animate in real time to match spoken content

---

## 📦 Installation

### 🔧 Prerequisites

- Node.js installed
- API keys for:
  - Microsoft Cognitive Services (Speech Key & Region)
  - Gemini API (optional)

### 📥 Steps

1. Clone the repository

```bash
git clone https://github.com/harikrishna-au/Nilo.ai.git
cd Nilo.ai
