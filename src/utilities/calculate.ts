import { XorO } from "../components/board/square";
import { BoardLayout } from "../objects/history";

export function calculateWinner(squares: BoardLayout): XorO | null {
    const winnerLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < winnerLines.length; i++) {
        const [a, b, c] = winnerLines[i];
        if (
            squares.layout[a] &&
            squares.layout[a] === squares.layout[b] &&
            squares.layout[a] === squares.layout[c]
        ) {
            return squares.layout[a];
        }
    }
    return null;
}
