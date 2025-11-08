import { useEffect } from "react";
import { useSound } from "context/SoundContext";
import { useVoice } from "context/VoiceContext";
import styles from "./PlayAgain.module.scss";

export default function PlayAgain({ handlePlayAgain, text }) {
  const { playPop } = useSound();
  const { speak } = useVoice();

  useEffect(() => {
    if (text) speak(`Great job! ${text}`);
  }, [text]);
  return (
    <div
      className={`${styles.container} flex flex-col items-center justify-center text-center`}
    >
      <div className={styles.card}>
        <h2 className="whitespace-nowrap overflow-hidden text-ellipsis text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 drop-shadow-md">
          🌟 Great job! 🎉
        </h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 mb-8 font-medium">
          {text}
        </p>
        <button
          onClick={() => {
            playPop();
            handlePlayAgain();
          }}
          className={styles.playButton}
        >
          Play Again
        </button>
      </div>
    </div>
  );
}
