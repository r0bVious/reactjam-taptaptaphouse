import { useState } from "react";

type TapProps = { throwDrink: () => void };

const Tap: React.FC<TapProps> = ({ throwDrink }) => {
  const [fillDrink, setFillDrink] = useState<number>(0);

  const pourDrink = () => {
    console.log(fillDrink);
    if (fillDrink > 2) {
      throwDrink();
      setFillDrink(0);
    } else setFillDrink((prev) => prev + 1);
  };

  return (
    <div className="tap" onClick={pourDrink}>
      Tap
    </div>
  );
};

export default Tap;
