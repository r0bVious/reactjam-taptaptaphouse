import React, { useState } from "react";
import GameplayZone from "./BarElements/GameplayZone";
import Tap from "./Tap";

const GameRow = () => {
  const [drink, setDrink] = useState<{
    id: string;
    position: number;
    metCust: boolean;
    returning: boolean;
  } | null>(null);
  const [barWidth, setBarWidth] = useState(0);

  // Function to spawn a drink at barWidth
  const throwDrink = () => {
    const newDrinkID = "drink_" + Date.now();

    setDrink({
      id: newDrinkID,
      position: barWidth - 25,
      metCust: false,
      returning: false,
    });

    console.log("drink thrown");
  };

  return (
    <>
      <div style={{ display: "flex", width: "100%", border: "2px solid red" }}>
        <GameplayZone
          drink={drink}
          setBarWidth={setBarWidth}
          setDrink={setDrink}
        />
        <Tap throwDrink={throwDrink} />
      </div>
    </>
  );
};

export default GameRow;
