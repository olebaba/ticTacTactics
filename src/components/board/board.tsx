import React, { ReactElement, useState } from "react";
import Square, { XorO } from "./square";
import { calculateWinner } from "../../utilities/calculate";


interface BoardProps {
    xIsNext: boolean;
    squareValues: XorO[];
    onPlay: (squares: XorO[]) => void;
    onWin: (winner: XorO) => void;
}

export default function Board({
    xIsNext,
    squareValues,
    onPlay,
    onWin,
}: BoardProps): ReactElement[] {
    function handleClick(i: number) {
        let winner = calculateWinner(squareValues);
        if (winner || squareValues[i]) return;
        const newSquares = squareValues.slice();
        if (xIsNext) {
            newSquares[i] = "X";
        } else {
            newSquares[i] = "O";
        }
        onPlay(newSquares);
        winner = calculateWinner(newSquares);
        if (winner) {
            onWin(winner);
        }
    }

    const boardRowsAndSquares: ReactElement[] = [];
    for (let rowNumber = 0; rowNumber < 3; rowNumber++) {
        const row: ReactElement[] = [];
        for (let col = 0; col < 3; col++) {
            const index = rowNumber * 3 + col;
            row.push(
                <Square
                    key={index}
                    value={squareValues[index]}
                    onSquareClick={() => handleClick(index)}
                    />
            );
        }
        boardRowsAndSquares.push(
            <div key={rowNumber} className="board-row">
                {" "}
                {row}{" "}
            </div>
        );
    }

    return boardRowsAndSquares;
}