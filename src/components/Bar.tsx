import React, { useEffect, useRef, useState } from "react";
import Customer from "./Customer";

const Bar = () => {
  const [barWidth, setBarWidth] = useState(0);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [customers, setCustomers] = useState<number[]>([]);
  const [returningCustomers, setReturningCustomers] = useState<number[]>([]);

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
    setReturningCustomers((returning) =>
      returning.filter((id) => id !== customerID)
    );
  };

  useEffect(() => {
    const intervalId = setInterval(spawnCustomer, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const returnCustomer = () => {
    // Find the first customer that isn't already returning
    const customerToReturn = customers.find(
      (id) => !returningCustomers.includes(id)
    );
    if (customerToReturn) {
      setReturningCustomers((prev) => [...prev, customerToReturn]);
    }
  };

  return (
    <div className="bar" ref={barRef} onClick={returnCustomer}>
      {customers.map((customerID) => (
        <Customer
          key={customerID}
          id={customerID}
          barWidth={barWidth}
          dropCustomer={dropCustomer}
          reversed={returningCustomers.includes(customerID)}
        />
      ))}
    </div>
  );
};

export default Bar;
