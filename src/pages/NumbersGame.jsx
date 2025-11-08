import { useState, useEffect } from "react";
import Instruction from "components/instruction/Instruction";
import PlayAgain from "components/play-again/PlayAgain";
import Background from "components/background/Background";
import NumberBoard from "views/numbers-game/NumberBoard";
import { useVoice } from "context/VoiceContext";

import fish from "assets/numbers-game/fish.png";
import pizza from "assets/numbers-game/pizza.png";
import apples from "assets/numbers-game/apples.png";
import candles from "assets/numbers-game/candles.png";
import rainbow from "assets/numbers-game/rainbow.png";
import flowers from "assets/numbers-game/flowers.png";
import bgImg from "assets/numbers-game/bg.png";

export default function NumberGame() {
  const { speak, stop } = useVoice();
  const [rounds, setRounds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [showRound, setShowRound] = useState(false);

  const allRounds = [
    { id: 1, img: fish, count: 2, instruction: "Count the fish!", emoji: "🐠" },
    {
      id: 2,
      img: pizza,
      count: 5,
      instruction: "Count the pizza slices!",
      emoji: "🍕",
    },
    {
      id: 3,
      img: apples,
      count: 4,
      instruction: "Count the apples!",
      emoji: "🍎",
    },
    {
      id: 4,
      img: candles,
      count: 10,
      instruction: "Count the candles!",
      emoji: "🕯️",
    },
    {
      id: 5,
      img: rainbow,
      count: 7,
      instruction: "Count the colors!",
      emoji: "🌈",
    },
    {
      id: 6,
      img: flowers,
      count: 8,
      instruction: "Count the flowers!",
      emoji: "🌼",
    },
  ];

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const shuffled = shuffleArray(allRounds);
    setRounds(shuffled);
  }, []);

  useEffect(() => {
    if (rounds.length > 0 && !gameFinished) {
      setShowRound(false);
      const timer = setTimeout(() => setShowRound(true), 3000);
      return () => clearTimeout(timer);
    }
  }, [rounds, gameFinished]);

  useEffect(() => {
    if (!rounds.length || gameFinished || !showRound) return;

    stop();
    const timer = setTimeout(() => {
      const currentInstruction = rounds[currentIndex].instruction;
      speak(currentInstruction, "dad");
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex, rounds, gameFinished, showRound, speak, stop]);

  const handleNext = () => {
    if (currentIndex < rounds.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGameFinished(true);
      stop();
    }
  };

  const handlePlayAgain = () => {
    setRounds(shuffleArray(allRounds));
    setCurrentIndex(0);
    setGameFinished(false);
    stop();
  };

  if (rounds.length === 0) return null;

  return (
    <Background background={bgImg}>
      {!gameFinished ? (
        <>
          <Instruction text="Count the items and type the correct number!" />
          {showRound && (
            <NumberBoard round={rounds[currentIndex]} handleNext={handleNext} />
          )}
        </>
      ) : (
        <PlayAgain
          handlePlayAgain={handlePlayAgain}
          text="You counted all the items!"
        />
      )}
    </Background>
  );
}
