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
          <span className="logo-tap pixel">Tap</span>
        </div>
        <span className="logo-taphouse fancy">Taphouse</span>
      </div>

      <button onClick={resetGame}>Start Game!</button>
    </div>
  );
};
export default MainMenu;
