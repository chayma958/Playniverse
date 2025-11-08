import Stars from "views/home/Stars";
import Title from "views/home/Title";
import Alien from "views/home/Alien";
import Planets from "views/home/Planets";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[radial-gradient(circle_at_50%_50%,#0d0d2b,#000033_70%,#000000_100%)]">
      <Stars />
      <Title />
      <Alien />
      <Planets />
    </div>
  );
}
