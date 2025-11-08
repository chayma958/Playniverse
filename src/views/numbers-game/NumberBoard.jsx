import { useState, useRef } from "react";
import NumberInput from "./NumberInput";
import styles from "./NumberBoard.module.scss";

import goodJob from "assets/sounds/goodjob.mp3";
import UhOh from "assets/sounds/uhoh.mp3";

export default function NumberBoard({ round, handleNext }) {
  const [feedback, setFeedback] = useState("");
  const correctSound = useRef(new Audio(goodJob));
  const wrongSound = useRef(new Audio(UhOh));

  const handleCheck = (inputValue) => {
    if (parseInt(inputValue) === round.count) {
      setFeedback("correct");
      correctSound.current.currentTime = 0;
      correctSound.current.play();

      setTimeout(() => {
        setFeedback("");
        handleNext();
      }, 1500);
    } else {
      setFeedback("wrong");
      wrongSound.current.currentTime = 0;
      wrongSound.current.play();

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
