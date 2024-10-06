import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { characters } from "../public/data";

interface GameContextType {
  setDrinksDelivered: Dispatch<SetStateAction<number>>;
  drinksDelivered: number;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  gameOver: boolean;
  diffMulti: number;
  highScore: number;
  resetGame: () => void;
  gameStart: boolean;
  returnToMenu: () => void;
  musicToggle: () => void;
  musicOn: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [drinksDelivered, setDrinksDelivered] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [diffMulti, setDiffMulti] = useState<number>(1);
  const [highScore, setHighScore] = useState<number>(0);
  const [gameStart, setGameStart] = useState<boolean>(false);
  const [musicOn, setMusicOn] = useState<boolean>(true);

  // Preload images
  const preloadImages = () => {
    characters.forEach((character) => {
      character.img.forEach((imgUrl) => {
        const img = new Image();
        img.src = imgUrl;
      });
    });
  };
  useEffect(() => {
    preloadImages();
  }, []);

  //music
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    bgMusicRef.current = new Audio("audio/Itty_Bitty_8_Bit.mp3");
    bgMusicRef.current.loop = true;
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  }, []);

  const playMusic = (speed = 1) => {
    if (bgMusicRef.current && musicOn) {
      bgMusicRef.current.playbackRate = speed;
      bgMusicRef.current.volume = 0.25;
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  const musicToggle = () => {
    setMusicOn(!musicOn);
  };

  //upon loss condition
  useEffect(() => {
    if (gameOver) {
      if (drinksDelivered > highScore) {
        setHighScore(drinksDelivered);
      }
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    }
  }, [gameOver]);

  //increase difficulty
  useEffect(() => {
    const baseDrinks = 10; // drinks for each difficulty level
    const increment = 0.2; // increment value for multiplier

    if (drinksDelivered >= baseDrinks) {
      const level = Math.floor(drinksDelivered / baseDrinks);
      const newDiffMulti = 1 + level * increment;
      setDiffMulti(newDiffMulti);
      if (bgMusicRef.current) {
        bgMusicRef.current.playbackRate *= 1.01;
      }
    }
  }, [drinksDelivered]);

  const resetGame = () => {
    setDrinksDelivered(0);
    setGameOver(false);
    setDiffMulti(1);
    playMusic();
    setGameStart(true);
  };

  const returnToMenu = () => {
    setGameStart(false);
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
    }
  };

  return (
    <GameContext.Provider
      value={{
        setDrinksDelivered,
        drinksDelivered,
        setGameOver,
        gameOver,
        diffMulti,
        resetGame,
        highScore,
        gameStart,
        returnToMenu,
        musicToggle,
        musicOn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
