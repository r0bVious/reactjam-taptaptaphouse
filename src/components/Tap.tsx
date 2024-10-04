import { useState } from "react";

type TapProps = { throwDrink: () => void };

const Tap: React.FC<TapProps> = ({ throwDrink }) => {
  const [fillDrink, setFillDrink] = useState<number>(0);

  const pourDrink = () => {
    if (fillDrink >= 2) {
      throwDrink();
      setFillDrink(0);
    } else setFillDrink((prev) => prev + 1);
  };

  return (
    <div className="tap" onClick={pourDrink}>
      <img src="beer.png" className="filled" alt="filled" />
      <img
        src="beer.png"
        className="unfilled"
        alt="unfilled"
        style={{ clipPath: `inset(0 0 ${fillDrink * 33}% 0)` }}
      />
    </div>
  );
};

export default Tap;
