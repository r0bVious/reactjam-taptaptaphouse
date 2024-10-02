import { useState } from "react";
import GameplayZone from "./BarElements/GameplayZone";
import Tap from "./Tap";

const GameRow = () => {
  // const [drink, setDrink] = useState<{
  //   id: string;
  //   position: number;
  //   metCust: boolean;
  //   returning: boolean;
  // } | null>(null);
  const [drinks, setDrinks] = useState<
    { id: string; position: number; metCust: boolean; returning: boolean }[]
  >([]);
  const [barWidth, setBarWidth] = useState(0);

  // Function to spawn a drink at barWidth
  // const throwDrink = () => {
  //   const newDrinkID = "drink_" + Date.now();

  //   setDrink({
  //     id: newDrinkID,
  //     position: barWidth - 25,
  //     metCust: false,
  //     returning: false,
  //   });

  //   console.log("drink thrown");
  // };

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
      <div style={{ display: "flex", width: "100%", border: "2px solid red" }}>
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
