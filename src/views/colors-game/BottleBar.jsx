import { useState, useEffect } from "react";
import styles from "./BottleBar.module.scss";
import red from "assets/colors-game/red.png";
import yellow from "assets/colors-game/yellow.png";
import blue from "assets/colors-game/blue.png";
import black from "assets/colors-game/black.png";
import white from "assets/colors-game/white.png";

const bottles = { red, yellow, blue, black, white };

export default function BottleBar({
  usedBottles,
  onDrop,
  cauldronRef,
  playPop,
}) {
  const [dragging, setDragging] = useState(false);
  const [draggedBottle, setDraggedBottle] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e, color) => {
    playPop?.();
    setDragging(true);
    setDraggedBottle(color);
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e) => setDragPos({ x: e.clientX, y: e.clientY });

    const handleMouseUp = (e) => {
      setDragging(false);
      if (!draggedBottle) return;

      const rect = cauldronRef.current?.getBoundingClientRect();
      if (
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        onDrop(draggedBottle);
      }

      setDraggedBottle(null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, draggedBottle, cauldronRef, onDrop]);

  return (
    <>
      <div className={styles.bar}>
        {Object.keys(bottles).map((color) => (
          <div key={color} className={styles.bottleContainer}>
            {!usedBottles.includes(color) && (
              <img
                src={bottles[color]}
                alt={color}
                draggable={false}
                className={styles.bottle}
                onMouseDown={(e) => handleMouseDown(e, color)}
              />
            )}
          </div>
        ))}
      </div>

      {dragging && draggedBottle && (
        <img
          src={bottles[draggedBottle]}
          alt={draggedBottle}
          className={styles.draggingPreview}
          style={{
            left: dragPos.x - 40 + "px",
            top: dragPos.y - 40 + "px",
          }}
        />
      )}
    </>
  );
}
