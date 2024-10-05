import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";

//what's this doing?
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

  //upon loss condition
  useEffect(() => {
    if (gameOver) {
      if (drinksDelivered > highScore) {
        setHighScore(drinksDelivered);
      }
    }
  }, [gameOver]);

  //increase difficulty
  useEffect(() => {
    const baseDrinks = 5; // drinks for each difficulty level
    const increment = 0.25; // increment value for multiplier

    if (drinksDelivered >= baseDrinks) {
      const level = Math.floor(drinksDelivered / baseDrinks);
      const newDiffMulti = 1 + level * increment;

      console.log(newDiffMulti);

      setDiffMulti(newDiffMulti);
    }
  }, [drinksDelivered]);

  const resetGame = () => {
    setDrinksDelivered(0);
    setGameOver(false);
    setGameStart(true);
    setDiffMulti(1);
  };

  const returnToMenu = () => {
    setGameStart(false);
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
