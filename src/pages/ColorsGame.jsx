import { useState, useEffect, useRef } from "react";
import { useSound } from "context/SoundContext";

import Instruction from "components/instruction/Instruction";
import Background from "components/background/Background";
import PlayAgain from "components/play-again/PlayAgain";
import Wizard from "views/colors-game/Wizard";
import Cauldron from "views/colors-game/Cauldron";
import BottleBar from "views/colors-game/BottleBar";
import wall from "assets/colors-game/wall.png";
import floor from "assets/colors-game/floor.png";
import green from "assets/colors-game/green.png";
import orange from "assets/colors-game/orange.png";
import pink from "assets/colors-game/pink.png";
import purple from "assets/colors-game/purple.png";
import gray from "assets/colors-game/gray.png";

export default function ColorsGame() {
  const { playPop } = useSound();
  const cauldronRef = useRef(null);

  const [selectedColors, setSelectedColors] = useState([]);
  const [resultColor, setResultColor] = useState(null);
  const [wizardMood, setWizardMood] = useState("neutral");
  const [gameFinished, setGameFinished] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [completedColors, setCompletedColors] = useState([]);
  const [usedBottles, setUsedBottles] = useState([]);
  const [pouredColor, setPouredColor] = useState(null);

  const mixRules = {
    blue_yellow: "green",
    red_yellow: "orange",
    blue_red: "purple",
    black_white: "gray",
    red_white: "pink",
  };

  const colorImages = { green, orange, pink, purple, gray };
  const targetOptions = Object.values(mixRules);

  useEffect(() => {
    const remainingTargets = targetOptions.filter(
      (color) => !completedColors.includes(color)
    );
    if (remainingTargets.length === 0) {
      setGameFinished(true);
    } else {
      setTimeout(() => {
        setCurrentTarget(
          remainingTargets[Math.floor(Math.random() * remainingTargets.length)]
        );
      }, 2000);
    }
  }, [completedColors]);

  const handleDrop = (color) => {
    playPop();
    setPouredColor(color);

    const newSelection = [...selectedColors, color];
    const newUsedBottles = [...usedBottles, color];
    setSelectedColors(newSelection);
    setUsedBottles(newUsedBottles);

    setTimeout(() => setPouredColor(null), 800);

    if (newSelection.length === 2) {
      const key = [newSelection[0], newSelection[1]].sort().join("_");
      const result = mixRules[key];

      const isCorrect = result === currentTarget;

      setTimeout(() => {
        if (isCorrect) {
          setResultColor(result);
          setWizardMood("happy");
        } else {
          setResultColor("wrong");
          setWizardMood("angry");
        }
      }, 800);

      setTimeout(
        () => {
          if (isCorrect) {
            setCompletedColors([...completedColors, result]);
          }
          const moodResetDelay = isCorrect ? 2000 : 800;
          setTimeout(() => {
            setSelectedColors([]);
            setUsedBottles([]);
            setWizardMood("neutral");
            setResultColor(null);
          }, moodResetDelay);
        },
        isCorrect ? 2000 : 800
      );
    }
  };

  const handlePlayAgain = () => {
    setSelectedColors([]);
    setUsedBottles([]);
    setWizardMood("neutral");
    setResultColor(null);
    setGameFinished(false);
    setCompletedColors([]);
    setCurrentTarget(
      targetOptions[Math.floor(Math.random() * targetOptions.length)]
    );
  };

  return (
    <Background background={[wall, floor]} dimensions={[60, 40]}>
      {!gameFinished ? (
        <>
          <Instruction text="Help the wizard mix the right potion!" />

          <div className="flex justify-center items-center flex-1">
            <Wizard
              wizardMood={wizardMood}
              desiredColor={currentTarget}
              colorImages={colorImages}
            />
            <Cauldron
              ref={cauldronRef}
              resultColor={resultColor}
              colorImages={colorImages}
              pouredColor={pouredColor}
            />
          </div>

          <BottleBar
            usedBottles={usedBottles}
            onDrop={handleDrop}
            cauldronRef={cauldronRef}
            playPop={() => {}}
          />
        </>
      ) : (
        <PlayAgain
          handlePlayAgain={handlePlayAgain}
          text="All potions mastered!"
        />
      )}
    </Background>
  );
}
