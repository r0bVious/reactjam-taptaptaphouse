import React from "react";

type DrinkProps = {
  position: number;
};

const Drink: React.FC<DrinkProps> = ({ position }) => {
  return (
    <div
      className="drink"
      style={{ left: `${position}px`, top: "-25px", position: "absolute" }}
    >
      drink
    </div>
  );
};

export default Drink;
