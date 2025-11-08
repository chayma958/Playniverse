import styles from "./Title.module.scss";
import titleImg from "assets/home-page/game_title.png";

export default function Title() {
  return (
    <img src={titleImg} alt="Playniverse Title" className={styles.title} />
  );
}
