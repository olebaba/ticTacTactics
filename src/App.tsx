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
            <div className="game-score">
                <h2>Current score:</h2>
                <h3>X: {score[0]} - O: {score[1]}</h3>
                <h5>{lastWinner && `Last winner was ${lastWinner}`}</h5>
            </div>
            <CurrentGame onScoreChange={handleScoreChange} />
        </>
    );
}