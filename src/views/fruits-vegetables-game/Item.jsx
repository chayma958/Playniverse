import { useEffect } from "react";
import { useSound } from "context/SoundContext";
import styles from "./Item.module.scss";

export default function Item({
  img,
  isCurrent = false,
  dragPos,
  dragging,
  setDragging,
  setDragPos,
  resetAnimation,
  hide = false,
}) {
  if (hide) return null;
  const { playPop } = useSound();
  const getItemStyle = () => {
    if (dragging) {
      return {
        position: "fixed",
        left: dragPos.x - 40,
        top: dragPos.y - 40,
        zIndex: 9999,
        pointerEvents: "none",
        transition: "none",
      };
    }

    return {
      animation: isCurrent
        ? !resetAnimation
          ? `${styles.popUp} 0.5s ease`
          : `${styles.reset} 0.5s ease`
        : undefined,
    };
  };

  useEffect(() => {
    if (!dragging) return;
    playPop();
    const handleMouseMove = (e) => {
      setDragPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <img
      src={img}
      alt="item"
      className={styles.item}
      style={getItemStyle()}
      onMouseDown={(e) => {
        if (!isCurrent) return;
        setDragging(true);
        setDragPos({ x: e.clientX, y: e.clientY });
        e.target.style.cursor = "grabbing";
      }}
      onMouseUp={(e) => {
        setDragging(false);
        e.target.style.cursor = "pointer";
      }}
    />
  );
}
