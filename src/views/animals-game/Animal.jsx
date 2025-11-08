import styles from "./Animal.module.scss";

export default function Animal({
  name,
  img,
  happyImg,
  sadImg,
  isHappy,
  isSad,
}) {
  let displayedImg = img;
  let stateClass = "";

  if (isHappy) {
    displayedImg = happyImg;
    stateClass = styles[`${name}AnimateHappy`];
  } else if (isSad) {
    displayedImg = sadImg;
    stateClass = styles[`${name}AnimateSad`];
  }

  return (
    <img
      src={displayedImg}
      alt={name}
      className={`${styles.animalImg} ${stateClass}`}
    />
  );
}
