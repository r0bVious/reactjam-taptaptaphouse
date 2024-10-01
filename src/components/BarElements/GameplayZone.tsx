import React, { useEffect, useRef, useState } from "react";
import Customer from "./Customer";
import Drink from "./Drink";

const GameplayZone = () => {
  const [barWidth, setBarWidth] = useState(0);
  const barRef = useRef<HTMLDivElement | null>(null);
  const [customers, setCustomers] = useState<
    { id: string; position: number; returning: boolean }[]
  >([]);
  const [drink, setDrink] = useState<{
    id: string;
    position: number;
    returning: boolean;
  } | null>(null);

  const animationFrameRef = useRef<number | null>(null);

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
      const newCustomerID = "cust_" + Date.now();
      setCustomers((prev) => [
        ...prev,
        { id: newCustomerID, position: 0, returning: false },
      ]);
    }
  };

  // function to spawn a drink at pos barWidth
  const throwDrink = () => {
    const newDrinkID = "drink_" + Date.now();

    //only one drink at a time
    if (!drink) {
      setDrink({ id: newDrinkID, position: barWidth - 25, returning: false });
    }
    console.log("drink thrown");
  };

  // On load, begin interval calling spawnCustomer
  useEffect(() => {
    const intervalId = setInterval(spawnCustomer, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // Function to remove customer from the DOM when they reach either end
  const dropCustomer = (customerID: string) => {
    setCustomers((existingCustomers) =>
      existingCustomers.filter((cust) => cust.id !== customerID)
    );
  };

  const handleClick = () => {
    throwDrink();
  };

  // Animation loop that moves each customer based on their state
  const updateCustomersPos = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((cust) => {
        const speed = barWidth * 0.5;
        const newPosition =
          cust.position + ((cust.returning ? -1.5 : 1) * speed) / 60;

        //25 is half a customer width - PLACEHOLDER
        if (newPosition <= 0 || newPosition >= barWidth - 25) {
          dropCustomer(cust.id);
        }

        return { ...cust, position: newPosition };
      })
    );
  };

  const updateDrinkPos = () => {
    if (drink) {
      const speed = barWidth * 0.5;
      const newPosition =
        drink.position - ((drink.returning ? 1.5 : 1) * speed) / 60;

      if (newPosition <= 0) {
        setDrink(null);
      } else {
        setDrink({ ...drink, position: newPosition });
      }
    }
  };

  // Check for collision between drink and customers
  const checkCollision = () => {
    if (drink && customers.length > 0) {
      customers.forEach((cust) => {
        const distance = Math.abs(drink.position - cust.position);
        const collisionThreshold = 25; // Adjust this to fit visual sizes

        if (distance < collisionThreshold) {
          console.log(
            `Hit! The drink hit the customer at position ${cust.position}`
          );
          setCustomers((prevCustomers) =>
            prevCustomers.map((customer) =>
              customer.id === cust.id
                ? { ...customer, returning: true }
                : customer
            )
          );
          setDrink({ ...drink, returning: true }); // Reset drink on collision
        }
      });
    }
  };

  const animate = () => {
    updateCustomersPos();
    updateDrinkPos();
    checkCollision();
    animationFrameRef.current = requestAnimationFrame(animate); // Store the ID
  };

  // Start animation when component mounts
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [drink, customers, barWidth]);

  return (
    <div className="bar" ref={barRef} onClick={handleClick}>
      {customers.map((customer) => (
        <Customer key={customer.id} position={customer.position} />
      ))}
      {drink ? <Drink key={drink.id} position={drink.position} /> : null}
    </div>
  );
};

export default GameplayZone;
