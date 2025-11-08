import { useRef, useState } from "react";
import { useSound } from "context/SoundContext";

import Instruction from "components/instruction/Instruction";
import PlayAgain from "components/play-again/PlayAgain";
import Background from "components/background/Background";

import wall from "assets/animals-game/wall.png";
import floor from "assets/animals-game/floor.png";
import Door from "views/animals-game/Door";
import Animal from "views/animals-game/Animal";

import bgDesert from "assets/animals-game/desert.png";
import bgIce from "assets/animals-game/ice.png";
import bgJungle from "assets/animals-game/jungle.png";
import bgSky from "assets/animals-game/sky.png";
import bgOcean from "assets/animals-game/ocean.png";

import penguin from "assets/animals-game/penguin.png";
import penguinHappy from "assets/animals-game/penguin_happy.png";
import penguinSad from "assets/animals-game/penguin_sad.png";

import bird from "assets/animals-game/bird.png";
import birdHappy from "assets/animals-game/bird_happy1.png";
import birdSad from "assets/animals-game/bird_sad.png";

import lion from "assets/animals-game/lion.png";
import lionHappy from "assets/animals-game/lion_happy.png";
import lionSad from "assets/animals-game/lion_sad.png";

import camel from "assets/animals-game/camel.png";
import camelHappy from "assets/animals-game/camel_happy.png";
import camelSad from "assets/animals-game/camel_sad.png";

import fish from "assets/animals-game/fish.png";
import fishHappy from "assets/animals-game/fish_happy.png";
import fishSad from "assets/animals-game/fish_sad.png";

import lionSound from "assets/sounds/lion.mp3";
import camelSound from "assets/sounds/camel.mp3";
import birdSound from "assets/sounds/bird.mp3";
import penguinSound from "assets/sounds/penguin.mp3";
import fishSound from "assets/sounds/fish.mp3";

import failureSound from "assets/sounds/failure.mp3";

const animals = [
  {
    name: "penguin",
    img: penguin,
    happyImg: penguinHappy,
    sadImg: penguinSad,
    correctHabitat: "Ice",
    options: ["Ice", "Desert"],
    sound: penguinSound,
  },
  {
    name: "bird",
    img: bird,
    happyImg: birdHappy,
    sadImg: birdSad,
    correctHabitat: "Sky",
    options: ["Sky", "Ocean"],
    sound: birdSound,
  },
  {
    name: "lion",
    img: lion,
    happyImg: lionHappy,
    sadImg: lionSad,
    correctHabitat: "Jungle",
    options: ["Ice", "Jungle"],
    sound: lionSound,
  },
  {
    name: "camel",
    img: camel,
    happyImg: camelHappy,
    sadImg: camelSad,
    correctHabitat: "Desert",
    options: ["Desert", "Sky"],
    sound: camelSound,
  },
  {
    name: "fish",
    img: fish,
    happyImg: fishHappy,
    sadImg: fishSad,
    correctHabitat: "Ocean",
    options: ["Ocean", "Jungle"],
    sound: fishSound,
  },
];

const playSound = (audioRef) => {
  const sound = audioRef.current;
  sound.currentTime = 0;
  sound.play();
  setTimeout(() => {
    sound.pause();
    audio.currentTime = 0;
  }, 2000);
};

export default function AnimalsGame() {
  const { playPop } = useSound();

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  const [shuffledAnimals, setShuffledAnimals] = useState(() =>
    shuffleArray(animals)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedHabitat, setSelectedHabitat] = useState(null);
  const [isHappy, setIsHappy] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [background, setBackground] = useState("default");
  const [showDoors, setShowDoors] = useState(true);
  const currentAnimal = shuffledAnimals[currentIndex];

  const backgroundProp = background === "default" ? [wall, floor] : background;
  const dimensionsProp = background === "default" ? [80, 20] : undefined;

  const soundRefs = {
    lion: useRef(new Audio(lionSound)),
    camel: useRef(new Audio(camelSound)),
    bird: useRef(new Audio(birdSound)),
    penguin: useRef(new Audio(penguinSound)),
    fish: useRef(new Audio(fishSound)),
    failure: useRef(new Audio(failureSound)),
  };

  const getSignImg = (option) => {
    switch (option) {
      case "Ice":
        return bgIce;
      case "Desert":
        return bgDesert;
      case "Jungle":
        return bgJungle;
      case "Sky":
        return bgSky;
      case "Ocean":
        return bgOcean;
      default:
        return "default";
    }
  };

  const handleChooseHabitat = (habitat) => {
    switch (habitat) {
      case "Ice":
        setBackground(bgIce);
        break;
      case "Desert":
        setBackground(bgDesert);
        break;
      case "Jungle":
        setBackground(bgJungle);
        break;
      case "Sky":
        setBackground(bgSky);
        break;
      case "Ocean":
        setBackground(bgOcean);
        break;
      default:
        setBackground("default");
    }

    if (habitat === currentAnimal.correctHabitat) {
      playSound(soundRefs[currentAnimal.name]);
      setShowDoors(false);
      setIsHappy(true);
      setSelectedHabitat(null);
      setTimeout(() => {
        if (currentIndex < animals.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setIsHappy(false);
          setBackground("default");
          setShowDoors(true);
        } else {
          setGameFinished(true);
        }
      }, 2000);
    } else {
      playSound(soundRefs.failure);
      setShowDoors(false);
      setIsHappy(false);
      setSelectedHabitat(habitat);
      setShowDoors(false);
      setTimeout(() => {
        setShowDoors(true);
        setSelectedHabitat(null);
        setBackground("default");
      }, 2000);
    }
  };

  const handlePlayAgain = () => {
    setShuffledAnimals(shuffleArray(animals));
    setCurrentIndex(0);
    setIsHappy(false);
    setGameFinished(false);
    setBackground("default");
    setShowDoors(true);
  };

  return (
    <Background background={backgroundProp} dimensions={dimensionsProp}>
      <div className="relative z-10 flex flex-col items-center h-full">
        {!gameFinished ? (
          <>
            <Instruction text="Help the animals find their home!" />

            <div className="absolute  bottom-[16vh] flex justify-center items-end">
              {showDoors && (
                <Door
                  habitat={currentAnimal.options[0]}
                  signImg={getSignImg(currentAnimal.options[0])}
                  onClick={() => {
                    playPop();
                    handleChooseHabitat(currentAnimal.options[0]);
                  }}
                />
              )}

              <Animal
                name={currentAnimal.name}
                img={currentAnimal.img}
                happyImg={currentAnimal.happyImg}
                sadImg={currentAnimal.sadImg}
                isHappy={isHappy}
                isSad={!isHappy && selectedHabitat !== null}
              />

              {showDoors && (
                <Door
                  habitat={currentAnimal.options[1]}
                  signImg={getSignImg(currentAnimal.options[1])}
                  onClick={() => {
                    playPop();
                    handleChooseHabitat(currentAnimal.options[1]);
                  }}
                />
              )}
            </div>
          </>
        ) : (
          <PlayAgain
            handlePlayAgain={handlePlayAgain}
            text="You brought all the animals back home!"
          />
        )}
      </div>
    </Background>
  );
}
