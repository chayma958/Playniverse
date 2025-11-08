import { useState, useEffect } from "react";
import { useSound } from "context/SoundContext";
import styles from "./ItemBar.module.scss";

export default function ItemBar({ usedItems, onDropItem, items }) {
  const { playPop } = useSound();
  const [dragging, setDragging] = useState(false);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [draggedItem, setDraggedItem] = useState(null);

  const handleMouseDown = (e, item) => {
    setDragging(true);
    setDraggedItem(item);
    setDragPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!dragging) return;
    const handleMouseMove = (e) => setDragPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [dragging]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (dragging && draggedItem) {
        playPop();
        setDragging(false);
        onDropItem(draggedItem.name);
        setDraggedItem(null);
      }
    };
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, [dragging, draggedItem, onDropItem]);

  return (
    <>
      <div className={styles.itemBar}>
        {items.map((item) => (
          <div key={item.id} className={styles.itemBox}>
            {!usedItems.includes(item.name) && (
              <img
                src={item.img}
                alt={item.name}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className={`${styles.itemImg} ${
                  dragging && draggedItem?.name === item.name
                    ? styles.dragging
                    : ""
                }`}
                onMouseDown={(e) => handleMouseDown(e, item)}
              />
            )}
          </div>
        ))}
      </div>

      {dragging && draggedItem && (
        <img
          src={draggedItem.img}
          alt={draggedItem.name}
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
