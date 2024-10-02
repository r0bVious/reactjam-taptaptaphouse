import React, { useEffect, useRef, useState } from "react";
import Customer from "./Customer";
import Drink from "./Drink";
import { useGameContext } from "../../GameContext";

type GameplayZoneProps = {
  drink: {
    id: string;
    position: number;
    metCust: boolean;
    returning: boolean;
  } | null;
  setBarWidth: React.Dispatch<React.SetStateAction<number>>;
  setDrink: React.Dispatch<
    React.SetStateAction<{
      id: string;
      position: number;
      metCust: boolean;
      returning: boolean;
    } | null>
  >;
};

const GameplayZone: React.FC<GameplayZoneProps> = ({
  drink,
  setBarWidth,
  setDrink,
}) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [customers, setCustomers] = useState<
    { id: string; position: number; returning: boolean }[]
  >([]);

  const animationFrameRef = useRef<number | null>(null);
  const { setGameOver, setDrinksDelivered, drinksDelivered, diffMulti } =
    useGameContext();

  // Get the width of the bar according to render size
  useEffect(() => {
    if (barRef.current) {
      setBarWidth(barRef.current.offsetWidth);
    }
  }, [setBarWidth]);

  // Function to spawn a new customer at position 0
  const spawnCustomer = () => {
    const chance = Math.random();
    if (chance < 0.3 * diffMulti) {
      const newCustomerID = "cust_" + Date.now();
      setCustomers((prev) => [
        ...prev,
        { id: newCustomerID, position: 0, returning: false },
      ]);
    }
  };

  // On load, begin interval calling spawnCustomer
  useEffect(() => {
    const createRandomInterval = () => Math.random() * 1000 + 2500; // Randomized between 2.5 and 3.5 seconds
    const spawnAndSetInterval = () => {
      spawnCustomer();
      const timeoutId = setTimeout(spawnAndSetInterval, createRandomInterval());
      return timeoutId; // Return the timeout ID (a number)
    };

    const timeoutId = spawnAndSetInterval(); // Start the loop

    return () => clearTimeout(timeoutId); // Clean up
  }, []);

  // Function to remove customer from the DOM when they reach the end of the bar (placeholder)
  const dropCustomer = (customerID: string) => {
    setCustomers((existingCustomers) =>
      existingCustomers.filter((cust) => cust.id !== customerID)
    );
  };

  //function to remove successful drink-receiving customers
  const exitCustomer = (customerID: string) => {
    console.log("Exiting customer:", customerID); // Log to verify this function is firing
    setCustomers((existingCustomers) =>
      existingCustomers.filter((cust) => cust.id !== customerID)
    );
    setDrinksDelivered((prev) => {
      console.log("Drinks delivered incremented:", prev + 1); // Log to verify state update
      return prev + 1;
    });
  };

  // Animation loop that moves each customer based on their state
  const updateCustomersPos = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((cust) => {
        const speed = barRef.current!.offsetWidth * 0.25;
        const newPosition =
          cust.position +
          ((cust.returning ? -1.5 : 1) * speed * diffMulti) / 60;

        if (cust.position >= barRef.current!.offsetWidth - 25) {
          dropCustomer(cust.id);
        }

        return { ...cust, position: newPosition };
      })
    );
  };

  //useEffect handling gamecontext updates
  useEffect(() => {
    customers.forEach((cust) => {
      if (cust.position >= barRef.current!.offsetWidth - 25) {
        setGameOver(true);
      } else if (cust.position <= 0 && cust.returning) {
        exitCustomer(cust.id);
      }
    });
  }, [customers]);

  const updateDrinkPos = () => {
    if (drink) {
      const speed = barRef.current!.offsetWidth * 0.25;
      const newPosition =
        drink.position - ((drink.metCust ? 1.5 : 3) * speed * diffMulti) / 60;

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
        const collisionThreshold = 25;

        if (distance < collisionThreshold && !drink.metCust) {
          setDrink({ ...drink, metCust: true });
          setCustomers((prevCustomers) =>
            prevCustomers.map((customer) =>
              customer.id === cust.id
                ? { ...customer, returning: true }
                : customer
            )
          );
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
  }, [drink, customers]);

  return (
    <div className="bar" ref={barRef} style={{ width: "80%" }}>
      {customers.map((customer) => (
        <Customer key={customer.id} position={customer.position} />
      ))}
      {drink ? <Drink key={drink.id} position={drink.position} /> : null}
      {drinksDelivered}
    </div>
  );
};

export default GameplayZone;
