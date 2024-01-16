import React, { ReactElement, useState } from 'react';
import { XorO, CurrentGame } from './basegame';

export default function GameOverview(): ReactElement {
    const [score, setScore] = useState<number[]>(Array(2).fill(0));
    const [lastWinner, setLastWinner] = useState<XorO>(null);

    const handleScoreChange = (winner: XorO) => {
        const newScore = [...score.slice()];
        newScore[winner === 'X' ? 0 : 1]++;
        setScore(newScore);
        setLastWinner(winner);
    };

    return (
        <>
            <div className='logo'>Tic Tac Tactics</div>
            <div className='game-mode'>
                <h2>Choose game mode</h2>
                <select>
                    <option value={1}>Simple</option>
                    <option value={2}>Advanced</option>
                </select>
            </div>
            <div className="game-score">
                <h3>Current score:</h3>
                <h4>X: {score[0]} - O: {score[1]}</h4>
                <h5>{lastWinner && `Last winner was ${lastWinner}`}</h5>
            </div>
            <CurrentGame onScoreChange={handleScoreChange} />
        </>
    );
}