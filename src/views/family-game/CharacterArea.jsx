import styles from "./CharacterArea.module.scss";
import SpeechBubble from "components/speech-bubble/SpeechBubble";

import dadImg from "assets/family-game/dad.png";
import momImg from "assets/family-game/mom.png";
import babyImg from "assets/family-game/baby.png";
import sisterImg from "assets/family-game/sister.png";
import grandmaImg from "assets/family-game/grandma.png";
import grandpaImg from "assets/family-game/grandpa.png";

import dadAfter from "assets/family-game/dad_after.png";
import momAfter from "assets/family-game/mom_after.png";
import babyAfter from "assets/family-game/baby_after.png";
import sisterAfter from "assets/family-game/sister_after.png";
import grandmaAfter from "assets/family-game/grandma_after.png";
import grandpaAfter from "assets/family-game/grandpa_after.png";

const images = {
  dad: dadImg,
  mom: momImg,
  baby: babyImg,
  sister: sisterImg,
  grandma: grandmaImg,
  grandpa: grandpaImg,
};
const afterImages = {
  dad: dadAfter,
  mom: momAfter,
  baby: babyAfter,
  sister: sisterAfter,
  grandma: grandmaAfter,
  grandpa: grandpaAfter,
};

export default function CharacterArea({
  character,
  feedback,
  isHappy,
  handleDropItem,
}) {
  const imageSrc = isHappy
    ? afterImages[character.name]
    : images[character.name];
  const bubbleText = feedback || character.greetings;

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("itemName");
    handleDropItem(draggedItem);
  };

  return (
    <div
      className={styles.characterArea}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <div className={styles[`${character.name}SpeechBubble`]}>
        <SpeechBubble text={bubbleText} />
      </div>
      <img
        src={imageSrc}
        alt={character.name}
        className={styles[character.name]}
      />
    </div>
  );
}
