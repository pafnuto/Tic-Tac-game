import { Game } from "../types";
import type { PlayerType, SquareType, GameStatus } from "../types";

const WIN_LINES: number[][] = [
//горизонтальные
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
//вертикальные
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
//по диагонали
    [0, 4, 8],
    [2, 4, 6],
  ];

export function getNextPlayer(currentPlayer: PlayerType): PlayerType {
    return currentPlayer === "X" ? "O" : "X";
  }
  
export function getNextSquares(currentSquares: SquareType[], selectedSquareIndex: number, nextPlayer: PlayerType) {
    return currentSquares.map((currentSquareValue, index) =>
      index !== selectedSquareIndex ? currentSquareValue : nextPlayer
    );
  }  

export function getWinningSet(squares: SquareType[]): Set<number> | null {
    let winSet = null;
    if (squares.length === 0) {
      return winSet;
    }
    for (let i = 0; i < WIN_LINES.length && winSet === null; i++) {
      const [a, b, c] = WIN_LINES[i];
      if (squares[a] !== "" && squares[a] === squares[b] && squares[b] === squares[c]) {
        // Found a winning line in the board.
        winSet = new Set<number>(WIN_LINES[i]); // By Association.
      }
    }
    return winSet;
  }

export function getNextGameStatus(
    nextWinSet: Set<number> | null,
    currentPlayer: PlayerType,
    currMoveNum: number
  ): GameStatus {
    let nextStatus: GameStatus;
  
    if (nextWinSet !== null) {
      nextStatus = currentPlayer === "X" ? "X Won" : "O Won";
    } else if (currMoveNum > 7) {
      nextStatus = "A Tie";
    } else {
      nextStatus = "Pend";
    }
    return nextStatus;
  }
  
export function getCurrentPlay(currentPlayer: PlayerType, selectedSquare: number): string {
    if (selectedSquare < 0 || selectedSquare > 8) {
      throw new Error(`Неверное значение поля: ${selectedSquare}`);
    }
    return `Player ${currentPlayer} selected row ${Math.floor(selectedSquare / 3) + 1}, column ${(selectedSquare % 3) + 1}`;
  }
  
  export function handleSquareSelection(state: Game[], selectedSquare: number, currMoveNum: number): Game[] {
    if (selectedSquare < 0 || selectedSquare > 8) {
      throw new Error("Valid selected squares are 0-8");
    }
    if (currMoveNum < 0 || currMoveNum >= state.length) {
      throw new Error("Out of bounds move number.");
    }
  
    const currGame: Game = state[currMoveNum];
    if (currGame.getStatus !== "Pend") {
      throw new Error("Игра окончена!");
    }
    if (currGame.getSquares[selectedSquare] !== "") {
      throw new Error("Player can not select a square already played.");
    }

  //следующая игра
  const nextSquares: SquareType[] = getNextSquares(currGame.getSquares, selectedSquare, currGame.getNextPlayer);

  //следующий игрок
  const nextPlayer: PlayerType = getNextPlayer(currGame.getNextPlayer);

  //следующая победа
  const nextWinSet: Set<number> | null = getWinningSet(nextSquares);

  //следующий статус игры
  const nextStatus: GameStatus = getNextGameStatus(nextWinSet, currGame.getNextPlayer, currMoveNum);

  //разыграть игру
  const getPlay = getCurrentPlay(currGame.getNextPlayer, selectedSquare);

  //следующая игра
  const nextGame: Game = new Game(nextPlayer, nextStatus, nextSquares, nextWinSet, getPlay);

  //следующий ход
  const nextMoveNum: number = currMoveNum + 1;

  //новая история
  const nextHistory: Game[] = state.slice(0, nextMoveNum);
  nextHistory.push(nextGame); 

    //возврат истории
    return nextHistory;
}

export function handlePlayAgainSelect(state: Game[]): Game[] {
    const newInitialGame = state.slice(0, 1);
    return newInitialGame;
  }
  
  const initialSquares: SquareType[] = new Array(9);
  initialSquares.fill("");
  const initialGame: Game = new Game("X", "Pend", initialSquares, null, "");
  export const initialGameHistory: Game[] = [initialGame];
  
  export type selectedSquareAction = {
    type: "selected-square" | "selected-play-again";
    selectedSquareIndex: number;
    currentMoveNum: number;
  };
  export type selectedPlayAgainAction = {
    type: "selected-play-again";
  };
  export type GameStateAction = selectedSquareAction | selectedPlayAgainAction;
  
  export function gameReducer(state: Game[], action: GameStateAction): Game[] {
    switch (action.type) {
      case "selected-square": {
        return handleSquareSelection(state, action.selectedSquareIndex, action.currentMoveNum);
      }
      case "selected-play-again": {
        return handlePlayAgainSelect(state);
      }
      default: {
        throw new Error(`No action type in game reducer for action:\n\t${action}`);
      }
    }
  }