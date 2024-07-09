import { Board } from "./board";
export class Game {
    constructor() {
        this.board = new Board(600, 600, 120, 120)
    }

    update(context) {
        this.board.render(context)
    }
}