import React, { ReactElement, useState } from "react";
import { BaseGame } from "./basegame";
import Square, { XorO } from "./components/board/square";
import Board from "./components/board/board";
import { calculateWinner } from "./utilities/calculate";

export interface MultiGameProps {
    onScoreChange: (winner: XorO) => void;
}

export default function MultiGame({
    onScoreChange,
}: MultiGameProps): ReactElement {
    const [gameResults, setGameResults] = useState<XorO[]>(Array(9).fill(null));

    const handleGameResult = (gameNumber: number, winner: XorO) => {
        const newGameResults = [...gameResults];
        newGameResults[gameNumber] = winner;
        setGameResults(newGameResults);

        winner = calculateWinner(newGameResults);
        if (winner) {
            onScoreChange(winner);
        }
    };

    const multiGameElement: ReactElement[] = [];
    for (let game = 0; game < 9; game++) {
        multiGameElement.push(
            <BaseGame
                key={game}
                isMultiGame={true}
                onScoreChange={(winner) => handleGameResult(game, winner)}
            ></BaseGame>
        );
    }

    return <div className="multi-game">{multiGameElement}</div>;
}
