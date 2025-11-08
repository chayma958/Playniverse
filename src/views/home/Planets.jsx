import { useNavigate } from "react-router-dom";
import { useSound } from "context/SoundContext";

import styles from "./Planets.module.scss";

import planet1 from "assets/home-page/home_planet.png";
import planet2 from "assets/home-page/market_planet.png";
import planet3 from "assets/home-page/animals_planet.png";
import planet4 from "assets/home-page/numbers_planet.png";
import planet5 from "assets/home-page/colors-planet.png";

const planets = [
  { src: planet1, top: "10%", left: "12%", link: "/family-game" },
  { src: planet2, top: "25%", left: "72%", link: "/fruits-vegetables-game" },
  { src: planet3, top: "60%", left: "10%", link: "/animals-game" },
  { src: planet5, top: "65%", left: "60%", link: "/colors-game" },
  { src: planet4, top: "40%", left: "38%", link: "/numbers-game" },
];

export default function Planets() {
  const navigate = useNavigate();
  const { playPop } = useSound();

  return (
    <>
      {planets.map((planet, i) => (
        <div
          key={i}
          className={`${styles.planetWrapper} ${
            i === 0 ? styles.firstPlanet : ""
          }`}
          style={{ top: planet.top, left: planet.left }}
        >
          <img
            src={planet.src}
            alt={`Planet ${i + 1}`}
            className={styles.planet}
            onClick={() => {
              navigate(planet.link);
              playPop();
            }}
          />
        </div>
      ))}
    </>
  );
}
