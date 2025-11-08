import { useState, useEffect } from "react";
import Instruction from "components/instruction/Instruction";
import PlayAgain from "components/play-again/PlayAgain";
import Background from "components/background/Background";

import Basket from "views/fruits-vegetables-game/Basket";
import Item from "views/fruits-vegetables-game/Item";

import bg from "assets/fruits-vegetables-game/bg.png";
import basketFruits from "assets/fruits-vegetables-game/fruits_basket.png";
import basketVeggies from "assets/fruits-vegetables-game/vegetables_basket.png";
import apple from "assets/fruits-vegetables-game/apple.png";
import banana from "assets/fruits-vegetables-game/banana.png";
import carrot from "assets/fruits-vegetables-game/carrot.png";
import broccoli from "assets/fruits-vegetables-game/broccoli.png";
import orange from "assets/fruits-vegetables-game/orange.png";
import pepper from "assets/fruits-vegetables-game/pepper.png";
import potato from "assets/fruits-vegetables-game/potato.png";

const originalItems = [
  { name: "apple", img: apple, type: "fruit" },
  { name: "banana", img: banana, type: "fruit" },
  { name: "orange", img: orange, type: "fruit" },
  { name: "pepper", img: pepper, type: "vegetable" },
  { name: "potato", img: potato, type: "vegetable" },
  { name: "carrot", img: carrot, type: "vegetable" },
  { name: "broccoli", img: broccoli, type: "vegetable" },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function FruitsVegetablesGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [shuffledItems, setShuffledItems] = useState(
    shuffleArray(originalItems)
  );
  const [resetAnimation, setResetAnimation] = useState(false);
  const [dropPos, setDropPos] = useState(null);
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [popBasket, setPopBasket] = useState(null);

  const currentItem = shuffledItems[currentIndex];

  useEffect(() => {
    if (!dragging && currentItem) {
      const fruitBasket = document.getElementById("basket-fruit");
      const vegBasket = document.getElementById("basket-vegetable");
      if (!fruitBasket || !vegBasket) return;

      const fruitRect = fruitBasket.getBoundingClientRect();
      const vegRect = vegBasket.getBoundingClientRect();

      const droppedInFruit =
        dragPos.x > fruitRect.left &&
        dragPos.x < fruitRect.right &&
        dragPos.y > fruitRect.top &&
        dragPos.y < fruitRect.bottom;

      const droppedInVeg =
        dragPos.x > vegRect.left &&
        dragPos.x < vegRect.right &&
        dragPos.y > vegRect.top &&
        dragPos.y < vegRect.bottom;

      if (droppedInFruit) handleDrop("fruit");
      else if (droppedInVeg) handleDrop("vegetable");
    }
  }, [dragging]);

  useEffect(() => {
    setDropPos(null);
  }, [currentIndex]);

  const handleDrop = (basketType) => {
    const itemType = currentItem.type;

    if (itemType === basketType) {
      setIsCorrect(true);
      setPopBasket(basketType);
      if (currentIndex < shuffledItems.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        setGameFinished(true);
      }
      setTimeout(() => setPopBasket(null), 400);
      setIsCorrect(null);
    } else {
      setIsCorrect(false);
      setResetAnimation(false);
      setTimeout(() => {
        setIsCorrect(null);
      }, 1000);
    }
  };

  const handlePlayAgain = () => {
    setCurrentIndex(0);
    setIsCorrect(null);
    setGameFinished(false);
    setResetAnimation(false);
    setShuffledItems(shuffleArray(originalItems));
  };

  return (
    <Background background={bg}>
      {!gameFinished ? (
        <>
          <Instruction text="Drag each item to the correct basket!" />

          <div className="flex-grow flex justify-center items-center">
            {currentItem && (
              <Item
                img={currentItem.img}
                isCurrent={true}
                dragging={dragging}
                setDragging={setDragging}
                dragPos={dragPos}
                setDragPos={setDragPos}
                resetAnimation={resetAnimation}
                dropPos={dropPos}
              />
            )}
          </div>

          <div className="absolute bottom-[5vh] w-full flex justify-between px-[16vw] gap-10">
            <Basket
              id="basket-fruit"
              label="fruits"
              img={basketFruits}
              showX={isCorrect === false && currentItem?.type === "vegetable"}
              pop={popBasket === "fruit"}
            />
            <Basket
              id="basket-vegetable"
              label="vegetables"
              img={basketVeggies}
              showX={isCorrect === false && currentItem?.type === "fruit"}
              pop={popBasket === "vegetable"}
            />
          </div>
        </>
      ) : (
        <PlayAgain
          handlePlayAgain={handlePlayAgain}
          text="You sorted them all!"
        />
      )}
    </Background>
  );
}
