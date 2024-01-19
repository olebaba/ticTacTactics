import { XorO } from "../components/board/square";

export class BoardLayout {
    layout: XorO[];

    constructor(grid: number) {
        this.layout = Array(grid*grid).fill(null);
    }
}

export class GameHistory {
    history: BoardLayout[];

    constructor(grid: number) {
        this.history = Array(grid * grid).fill(new BoardLayout(grid));
    }
}

export class GlobalGameHistory {
    gameLayout: GameHistory[];

    constructor(grid: number) {
        this.gameLayout = Array(grid * grid).fill(new GameHistory(grid));
    }
}
