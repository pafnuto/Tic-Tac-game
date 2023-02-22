import React from 'react';
import  "./square.css";

interface squareProps {
	square: string;
	onClick: () => void;
}

const Square = ({ square, onClick }: squareProps): JSX.Element => {
	return (
		<button
		className="Square"
		onClick={onClick}
		style={{ color: square === "X" ? "red" : "blue" }}>
		{square}
		</button>
	);
};

export default Square;