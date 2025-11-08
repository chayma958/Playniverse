import styles from "./SpeechBubble.module.scss";

export default function SpeechBubble({ text }) {
  return <div className={styles.bubble}>{text}</div>;
}
