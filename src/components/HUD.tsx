import { useGameContext } from "../GameContext";

const HUD = () => {
  const { drinksDelivered, diffMulti } = useGameContext();

  return (
    <div className="hud">
      <div>
        <span>Drinks Delivered:</span>
        <span>{drinksDelivered}</span>
      </div>
      <div>
        <span>Speed Multiplier:</span>
        <span>{diffMulti.toFixed(2)}x</span>
      </div>
    </div>
  );
};

export default HUD;
