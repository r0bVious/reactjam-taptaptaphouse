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

  //upon loss condition
  useEffect(() => {
    if (gameOver) {
      if (drinksDelivered > highScore) {
        setHighScore(drinksDelivered);
      }
      console.log("Game over triggered");
      //game over stuff here
    }
  }, [gameOver]);

  //increase difficulty
  useEffect(() => {
    //setDiffMulti increases rate of spawn AND speed across bar
    switch (true) {
      case drinksDelivered === 5:
        console.log("Difficulty increase:", drinksDelivered);
        setDiffMulti(1.25);
        break;
      case drinksDelivered === 10:
        console.log("Difficulty increase:", drinksDelivered);
        setDiffMulti(1.5);
        break;
      case drinksDelivered === 15:
        console.log("Difficulty increase:", drinksDelivered);
        setDiffMulti(1.75);
        break;
    }
  }, [drinksDelivered]);

  const resetGame = () => {
    setDrinksDelivered(0);
    setGameOver(false);
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
