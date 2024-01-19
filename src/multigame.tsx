import React, { ReactElement, useState } from "react";
import { BaseGame } from "./basegame";
import { XorO } from "./components/board/square";
import { calculateWinner } from "./utilities/calculate";
import { BoardLayout } from "./objects/history";

export interface MultiGameProps {
    onScoreChange: (winner: XorO) => void;
}

export default function MultiGame({
    onScoreChange,
}: MultiGameProps): ReactElement {
    const [globalHistory, setGlobalHistory] = useState<XorO[][][]>(Array(Array(Array(9).fill(null))));
    const [gameResults, setGameResults] = useState<BoardLayout>(new BoardLayout(3));
    const [currentGlobalMove, setCurrentGlobalMove] = useState<number>(0);
    const xIsNextGlobal: boolean = currentGlobalMove % 2 === 0;

    const handleGameResult = (gameNumber: number, winner: XorO) => {
        const newGameResults = {...gameResults};
        newGameResults.layout[gameNumber] = winner;
        setGameResults(newGameResults);

        winner = calculateWinner(newGameResults);
        if (winner) {
            onScoreChange(winner);
        }
    };

    // const handleGlobalMove = (game: number, nextSquares: XorO[]) => {
    //     const nextGlobalHistory = globalHistory[game].slice() 
    //     nextGlobalHistory[game][currentGlobalMove + 1] = [nextSquares];
    //     setGlobalHistory(nextGlobalHistory[game]);
    //     setCurrentGlobalMove(globalHistory.length - 1);
    // }

    const multiGameElement: ReactElement[] = [];
    for (let game = 0; game < 9; game++) {
        multiGameElement.push(
            <BaseGame
                key={game}
                isMultiGame={true}
                onScoreChange={(winner) => handleGameResult(game, winner)}
                xIsNextGlobal={xIsNextGlobal}
                // onGlobalMove={() => handleGlobalMove}
            ></BaseGame>
        );
    }

    return <div className="multi-game">{multiGameElement}</div>;
}
