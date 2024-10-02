import "./App.css";
import GameRow from "./components/GameRow";
import { GameProvider, useGameContext } from "./GameContext";
import GameOver from "./components/GameOver";

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
  const { gameOver } = useGameContext();

  return (
    <>
      {gameOver ? (
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
