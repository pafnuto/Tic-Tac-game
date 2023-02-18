import react, { useState } from "react";
import cssClass from "./history.module.css";
import { Game } from "../../types";
import PrevMoves from "./prevMoves"
 
export type GameHistoryProps = {
    gameHistory: Game[];
    currentMoveNumber: number;
    onPrevMove: (prevMove: number) => void;
};
  
const History = ({ gameHistory, currentMoveNumber, onPrevMove }: GameHistoryProps) => {
    const [showHistory, setShowHistory] = useState(false);
  
    const handleClick = () => {
      setShowHistory((prev) => !prev);
    };
  
    return (
      <section data-testid="GameHistory" className={cssClass.history}>
        <div className={cssClass.historyHeader}>
          <h2>Game History</h2>
          <button name="Toggle History" onClick={handleClick}>
            {showHistory ? "Hide History" : "Show History"}
          </button>
        </div>
        {showHistory && (
          <PrevMoves gameHistory={gameHistory} currentMoveNumber={currentMoveNumber} onPrevMove={onPrevMove} />
        )}
      </section>
    );
  };
  
  export default History;