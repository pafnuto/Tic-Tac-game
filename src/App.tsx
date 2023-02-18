import { useReducer, useState, useRef } from "react";
import cssClass from './App.module.css'
import { Game as GameClass } from "./types";
import { initialGameHistory, gameReducer } from "./redux/gameReducer";
import GameStatus from "./components/status/gameStatus/gameStatus";
import History from "./components/history/history";

function App() {

  const [gameHistory, dispatch] = useReducer(gameReducer, initialGameHistory);
  const [moveNumber, setMoveNumber] = useState(0);
  const topOfPageRef = useRef<HTMLHeadingElement>(null);

  const handleSquareClick = (indexNumber: number) => {
    const currentGame: GameClass = gameHistory[moveNumber];
    if (currentGame.getSquares[indexNumber] !== "" || currentGame.getStatus !== "Pend") {

      return;
    }
    dispatch({
      type: "selected-square",
      selectedSquareIndex: indexNumber,
      currentMoveNum: moveNumber,
    });
    setMoveNumber(moveNumber + 1);
  };

  const handleOnPreviousMove = (prevMove: number) => {
    if (prevMove < 0 || prevMove >= gameHistory.length) {
      throw new Error("Out of bounds move selected!");
    }
    if (topOfPageRef && topOfPageRef.current) {
      topOfPageRef.current.scrollIntoView(true);
    }
    setMoveNumber(prevMove);
  };

  const handlePlayAgain = () => {
    dispatch({
      type: "selected-play-again",
    });
    setMoveNumber(0);
  };


  const currentGame: GameClass = gameHistory[moveNumber];
  return (
    <section className={cssClass.app}>
      <h1 id="title" className={cssClass.title} ref={topOfPageRef}>
        Tic-Tac-Toe
      </h1>
      <div className={cssClass.game} data-testid="game">
        <History gameHistory={gameHistory} currentMoveNumber={moveNumber} 
        onPrevMove={handleOnPreviousMove} />
        <GameStatus currentGame={currentGame} onSelectSquare={handleSquareClick} 
        onSelectPlayAgain={handlePlayAgain} />
      </div>
    </section>
  );
};


export default App
