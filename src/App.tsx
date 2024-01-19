import React, { ReactElement, useState } from "react";
import { BaseGame } from "./basegame";
import SelectGame, { GameMode } from "./components/select/select-game";
import MultiGame from "./multigame";
import { XorO } from "./components/board/square";

export default function GameOverview(): ReactElement {
    const [score, setScore] = useState<number[]>(Array(2).fill(0));
    const [lastWinner, setLastWinner] = useState<XorO>(null);
    const [gameMode, setGameMode] = useState(new GameMode(0, "Simple"));

    const handleScoreChange = (winner: XorO) => {
        const newScore = [...score.slice()];
        newScore[winner === "X" ? 0 : 1]++;
        setScore(newScore);
        setLastWinner(winner);
    };

    const handleGameModeChange = (gameMode: GameMode) => {
        setGameMode(gameMode);
    };

    return (
        <>
            <div className="logo">Tic Tac Tactics</div>
            <div className="game-mode">
                <SelectGame
                    labelId={gameMode.label}
                    currentGameMode={gameMode}
                    onGameModeChange={handleGameModeChange}
                />
            </div>
            <div className="game-score">
                <h3>Current score:</h3>
                <h4>
                    X: {score[0]} - O: {score[1]}
                </h4>
                <h5>{lastWinner && `Last winner was ${lastWinner}`}</h5>
            </div>
            {gameMode.value === 0 ? (
                <BaseGame onScoreChange={handleScoreChange} />
            ) : (
                <MultiGame onScoreChange={handleScoreChange} />
            )}
        </>
    );
}
