import React from "react";
import { useGameContext } from "../GameContext";

const GameOver = () => {
  const { drinksDelivered, resetGame, highScore } = useGameContext();
  return (
    <div className="gameover">
      <h1>Game Over</h1>
      <h2>
        You successfully served {drinksDelivered} drinks to thirsty customers!
      </h2>
      {drinksDelivered > highScore ? (
        <h3>{drinksDelivered} is your new highscore!</h3>
      ) : (
        <h3>{highScore} is your highest score yet!</h3>
      )}
      <button onClick={resetGame}>Thirsty for more?</button>
    </div>
  );
};

export default GameOver;
