import React, { ReactElement, useState } from "react";

export type XorO = "X" | "O" | null;
interface SquareProps {
    value: XorO;
    boardElements?: ReactElement;
    onSquareClick: () => void;
}

export default function Square({
    value,
    boardElements,
    onSquareClick,
}: SquareProps): ReactElement {
    if (boardElements){
        return (
            boardElements
        )
    }
    return (
        <button title={`Click to draw X or O`} className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}
