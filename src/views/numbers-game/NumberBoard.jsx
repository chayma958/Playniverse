import { useState, useRef, useEffect } from "react";
import NumberInput from "./NumberInput";
import styles from "./NumberBoard.module.scss";
import { useSound } from "context/SoundContext"; 

import goodJob from "assets/sounds/goodjob.mp3";
import UhOh from "assets/sounds/uhoh.mp3";

export default function NumberBoard({ round, handleNext }) {
  const [feedback, setFeedback] = useState("");
  const { soundEnabled } = useSound(); 
  const correctSound = useRef(null);
  const wrongSound = useRef(null);

  useEffect(() => {
    correctSound.current = new Audio(goodJob);
    correctSound.current.preload = "auto";
    wrongSound.current = new Audio(UhOh);
    wrongSound.current.preload = "auto";
  }, []);

  const handleCheck = (inputValue) => {
    const isCorrect = parseInt(inputValue) === round.count;
    setFeedback(isCorrect ? "correct" : "wrong");

    correctSound.current.pause();
    wrongSound.current.pause();
    correctSound.current.currentTime = 0;
    wrongSound.current.currentTime = 0;

    if (soundEnabled) {
      const soundToPlay = isCorrect
        ? correctSound.current
        : wrongSound.current;
      soundToPlay.play().catch(() => {});
    }

    if (isCorrect) {
      setTimeout(() => {
        setFeedback("");
        handleNext();
      }, 1500);
    } else {
      setTimeout(() => setFeedback(""), 1000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sign}>
        {round.instruction} {round.emoji}
      </div>
      <div className={styles.board}>
        <img src={round.img} alt="countable item" />
        <NumberInput onCheck={handleCheck} feedback={feedback} />
      </div>
    </div>
  );
}
