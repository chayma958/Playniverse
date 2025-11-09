import { createContext, useContext, useState, useRef, useEffect } from "react";
import popSoundFile from "assets/sounds/pop.wav";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const popSoundRef = useRef(new Audio(popSoundFile));

  const activeSoundsRef = useRef([]);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const newValue = !prev;
      if (!newValue) {
        activeSoundsRef.current.forEach((audio) => {
          audio.pause();
          audio.currentTime = 0;
        });
        activeSoundsRef.current = [];
      }

      return newValue;
    });
  };

  const playSound = (file) => {
    if (!soundEnabled) return; 
    const audio = new Audio(file);
    activeSoundsRef.current.push(audio);
    audio.addEventListener("ended", () => {
      activeSoundsRef.current = activeSoundsRef.current.filter((a) => a !== audio);
    });

    audio.play().catch(() => {});
  };

  const playPop = () => playSound(popSoundFile);

  useEffect(() => {
    return () => {
      activeSoundsRef.current.forEach((a) => a.pause());
      activeSoundsRef.current = [];
    };
  }, []);

  return (
    <SoundContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        playPop,
        playSound, 
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);
