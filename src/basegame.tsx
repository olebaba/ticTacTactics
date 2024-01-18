import React, { ReactElement, useState } from 'react';

export type XorO = 'X' | 'O' | null
interface SquareProps { value: XorO; onSquareClick: () => void; }

function Square({ value, onSquareClick }: SquareProps): ReactElement {
    return (<button className="square" onClick={onSquareClick}> {value} </button>);
}

interface BoardProps {
    xIsNext: boolean;
    squares: XorO[];
    onPlay: (squares: XorO[]) => void;
    onWin: (winner: XorO) => void;
}

function Board({ xIsNext, squares, onPlay, onWin }: BoardProps): ReactElement[] {
    function handleClick(i: number) {
        let winner = calculateWinner(squares);
        if (winner || squares[i]) return;
        const newSquares = squares.slice();
        if (xIsNext) { newSquares[i] = 'X'; }
        else { newSquares[i] = 'O'; }
        onPlay(newSquares);
        winner = calculateWinner(newSquares);
        if (winner) { onWin(winner); }
    }

    const boardRowsAndSquares: ReactElement[] = [];
    for (let rowNumber = 0; rowNumber < 3; rowNumber++) {
        const row: JSX.Element[] = [];
        for (let col = 0; col < 3; col++) {
            const index = rowNumber * 3 + col;
            row.push(
                <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} />
            );
        }
        boardRowsAndSquares.push(<div key={rowNumber} className="board-row"> {row} </div>);
    }

    return (boardRowsAndSquares);
}

interface CurrentGameProps {
    onScoreChange: (winner: XorO) => void
}

export function CurrentGame({ onScoreChange }: CurrentGameProps): ReactElement {
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
            description = 'Go to move #' + move;
        } else {
            description = 'Reset game';
        }
        return (
            <li key={move}>
                <button className={`moves ${move === 0 ? 'restart' : ''}`} onClick={() => jumpTo(move)}>{description}</button>
            </li >
        );
    });

    let winner: string | null = calculateWinner(currentSquares);
    if (winner) { status = 'Winner: ' + winner; }
    else if (!currentSquares.some(square => square === null)) { status = 'Game is tied!'; winner = "tied" }
    else { status = 'Next player: ' + (xIsNext ? 'X' : 'O'); }

    return (
        <div className="game">
             <div>
                <div className="status">{status}</div>
                <div className={`game-board ${winner ? 'finished' : ''}`}>
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onWin={handleWin} />
                </div>
            </div>
            <div className="game-info">
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

function calculateWinner(squares: XorO[]): XorO | null {
    const winnerLines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],];
    for (let i = 0; i < winnerLines.length; i++) {
        const [a, b, c] = winnerLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}