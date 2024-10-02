import { useState } from "react";
import "./App.css";
import GameRow from "./components/GameRow";
import { GameProvider } from "./GameContext";

function App() {
  return (
    <>
      <GameProvider>
        <GameRow />
        <GameRow />
        <GameRow />
      </GameProvider>
    </>
  );
}

export default App;
