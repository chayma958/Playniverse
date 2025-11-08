import { useEffect } from "react";
import { useVoice } from "context/VoiceContext";
import styles from "./Instruction.module.scss";

export default function Instruction({ text }) {
  const { speak } = useVoice();

  useEffect(() => {
    if (text) {
      speak(text);
    }
  }, [text]);

  return <div className={styles.instruction}>{text}</div>;
}
