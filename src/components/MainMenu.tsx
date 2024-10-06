import { useState } from "react";
import { useGameContext } from "../GameContext";
import Tap from "./Tap";

const MainMenu = () => {
  const { resetGame, musicToggle, musicOn } = useGameContext();
  const [thanks, setThanks] = useState<boolean>(false);

  const toggleThanks = () => {
    setThanks(!thanks);
  };

  return (
    <div className="menu-wrapper">
      {thanks ? (
        <div onClick={toggleThanks} className="thanks">
          Credit goes to:
          <ul>
            <li>
              <a
                href="https://www.flaticon.com/free-icons/beer"
                title="beer icons"
              >
                Beer icons created by Freepik - Flaticon
              </a>
            </li>
            <li>
              "Itty Bitty 8 Bit" Kevin MacLeod (incompetech.com) Licensed under
              Creative Commons: By{" "}
              <a href="http://creativecommons.org/licenses/by/4.0/">
                Attribution 4.0 License
              </a>
            </li>
            <li>
              Thanks to{" "}
              <a href="http://www.sams-creatives.ch">Sams-Creatives</a> for the
              wood texture!
            </li>
          </ul>
          Click to close.
        </div>
      ) : (
        <>
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
              Try to keep your thirtsy patrons at bay! Tapping a brew 3 times
              sends a drink down the bar,{" "}
              <span className="warning">
                but don't let your customers get too close or send a drink to
                the end of an empty bar!
              </span>
            </p>
            <p>The longer you last, the harder it gets! Sling those drinks!</p>
          </div>
          <h3>
            Tap the mug <u>3 times</u> to play!
          </h3>
          <Tap throwDrink={resetGame} />
          <button onClick={toggleThanks}>Thanks!</button>
          <button onClick={musicToggle}>
            Music is {musicOn ? "ON" : "OFF"}!
          </button>
        </>
      )}
    </div>
  );
};
export default MainMenu;
