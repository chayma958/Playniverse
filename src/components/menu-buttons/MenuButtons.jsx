import styles from "./MenuButtons.module.scss";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSound } from "context/SoundContext";

import homeIcon from "assets/icons/home.png";
import musicIcon from "assets/icons/unmute.png";
import muteMusicIcon from "assets/icons/mute.png";
import soundIcon from "assets/icons/sound_on.png";
import muteSoundIcon from "assets/icons/sound_off.png";

import bgMusicFile from "assets/sounds/music.mp3";

export default function MenuButtons() {
  const navigate = useNavigate();
  const [isMusicMuted, setIsMusicMuted] = useState(true);
  const musicRef = useRef(new Audio(bgMusicFile));
  const { soundEnabled, toggleSound, playPop, playPopImmediate } = useSound();

  useEffect(() => {
    const music = musicRef.current;
    music.loop = true;
    music.volume = 0.3;
    if (!isMusicMuted) {
      music.play().catch(() => {});
    } else {
      music.pause();
    }
  }, [isMusicMuted]);

  const toggleMusic = () => {
    setIsMusicMuted((prev) => !prev);
    playPop();
  };

  const handleSoundToggle = () => {
    const newState = !soundEnabled;
    toggleSound();
    if (newState) {
      playPopImmediate();
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.button}
        onClick={() => {
          navigate("/");
          playPop();
        }}
      >
        <img src={homeIcon} alt="Home" />
      </div>

      <div className={styles.button} onClick={toggleMusic}>
        <img src={isMusicMuted ? muteMusicIcon : musicIcon} alt="music" />
      </div>

      <div className={styles.button} onClick={handleSoundToggle}>
        <img src={soundEnabled ? soundIcon : muteSoundIcon} alt="sound" />
      </div>
    </div>
  );
}
