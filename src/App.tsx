import "./App.css";
import GameRow from "./components/GameRow";
import { GameProvider, useGameContext } from "./GameContext";
import GameOver from "./components/GameOver";
import MainMenu from "./components/MainMenu";

function App() {
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
          <GameRow />
          <GameRow />
          <GameRow />
        </>
      )}
    </>
  );
}

export default App;
