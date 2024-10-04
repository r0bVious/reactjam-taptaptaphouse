import React from "react";

type DrinkProps = {
  position: number;
};

const Drink: React.FC<DrinkProps> = ({ position }) => {
  return (
    <div
      className="drink"
      style={{ left: `${position}px`, position: "absolute" }}
    >
      <img src="beer.png" />
    </div>
  );
};

export default Drink;
