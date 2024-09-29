import React, { useEffect, useRef, useState } from "react";
import Customer from "./Customer";

const Bar = () => {
  const [barWidth, setBarWidth] = useState(0);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [customers, setCustomers] = useState<number[]>([]);

  useEffect(() => {
    if (barRef.current) {
      setBarWidth(barRef.current.offsetWidth);
    }
  }, []);

  const spawnCustomer = () => {
    const chance = Math.random();
    if (chance < 0.3) {
      const newCustomerID = Date.now();
      setCustomers((prev) => [...prev, newCustomerID]);
    }
  };

  const dropCustomer = (customerID: number) => {
    setCustomers((existingCustomers) =>
      existingCustomers.filter((id) => id !== customerID)
    );
  };

  useEffect(() => {
    const intervalId = setInterval(spawnCustomer, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bar" ref={barRef}>
      {customers.map((customerID) => (
        <Customer
          key={customerID}
          id={customerID}
          barWidth={barWidth}
          dropCustomer={dropCustomer}
        />
      ))}
    </div>
  );
};

export default Bar;
