import { useEffect, useState, forwardRef, useRef } from "react";
import styles from "./Cauldron.module.scss";

import cauldron1 from "assets/colors-game/cauldron1.png";
import cauldron2 from "assets/colors-game/cauldron2.png";
import explosionImg from "assets/colors-game/explosion.png";
import redPoured from "assets/colors-game/red_poured.png";
import yellowPoured from "assets/colors-game/yellow_poured.png";
import bluePoured from "assets/colors-game/blue_poured.png";
import blackPoured from "assets/colors-game/black_poured.png";
import whitePoured from "assets/colors-game/white_poured.png";

import successSound from "assets/sounds/magic.mp3";
import wrongSound from "assets/sounds/explosionsound.mp3";

const pouredImages = {
  red: redPoured,
  yellow: yellowPoured,
  blue: bluePoured,
  black: blackPoured,
  white: whitePoured,
};

const Cauldron = forwardRef(
  ({ resultColor, colorImages, pouredColor }, ref) => {
    const [isExploding, setIsExploding] = useState(false);
    const [floating, setFloating] = useState(false);
    const [currentImg, setCurrentImg] = useState(cauldron1);
    const [floatingColor, setFloatingColor] = useState(null);

    const successAudioRef = useRef(new Audio(successSound));
    const wrongAudioRef = useRef(new Audio(wrongSound));

    useEffect(() => {
      const flicker = setInterval(() => {
        setCurrentImg((prev) => (prev === cauldron1 ? cauldron2 : cauldron1));
      }, 500);
      return () => clearInterval(flicker);
    }, []);

    useEffect(() => {
      if (!resultColor) return;

      if (resultColor === "wrong") {
        wrongAudioRef.current.currentTime = 0;
        wrongAudioRef.current.play();
        setIsExploding(true);
        setTimeout(() => setIsExploding(false), 800);
      } else {
        successAudioRef.current.currentTime = 0;
        successAudioRef.current.play();
        setFloating(true);
        setFloatingColor(resultColor);
        setTimeout(() => {
          setFloating(false);
          setFloatingColor(null);
        }, 3000);
      }
    }, [resultColor]);

    return (
      <div ref={ref} className={styles.container}>
        {isExploding && (
          <img
            src={explosionImg}
            alt="Explosion"
            className={styles.explosion}
            draggable={false}
          />
        )}

        {!isExploding && !floating && (
          <>
            <img
              src={currentImg}
              alt="Cauldron"
              className={styles.cauldron}
              draggable={false}
            />
            {pouredColor && (
              <img
                src={pouredImages[pouredColor]}
                alt={`${pouredColor} poured`}
                className={styles.poured}
                draggable={false}
              />
            )}
          </>
        )}

        {floating && floatingColor && (
          <img
            src={colorImages[floatingColor]}
            alt={`${floatingColor} bottle`}
            className={styles.float}
            draggable={false}
          />
        )}
      </div>
    );
  }
);

export default Cauldron;
