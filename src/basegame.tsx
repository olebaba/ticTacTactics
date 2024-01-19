import React, { ReactElement, useState } from "react";
import { calculateWinner } from "./utilities/calculate";
import { XorO } from "./components/board/square";
import GameBoard from "./components/board/board";

interface CurrentGameProps {
    onScoreChange: (winner: XorO) => void;
    isMultiGame?: boolean;
}

export function BaseGame({
    onScoreChange,
    isMultiGame,
}: CurrentGameProps): ReactElement {
    const [history, setHistory] = useState<XorO[][]>([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const xIsNext: boolean = currentMove % 2 === 0;
    const currentSquares: XorO[] = history[currentMove];
    let status: string;

    const handlePlay = (nextSquares: XorO[]) => {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    };

    const handleWin = (winner: XorO) => {
        winner ? onScoreChange(winner) : null;
    };

    const jumpTo = (nextMove: number) => {
        nextMove === 0 ? setHistory([Array(9).fill(null)]) : null;
        setCurrentMove(nextMove);
    };

    const moves = history.map((_, move: number) => {
        let description: string;
        if (move > 0) {
            description = "Go to move #" + move;
        } else {
            description = "Reset game";
        }
        return (
            <li key={move}>
                <button
                    className={`moves ${move === 0 ? "restart" : ""}`}
                    onClick={() => jumpTo(move)}
                >
                    {description}
                </button>
            </li>
        );
    });

    let winner: string | null = calculateWinner(currentSquares);
    if (winner) {
        status = "Winner: " + winner;
    } else if (!currentSquares.some((square) => square === null)) {
        status = "Game is tied!";
        winner = "tied";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            <div>
                {!isMultiGame && <div className="status">{status}</div>}
                <div className={`game-board ${winner ? "finished" : ""}`}>
                    <GameBoard
                        xIsNext={xIsNext}
                        squareValues={currentSquares}
                        onPlay={handlePlay}
                        onWin={handleWin}
                    />
                </div>
            </div>
            {!isMultiGame && (
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            )}
        </div>
    );
}
