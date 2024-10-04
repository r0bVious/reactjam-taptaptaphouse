import { useState } from "react";
import GameplayZone from "./BarElements/GameplayZone";
import Tap from "./Tap";

const GameRow = () => {
  const [drinks, setDrinks] = useState<
    { id: string; position: number; metCust: boolean; returning: boolean }[]
  >([]);
  const [barWidth, setBarWidth] = useState(0);

  const throwDrink = () => {
    const newDrinkID = "drink_" + Date.now();

    setDrinks((prev) => [
      ...(prev || []),
      {
        id: newDrinkID,
        position: barWidth - 25,
        metCust: false,
        returning: false,
      },
    ]);
  };

  return (
    <>
      <div className="gameplay-row">
        <GameplayZone
          drinks={drinks}
          setBarWidth={setBarWidth}
          setDrinks={setDrinks}
        />
        <Tap throwDrink={throwDrink} />
      </div>
    </>
  );
};

export default GameRow;
