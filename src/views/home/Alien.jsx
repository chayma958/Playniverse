import { useEffect } from "react";
import { useVoice } from "context/VoiceContext";
import styles from "./Alien.module.scss";
import alienImg from "assets/home-page/alien.png";
import SpeechBubble from "components/speech-bubble/SpeechBubble";

export default function Alien() {
  const { speak } = useVoice();

  useEffect(() => {
    speak("Hello, explorer! Ready to play?", "alien");
  }, []);
  return (
    <div className={styles.alienContainer}>
      <img src={alienImg} alt="Alien" className={styles.alien} />
      <div className={styles.speechBubble}>
        <SpeechBubble text="Hello, explorer! Ready to play?" />
      </div>
    </div>
  );
}
