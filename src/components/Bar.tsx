import React, { useEffect, useRef, useState } from "react";
import Customer from "./Customer";

const Bar = () => {
  const [barWidth, setBarWidth] = useState(0);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (barRef.current) {
      setBarWidth(barRef.current.offsetWidth);
    }
  }, []);

  const spawnCustomer = () => {
    //how does react handle this? vanillaJS would grab the dom and attach a new element
  };

  //If number of customers doesn't exceed maximum, give a chance for spawn. if triggered, spawncustomer() above

  return (
    <div className="bar" ref={barRef}>
      {barWidth > 0 && <Customer barWidth={barWidth} />}
    </div>
  );
};

export default Bar;
