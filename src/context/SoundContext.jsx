import { createContext, useContext, useState, useRef } from "react";
import popSoundFile from "assets/sounds/pop.wav";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const popSoundRef = useRef(new Audio(popSoundFile));

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  const playPop = () => {
    if (soundEnabled) {
      const sound = popSoundRef.current.cloneNode();
      sound.play().catch(() => {});
    }
  };

  const playPopImmediate = () => {
    const sound = popSoundRef.current.cloneNode();
    sound.play().catch(() => {});
  };

  return (
    <SoundContext.Provider
      value={{ soundEnabled, toggleSound, playPop, playPopImmediate }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
