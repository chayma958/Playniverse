import { useState, useEffect } from "react";
import { useVoice } from "context/VoiceContext";

import CharacterArea from "views/family-game/CharacterArea";
import ItemBar from "views/family-game/ItemBar";
import Instruction from "../components/instruction/Instruction";
import PlayAgain from "../components/play-again/PlayAgain";
import Background from "components/background/Background";
import bgImg from "assets/family-game/background.jpg";

import tieImg from "assets/family-game/tie.png";
import dollImg from "assets/family-game/doll.png";
import bottleImg from "assets/family-game/bottle.png";
import knittingImg from "assets/family-game/knitting.png";
import glassesImg from "assets/family-game/glasses.png";
import purseImg from "assets/family-game/purse.png";

const familyMembers = [
  {
    id: 1,
    name: "dad",
    correctItem: "tie",
    greetings: "Hi! I'm the father.",
    successText: "Now I can go to work!",
    img: tieImg,
  },
  {
    id: 2,
    name: "mom",
    correctItem: "purse",
    greetings: "Hi! I'm the mother.",
    successText: "Now I can go shopping!",
    img: purseImg,
  },
  {
    id: 3,
    name: "sister",
    correctItem: "doll",
    greetings: "Hi! I'm the sister.",
    successText: "Now I can play!",
    img: dollImg,
  },
  {
    id: 4,
    name: "baby",
    correctItem: "bottle",
    greetings: "Goo goo! I'm the brother!",
    successText: "Yum yum!",
    img: bottleImg,
  },
  {
    id: 5,
    name: "grandma",
    correctItem: "knitting",
    greetings: "Hello dear, I'm the grandma.",
    successText: "Now I can knit a sweater!",
    img: knittingImg,
  },
  {
    id: 6,
    name: "grandpa",
    correctItem: "glasses",
    greetings: "Hey there! I'm the grandpa.",
    successText: "Now I can read the newspaper!",
    img: glassesImg,
  },
];

const originalItems = [
  { id: 1, name: "tie", img: tieImg },
  { id: 2, name: "doll", img: dollImg },
  { id: 3, name: "bottle", img: bottleImg },
  { id: 4, name: "knitting", img: knittingImg },
  { id: 5, name: "glasses", img: glassesImg },
  { id: 6, name: "purse", img: purseImg },
];

const shuffleItems = (arr) => {
  return arr
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
};
export default function FamilyGame() {
  const { speak, stop } = useVoice();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isHappy, setIsHappy] = useState(false);
  const [usedItems, setUsedItems] = useState([]);
  const [showFirstCharacter, setShowFirstCharacter] = useState(false);

  const [shuffledItems, setShuffledItems] = useState(
    shuffleItems(originalItems)
  );
  const [gameFinished, setGameFinished] = useState(false);

  const currentCharacter = familyMembers[currentIndex];

  useEffect(() => {
    if (currentIndex === 0) {
      setShowFirstCharacter(false);
      const timeout = setTimeout(() => setShowFirstCharacter(true), 3000);
      return () => clearTimeout(timeout);
    } else {
      setShowFirstCharacter(true);
    }
  }, [currentIndex]);

  useEffect(() => {
    speak(feedback, currentCharacter.name);
  }, [feedback, currentCharacter]);

  useEffect(() => {
    if (currentIndex === 0) {
      const timeout = setTimeout(
        () => speak(currentCharacter.greetings, currentCharacter.name),
        3000
      );
      return () => {
        clearTimeout(timeout);
        stop();
      };
    } else {
      speak(currentCharacter.greetings, currentCharacter.name);
    }
  }, [currentCharacter]);

  const handleDropItem = (itemName) => {
    if (itemName === currentCharacter.correctItem) {
      setFeedback(currentCharacter.successText);
      setIsHappy(true);
      setUsedItems((prev) => [...prev, itemName]);
      setTimeout(() => {
        if (currentIndex < familyMembers.length - 1) {
          setCurrentIndex((prev) => prev + 1);
          setFeedback("");
          setIsHappy(false);
        } else {
          setTimeout(() => setGameFinished(true), 1500);
        }
      }, 2000);
    } else {
      setFeedback("Try again!");
      setTimeout(() => setFeedback(""), 1500);
    }
  };

  const handlePlayAgain = () => {
    setUsedItems([]);
    setCurrentIndex(0);
    setShuffledItems(shuffleItems(originalItems));
    setFeedback("");
    setIsHappy(false);
    setGameFinished(false);
    setShowFirstCharacter(false);
  };

  return (
    <Background background={bgImg}>
      {!gameFinished ? (
        <>
          <Instruction text="Help the family find what they need!" />
          {showFirstCharacter && (
            <CharacterArea
              key={currentIndex}
              character={currentCharacter}
              feedback={feedback}
              isHappy={isHappy}
            />
          )}

          <ItemBar
            usedItems={usedItems}
            onDropItem={handleDropItem}
            items={shuffledItems}
          />
        </>
      ) : (
        <PlayAgain
          handlePlayAgain={handlePlayAgain}
          text="You helped everyone find what they need!"
        />
      )}
    </Background>
  );
}
