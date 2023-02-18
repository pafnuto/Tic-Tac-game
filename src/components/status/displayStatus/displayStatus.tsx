import type { GameStatus, PlayerType }  from "../../../types";

function getStatusMessageElement(gameStatus: GameStatus, nextPlayer: PlayerType): JSX.Element {
    if (gameStatus === "Pend") {
      // Game is pending.
      return <h2>Следующий {nextPlayer} игрок</h2>;
    }
    if (gameStatus === "A Tie") {
      return <h2>Игра окончена в ничью</h2>;
    }
    // Game is over.
    return <h2>Игра окончена победил {gameStatus}!</h2>;
  }
  
  type DisplayStatusProps = {
    gameStatus: GameStatus;
    nextPlayer: PlayerType;
  };
  
  const DisplayStatus = ({ gameStatus, nextPlayer }: DisplayStatusProps) => {
    return getStatusMessageElement(gameStatus, nextPlayer);
  };
  
  export default DisplayStatus;