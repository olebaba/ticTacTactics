import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, onWin }) {
  function handleClick(i) {
    let winner = calculateWinner(squares);
    if (winner || squares[i]) return;
    const newSquares = squares.slice();
    if (xIsNext) {
      newSquares[i] = 'X';
    } else {
      newSquares[i] = 'O';
    }
    onPlay(newSquares);
    winner = calculateWinner(newSquares);
    if (winner){
      onWin(winner);
    }
  }

  const boardRowsAndSquares = [];
  for (let rowNumber = 0; rowNumber < 3; rowNumber++) {
    const row = [];
    for (let col = 0; col < 3; col++) {
      const index = rowNumber * 3 + col;
      row.push(
        <Square
          key={index}
          value={squares[index]}
          onSquareClick={() => handleClick(index)}
        />
      );
    }
    boardRowsAndSquares.push(
      <div key={rowNumber} className="board-row">
        {row}
      </div>
    );
  }

  return (
    <>
      {boardRowsAndSquares}
    </>
  );
}

function CurrentGame({ onScoreChange }) {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  let status;

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleWin(winner){
    console.log("winner is", winner);
    winner ? onScoreChange(winner) : null;
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Reset game';
    }
    return (
      <li key={move}>
        <button className={`moves ${move === 0 ? 'restart' : ''}`} onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  const winner = calculateWinner(currentSquares);
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      <div className={`game-board ${winner ? 'finished' : ''}`}>
        <div className="status">{status}</div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onWin={handleWin} />
      </div>
    </div>
  );
}

export default function GameOverview() {
  const [score, setScore] = useState(Array(2).fill(0));
  const [lastWinner, setLastWinner] = useState('');

  function handleScoreChange(winner) {
    const newScore = [...score.slice()];
    newScore[winner === "X" ? 0 : 1]++;
    setScore(newScore);
    setLastWinner(winner);
  }

  return (
    <>
      <div className='game-score'>
        <h2>Current score:</h2>
        <h3>X: {score[0]} - O: {score[1]}</h3>
        <h5>{lastWinner && `Last winner was ${lastWinner}`}</h5>
      </div>
      <CurrentGame onScoreChange={handleScoreChange} />
    </>
  )
}

/** @returns {'X' | 'O'} */
function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
