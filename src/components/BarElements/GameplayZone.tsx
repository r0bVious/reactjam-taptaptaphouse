import React, { useEffect, useRef, useState } from "react";
import Customer from "./Customer";
import Drink from "./Drink";
import { useGameContext } from "../../GameContext";

type DrinkType = {
  id: string;
  position: number;
  metCust: boolean;
  returning: boolean;
};

type GameplayZoneProps = {
  drinks: DrinkType[];
  setBarWidth: React.Dispatch<React.SetStateAction<number>>;
  setDrinks: React.Dispatch<React.SetStateAction<DrinkType[]>>;
};

const GameplayZone: React.FC<GameplayZoneProps> = ({
  drinks,
  setBarWidth,
  setDrinks,
}) => {
  const barRef = useRef<HTMLDivElement | null>(null);
  const [customers, setCustomers] = useState<
    { id: string; position: number; returning: boolean }[]
  >([]);
  const [customerCount, setCustomerCount] = useState(0);

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
      const newCustomerID = `cust_${customerCount}_${Math.random()}`;
      setCustomerCount((prevCount) => prevCount + 1); // Increment customer count
      setCustomers((prev) => [
        ...prev,
        { id: newCustomerID, position: -96, returning: false },
      ]); //96 is half a customer png
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
    setCustomers((existingCustomers) =>
      existingCustomers.filter((cust) => cust.id !== customerID)
    );
    setDrinksDelivered((prev) => {
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

        //96 is half the size of a customer png
        if (cust.position >= barRef.current!.offsetWidth - 96) {
          dropCustomer(cust.id);
        }

        return { ...cust, position: newPosition };
      })
    );
  };

  //useEffect handling gamecontext updates
  useEffect(() => {
    customers.forEach((cust) => {
      if (cust.position >= barRef.current!.offsetWidth - 96) {
        setTimeout(() => setGameOver(true), 0); //prevents ill-timed calls during renders?
      } else if (cust.position <= 0 && cust.returning) {
        exitCustomer(cust.id);
      }
    });
  }, [customers]);

  const updateDrinksPos = () => {
    setDrinks((prevDrinks) => {
      return prevDrinks
        .map((drink) => {
          if (!drink) return null;

          const speed = barRef.current!.offsetWidth * 0.25;
          const newPosition =
            drink.position -
            ((drink.metCust ? 1.5 : 3) * speed * diffMulti) / 60;

          if (newPosition <= 0) {
            if (!drink.metCust) {
              setGameOver(true);
            }
            return null;
          }

          return { ...drink, position: newPosition };
        })
        .filter((drink): drink is DrinkType => drink !== null);
    });
  };

  // Check for collision between drink and customers
  const checkCollision = () => {
    drinks.forEach((drink) => {
      if (customers.length > 0) {
        customers.forEach((cust) => {
          const distance = Math.abs(drink.position - cust.position);
          const collisionThreshold = 25;

          if (
            distance < collisionThreshold &&
            !drink.metCust &&
            !cust.returning
          ) {
            // Update drink state and customer returning status
            setDrinks((prevDrinks) =>
              prevDrinks.map((d) =>
                d.id === drink.id ? { ...d, metCust: true } : d
              )
            );
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
    });
  };

  const animate = () => {
    updateCustomersPos();
    updateDrinksPos();
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
  }, [drinks, customers]);

  return (
    <div className="bar" ref={barRef}>
      {customers.map((customer) => (
        <Customer
          key={customer.id}
          position={customer.position}
          returning={customer.returning}
        />
      ))}
      <div className="bar-shape"></div>
      {drinks.map((drink) => (
        <Drink key={drink.id} position={drink.position} />
      ))}
      {drinksDelivered}
    </div>
  );
};

export default GameplayZone;
