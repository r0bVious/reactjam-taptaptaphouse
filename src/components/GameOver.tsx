import { useGameContext } from "../GameContext";
import Tap from "./Tap";

const GameOver = () => {
  const { drinksDelivered, resetGame, highScore, returnToMenu } =
    useGameContext();
  return (
    <div className="gameover">
      <h1>You tapped out!</h1>
      <h2>
        You successfully served{" "}
        <span className="warning">{drinksDelivered}</span> drinks to thirsty
        customers!
      </h2>
      {drinksDelivered > highScore ? (
        <h3>
          <span className="warning">{drinksDelivered}</span> is your new
          highscore!
        </h3>
      ) : (
        <h3>
          <span className="warning">{highScore}</span> is your highest score
          yet!
        </h3>
      )}
      <Tap throwDrink={resetGame} />
      <button onClick={returnToMenu}>Main Menu</button>
    </div>
  );
};

export default GameOver;
