import styles from "./Wizard.module.scss";
import wizard from "assets/colors-game/wizard.png";
import wizardHappy from "assets/colors-game/wizard_happy.png";
import wizardAngry from "assets/colors-game/wizard_angry.png";
import bubble from "assets/colors-game/bubble.png";

export default function Wizard({ wizardMood, desiredColor, colorImages }) {
  const getWizardImg = () => {
    if (wizardMood === "happy") return wizardHappy;
    if (wizardMood === "angry") return wizardAngry;
    return wizard;
  };

  return (
    <div className={styles.container}>
      <img
        src={getWizardImg()}
        alt="Wizard"
        className={styles.wizard}
        draggable="false"
      />

      <div className={styles.bubbleContainer}>
        <img
          src={bubble}
          alt="Bubble"
          className={styles.bubble}
          draggable="false"
        />
        {desiredColor && (
          <img
            src={colorImages[desiredColor]}
            alt={desiredColor}
            className={styles.desiredColor}
            draggable="false"
          />
        )}
      </div>
    </div>
  );
}
