import React, { ReactElement, useState } from 'react';
import { XorO, CurrentGame } from './basegame';
import SelectGame from './components/select/select-game';

export default function GameOverview(): ReactElement {
    const [score, setScore] = useState<number[]>(Array(2).fill(0));
    const [lastWinner, setLastWinner] = useState<XorO>(null);
    // const [gameMode, setGameMode] = useState(0);

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
                <SelectGame  />
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