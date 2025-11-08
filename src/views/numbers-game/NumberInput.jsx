import { useState } from "react";
import { useSound } from "context/SoundContext";
import styles from "./NumberInput.module.scss";

export default function NumberInput({ onCheck, feedback }) {
  const { playPop } = useSound();
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      onCheck(value);
      setTimeout(() => {
        setValue("");
      }, 1500);
    }
  };

  let inputClass = styles.inputField;
  if (feedback === "correct") inputClass += ` ${styles.correct}`;
  if (feedback === "wrong") inputClass += ` ${styles.wrong}`;

  return (
    <form onSubmit={handleSubmit} className={styles.inputWrapper}>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={inputClass}
        placeholder="?"
        min={1}
        max={10}
      />
      <button
        type="submit"
        className={styles.submitButton}
        disabled={value.trim() === ""}
        onClick={playPop}
      >
        Check
      </button>
    </form>
  );
}
