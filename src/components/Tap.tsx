import { useState, useRef, useEffect } from "react";

type TapProps = { throwDrink: () => void };

const Tap: React.FC<TapProps> = ({ throwDrink }) => {
  const [fillDrink, setFillDrink] = useState<number>(0);
  const timeoutRef = useRef<number | null>(null);

  const resetFillDrink = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setFillDrink(0), 1000);
  };

  const pourSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    pourSoundRef.current = new Audio("/audio/handleCoins.ogg");

    return () => {
      pourSoundRef.current = null;
    };
  }, []);

  const pourDrink = () => {
    if (fillDrink >= 2) {
      if (pourSoundRef.current) {
        pourSoundRef.current.currentTime = 0;
        pourSoundRef.current.play();
      }
      throwDrink();
      setFillDrink(0);
    } else {
      setFillDrink((prev) => prev + 1);
    }
    resetFillDrink();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="tap" onClick={pourDrink}>
      <img src="beer.png" className="filled" alt="filled" />
      <img
        src="beer.png"
        className="unfilled"
        alt="unfilled"
        style={{
          clipPath: `inset(0 0 ${fillDrink * 33}% 0)`,
          transition:
            fillDrink === 0
              ? "clip-path 0.05s ease-in-out"
              : "clip-path 0.05s steps(2,end)",
        }}
      />
    </div>
  );
};

export default Tap;
