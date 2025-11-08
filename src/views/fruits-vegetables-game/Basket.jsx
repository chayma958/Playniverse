import { useEffect, useState, useRef } from "react";
import styles from "./Basket.module.scss";
import correctSrc from "assets/sounds/correct.mp3";
import wrongSrc from "assets/sounds/wrong.mp3";
export default function Basket({ id, label, img, showX, pop }) {
  const [isPopping, setIsPopping] = useState(false);
  const correctSound = useRef(null);
  const wrongSound = useRef(null);

  useEffect(() => {
    correctSound.current = new Audio(correctSrc);
    correctSound.current.preload = "auto";
    wrongSound.current = new Audio(wrongSrc);
    wrongSound.current.preload = "auto";
  }, []);

  useEffect(() => {
    if (pop) {
      correctSound.current.currentTime = 0;
      correctSound.current.play().catch((e) => console.warn(e));
      setIsPopping(false);
      const timer = setTimeout(() => setIsPopping(true), 10);
      const clearTimer = setTimeout(() => setIsPopping(false), 510);
      return () => {
        clearTimeout(timer);
        clearTimeout(clearTimer);
      };
    }
  }, [pop]);

  useEffect(() => {
    if (showX) {
      wrongSound.current.currentTime = 0;
      wrongSound.current.play().catch((e) => console.warn(e));
    }
  }, [showX]);
  return (
    <div
      className={`${styles.basketWrapper} ${
        isPopping ? styles["basket-pop"] : ""
      }`}
      id={id}
    >
      <img src={img} alt={label} className={styles.basketImg} />
      {showX && <div className={styles.redX}>✖</div>}
    </div>
  );
}
