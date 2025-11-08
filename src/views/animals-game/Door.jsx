import styles from "./Door.module.scss";
import doorImg from "assets/animals-game/door.png";

export default function Door({ habitat, signImg, onClick }) {
  return (
    <div className={styles.doorContainer} onClick={onClick}>
      <img src={signImg} alt={habitat} className={styles.signImg} />
      <img src={doorImg} alt="Door" className={styles.doorImg} />
    </div>
  );
}
