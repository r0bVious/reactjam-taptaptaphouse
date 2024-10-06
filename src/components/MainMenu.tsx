import { useGameContext } from "../GameContext";

const MainMenu = () => {
  const { resetGame } = useGameContext();
  return (
    <div className="menu-wrapper">
      <div className="sign-main">
        <span className="logo-the fancy">The</span>
        <div className="taptaps">
          <span className="logo-tap pixel">Tap</span>
          <span className="logo-tap pixel">Tap</span>
        </div>
        <span className="logo-taphouse fancy">
          <span>Tap</span>house
        </span>
      </div>
      <div className="instructions">
        <h3>How to play:</h3>
        <p>
          Try to keep your thirtsy patrons at bay! Tapping a brew 3 times sends
          a drink down the bar,{" "}
          <span className="warning">
            but be careful not to let your customers get too close - and don't
            send a drink to the end of an empty bar!
          </span>
        </p>
        <p>The longer you last, the harder it gets! Sling those drinks!</p>
        <p>-- Inspired by the classic arcade game "Tapper" --</p>
      </div>
      <button onClick={resetGame}>Start Game!</button>
    </div>
  );
};
export default MainMenu;
