import React from "react";

type CustomerProps = {
  position: number;
};

const Customer: React.FC<CustomerProps> = ({ position }) => {
  return (
    <div
      className="customer"
      style={{ left: `${position}px`, top: "-25px", position: "absolute" }}
    >
      cust
    </div>
  );
};

export default Customer;
