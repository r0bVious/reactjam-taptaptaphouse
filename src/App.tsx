import "./App.css";
import GameRow from "./components/GameRow";
import { GameProvider, useGameContext } from "./GameContext";
import GameOver from "./components/GameOver";
import MainMenu from "./components/MainMenu";
import HUD from "./components/HUD";
import { useState, useEffect } from "react";

function App() {
  const [isLandscape, setIsLandscape] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerHeight < 500 && window.innerWidth > window.innerHeight) {
        setIsLandscape(true);
      } else {
        setIsLandscape(false);
      }
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);

    return () => {
      window.removeEventListener("resize", checkOrientation);
    };
  }, []);

  if (isLandscape) {
    return (
      <div>
        <p>Please rotate your device to portrait mode to play the game.</p>
      </div>
    );
  }

  return (
    <>
      <GameProvider>
        <GameContent />
      </GameProvider>
    </>
  );
}

function GameContent() {
  const { gameOver, gameStart } = useGameContext();

  return (
    <>
      {!gameStart ? (
        <MainMenu />
      ) : gameOver ? (
        <GameOver />
      ) : (
        <>
          <HUD />
          <div className="game">
            <GameRow />
            <GameRow />
            <GameRow />
            <GameRow />
          </div>
        </>
      )}
    </>
  );
}

export default App;
