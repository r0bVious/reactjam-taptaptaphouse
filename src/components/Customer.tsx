import React, { useState, useEffect, useRef } from "react";

type CustomerProps = {
  id: number;
  barWidth: number;
  dropCustomer: (customerID: number) => void;
  reversed: boolean; // Prop to control whether the customer moves backward
};

const Customer: React.FC<CustomerProps> = ({
  id,
  barWidth,
  dropCustomer,
  reversed,
}) => {
  const [position, setPosition] = useState(0);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const speed = barWidth * 0.25; // Base speed

  const custRef = useRef<HTMLDivElement | null>(null);
  const [custWidth, setCustWidth] = useState(0);

  // Set the customer width on initial render
  useEffect(() => {
    if (custRef.current) {
      setCustWidth(custRef.current.offsetWidth);
    }
  }, [barWidth]);

  const animate = (time: number, direction: number, multiplier: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsedTime = time - (startTimeRef.current || 0);
    const newPosition = Math.max(
      0,
      Math.min(
        position + (direction * speed * multiplier * elapsedTime) / 1000,
        barWidth - custWidth * 0.5
      )
    );

    setPosition(newPosition);

    if (
      (direction > 0 && newPosition < barWidth - custWidth * 0.5) ||
      (direction < 0 && newPosition > 0)
    ) {
      requestRef.current = requestAnimationFrame((newTime) =>
        animate(newTime, direction, multiplier)
      );
    } else {
      if (direction < 0) {
        console.log("Customer has returned to the start", id);
        dropCustomer(id); // Trigger whatever happens when the customer returns
      } else {
        console.log("Customer has reached the end of the bar", id);
        dropCustomer(id);
      }
      cancelAnimationFrame(requestRef.current!);
    }
  };

  // Start the seeking or returning animation based on the reversed prop
  useEffect(() => {
    if (custRef.current) {
      setCustWidth(custRef.current.offsetWidth);
    }

    startTimeRef.current = performance.now(); // Reset the start time but not elapsedTime

    if (reversed) {
      // Move backwards at 3x speed
      requestRef.current = requestAnimationFrame((time) =>
        animate(time, -1, 3)
      );
    } else {
      // Move forwards at normal speed
      requestRef.current = requestAnimationFrame((time) => animate(time, 1, 1));
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [barWidth, custWidth, reversed]);

  return (
    <div
      className="customer"
      ref={custRef}
      style={{ left: `${position}px`, top: "-25px" }} // z-index it "behind" the bar
    >
      cust
    </div>
  );
};

export default Customer;
