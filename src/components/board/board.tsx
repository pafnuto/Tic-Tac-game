import { useState } from "react";
import "./board.css";
import Square from "../square/square";

export const Board = () => {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [xIsNext, setXIsNext] = useState(true);
	const [gameOn, setGameOn] = useState(false);
	const gameWinner = calculateWinner(board as []);
	let status;

	if (gameWinner) {
		status = `Победитель ${gameWinner}`;
	} else {
		if (gameOn === false && gameWinner === "") {
			status = "Игрок X начинает игру";
		} else {
			status = "Следующий игрок: " + (xIsNext ? "X" : "O");
		}
	}

	const resetBoard = () => {
		setBoard((prevState) => (prevState = Array(9).fill(null)));
	};
	const handleClick = (index: number): void => {
		gameOn === false && setGameOn(true);
		if (gameWinner) {
			setGameOn(false);
			return;
		}
		const newBoard = board.slice();
		if (newBoard[index] !== null) return;
		if (xIsNext) {
			newBoard[index] = "X";
			setXIsNext(false);
		} else {
			newBoard[index] = "O";
			setXIsNext(true);
		}

		setBoard((board) => (board = newBoard));
	};

	return (
		<div className="board">
			<p>{status && <span>{status}</span>}</p>
				{board.map((sqr, index) => {
					return (
						<Square
							square={sqr}
							key={index}
							onClick={() => {
							handleClick(index);
							}}
						/>
					);
				})}
			<button className="resButton" onClick={resetBoard}>
				{gameWinner ? "Играть еще раз?" : "Сброс игры"}
			</button>
		</div>
	);
};

function calculateWinner(squares: []) {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (
			squares[a] &&
			squares[a] === squares[b] &&
			squares[a] === squares[c]
		) {
			return squares[a];
		}
	}
	return null;
}