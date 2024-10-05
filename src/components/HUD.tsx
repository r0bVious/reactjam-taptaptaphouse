import { useGameContext } from "../GameContext";

const HUD = () => {
  const { drinksDelivered, diffMulti } = useGameContext();

  return (
    <div className="hud">
      <div>
        <h5>Drinks Delivered:</h5>
        {drinksDelivered}
      </div>
      <div>
        <h5>Speed Multiplier:</h5>
        {diffMulti}x
      </div>
    </div>
  );
};

export default HUD;
