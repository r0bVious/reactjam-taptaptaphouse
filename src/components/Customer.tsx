import React, { useState, useEffect, useRef } from "react";

type CustomerProps = {
  barWidth: number;
};

const Customer: React.FC<CustomerProps> = ({ barWidth }) => {
  const [position, setPosition] = useState(0);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const speed = barWidth * 0.25; //added percentage of bar length for dynamic speed results, thus same gameplay across devices - this should be a prop passed based on some degree of randomness or difficulty selection

  const custRef = useRef<HTMLDivElement | null>(null);
  const [custWidth, setCustWidth] = useState(0);

  useEffect(() => {
    if (custRef.current) {
      setCustWidth(custRef.current.offsetWidth);
    }
  }, [barWidth]);

  const animate = (time: number) => {
    if (!startTimeRef.current) startTimeRef.current = time;

    const elapsedTime = time - (startTimeRef.current || 0);
    const newPosition = Math.min(
      position + (speed * elapsedTime) / 1000,
      barWidth - custWidth * 0.5
    );

    setPosition(newPosition);

    if (newPosition < barWidth) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current!);
    }
  };

  useEffect(() => {
    if (custRef.current) {
      setCustWidth(custRef.current.offsetWidth);
    }

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [barWidth, custWidth]);

  return (
    <div
      className="customer"
      ref={custRef}
      style={{ left: `${position}px`, top: "-25px" }} //move it up and z-back to put the customers "behind" the bar
    >
      cust
    </div>
  );
};

export default Customer;
