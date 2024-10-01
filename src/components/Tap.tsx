import React from "react";

type TapProps = { throwDrink: () => void };

const Tap: React.FC<TapProps> = ({ throwDrink }) => {
  return (
    <div className="tap" onClick={throwDrink}>
      Tap
    </div>
  );
};

export default Tap;
