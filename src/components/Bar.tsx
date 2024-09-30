import React, { useEffect, useRef, useState } from "react";
import Customer from "./Customer";

const Bar = () => {
  const [barWidth, setBarWidth] = useState(0);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [customers, setCustomers] = useState<
    { id: number; position: number; returning: boolean }[]
  >([]);
  const [farthestCustomerPosition, setFarthestCustomerPosition] = useState(0); // Track the highest x-position

  // Get the width of the bar according to render size
  useEffect(() => {
    if (barRef.current) {
      setBarWidth(barRef.current.offsetWidth);
    }
  }, []);

  // Function to spawn a new customer at position 0
  const spawnCustomer = () => {
    const chance = Math.random();
    if (chance < 0.3) {
      const newCustomerID = Date.now();
      setCustomers((prev) => [
        ...prev,
        { id: newCustomerID, position: 0, returning: false },
      ]);
    }
  };

  // On load, begin interval calling spawnCustomer
  useEffect(() => {
    const intervalId = setInterval(spawnCustomer, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Function to remove customer from the DOM when they reach either end
  const dropCustomer = (customerID: number) => {
    setCustomers((existingCustomers) =>
      existingCustomers.filter((cust) => cust.id !== customerID)
    );
  };

  // Function to trigger a customer to return to the spawn point
  const returnCustomer = (customerID: number) => {
    setCustomers((existingCustomers) =>
      existingCustomers.map((cust) =>
        cust.id === customerID ? { ...cust, returning: true } : cust
      )
    );
  };

  // Animation loop that moves each customer based on their state
  const animateCustomers = () => {
    let highestPosition = 0; // Variable to track the farthest position

    setCustomers(
      (prevCustomers) =>
        prevCustomers
          .map((cust) => {
            const speed = barWidth * 0.25;
            const direction = cust.returning ? -1 : 1;
            const multiplier = cust.returning ? 3 : 1;
            const newPosition =
              cust.position + (direction * speed * multiplier) / 60;

            //25 is half a customer width - PLACEHOLDER
            if (newPosition <= 0 || newPosition >= barWidth - 25) {
              dropCustomer(cust.id);
              return null;
            }

            // Track the highest position
            if (newPosition > highestPosition) {
              highestPosition = newPosition;
            }

            return { ...cust, position: newPosition };
          })
          .filter(Boolean) as {
          id: number;
          position: number;
          returning: boolean;
        }[]
    );

    setFarthestCustomerPosition(highestPosition);
  };

  useEffect(() => {
    const intervalId = setInterval(animateCustomers, 1000 / 120); // 120 FPS
    return () => clearInterval(intervalId);
  }, [barWidth]);

  return (
    <div
      className="bar"
      ref={barRef}
      onClick={() => returnCustomer(customers[0]?.id)}
    >
      {customers.map((customer) => (
        <Customer key={customer.id} position={customer.position} />
      ))}
    </div>
  );
};

export default Bar;
