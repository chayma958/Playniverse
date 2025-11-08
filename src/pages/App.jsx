import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import MenuButtons from "components/menu-buttons/MenuButtons";
import FamilyGame from "./FamilyGame";
import AnimalsGame from "./AnimalsGame";
import ColorsGame from "./ColorsGame";
import FruitsVegetablesGame from "./FruitsVegetablesGame";
import NumbersGame from "./NumbersGame";
const App = () => {
  return (
    <Router>
      <MenuButtons />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/family-game" element={<FamilyGame />} />
        <Route path="/animals-game" element={<AnimalsGame />} />
        <Route path="/colors-game" element={<ColorsGame />} />
        <Route path="/fruits-vegetables-game" element={<FruitsVegetablesGame />} />
        <Route path="/numbers-game" element={<NumbersGame />} />
      </Routes>
    </Router>
  );
};

export default App;
