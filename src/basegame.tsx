import React, { ReactElement, useState } from "react";
import { calculateWinner } from "./utilities/calculate";
import { XorO } from "./components/board/square";
import GameBoard from "./components/board/board";
import { GameHistory, BoardLayout } from "./objects/history";

interface CurrentGameProps {
    onScoreChange: (winner: XorO) => void;
    onGlobalMove?: () => void;
    isMultiGame?: boolean;
    xIsNextGlobal?: boolean;
}

export function BaseGame({
    onScoreChange,
    onGlobalMove,
    isMultiGame,
    xIsNextGlobal
}: CurrentGameProps): ReactElement {
    const [localHistory, setLocalHistory] = useState(new GameHistory(3));
    const [currentMove, setCurrentMove] = useState<number>(0);
    const currentSquares: BoardLayout = localHistory.history.at(currentMove)!; //todo: remove null assert?
    const xIsNext: boolean = currentMove % 2 === 0;
    let status: string;

    const handlePlay = (nextSquares: BoardLayout) => {
        const nextHistory: GameHistory = {...localHistory};
        nextHistory.history[currentMove + 1] = nextSquares;
        setLocalHistory(nextHistory);
        setCurrentMove(nextHistory.history.length - 1);
    };

    const handleWin = (winner: XorO) => {
        winner ? onScoreChange(winner) : null;
    };

    const jumpTo = (nextMove: number) => {
        nextMove === 0 ? setLocalHistory(new GameHistory(3)) : null;
        setCurrentMove(nextMove);
    };

    const moves = localHistory.history.map((_, move: number) => {
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
    } else if (!currentSquares.layout.some((square) => square === null)) {
        status = "Game is tied!";
        winner = "tied";
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
            {winner && (
                <div className="winner">{winner}</div>
            )}
            <div>
                {!isMultiGame && <div className="status">{status}</div>}
                <div className={`game-board ${winner ? "finished" : ""}`}>
                    <GameBoard
                        xIsNext={xIsNextGlobal ? xIsNextGlobal : xIsNext}
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
