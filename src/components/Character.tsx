import { useEffect, useState } from "react";
import { characters } from "../../public/data";

type CharacterProps = {
  returning: boolean;
};

const Character: React.FC<CharacterProps> = ({ returning }) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [characterID, setCharacterID] = useState(0);

  useEffect(() => {
    const randomCharacterID = Math.floor(Math.random() * characters.length);
    setCharacterID(randomCharacterID);

    const totalFrames = characters[randomCharacterID].img.length;

    const interval = setInterval(() => {
      setFrameIndex((prevIndex) => (prevIndex + 1) % totalFrames);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={characters[characterID].img[frameIndex]}
      alt="Walking character"
      style={{ transform: returning ? "scaleX(-1)" : "none" }}
    />
  );
};

export default Character;
