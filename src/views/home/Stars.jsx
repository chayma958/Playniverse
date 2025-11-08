import styles from "./Stars.module.scss";

export default function Stars() {
  const stars = Array.from({ length: 50 });

  return (
    <>
      {stars.map((_, i) => (
        <div
          key={i}
          className={styles.star}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
            animationDuration: `${1 + Math.random() * 2}s`,
          }}
        />
      ))}
    </>
  );
}
