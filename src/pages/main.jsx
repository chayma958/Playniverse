import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { SoundProvider } from "context/SoundContext";
import { VoiceProvider } from "context/VoiceContext";
import "../styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SoundProvider>
      <VoiceProvider>
        <App />
      </VoiceProvider>
    </SoundProvider>
  </StrictMode>
);
