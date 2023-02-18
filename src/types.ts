export type PlayerType = "X" | "O";
export type SquareType = PlayerType | "";
export type GameStatus = "Pend" | "X Won" | "O Won" | "A Tie";

export class Game {
    private readonly nextPlayer: PlayerType;
    private readonly status: GameStatus;
    private readonly squares: SquareType[];
    private readonly winningSquares: Set<number> | null;
    private readonly currentPlay: string;
  
    constructor(
      nextPlayer: PlayerType,
      status: GameStatus,
      squares: SquareType[],
      winningSquares: Set<number> | null,
      currentPlay: string
    ) {
      this.nextPlayer = nextPlayer;
      this.status = status;
      this.squares = squares;
      this.winningSquares = winningSquares;
      this.currentPlay = currentPlay;
    }
  
    get getNextPlayer(): PlayerType {
      return this.nextPlayer;
    }
  
    get getStatus(): GameStatus {
      return this.status;
    }
  
    get getSquares(): SquareType[] {
      return this.squares;
    }
  
    get getWinningSet(): Set<number> | null {
      return this.winningSquares;
    }
  
    get getCurrentPlay(): string {
      return this.currentPlay;
    }
  }