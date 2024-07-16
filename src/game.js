import { Board } from "./board";
export class Game {
    constructor(context) {
        this.board = new Board(600, 600, 30, 30, context)
        this.boundUpdate = this.update.bind(this)
    }

    update() {
        this.board.update()
    }

    start() {
        this.board.drawInitialSnake()
        setInterval(this.boundUpdate, 2000)
    }
}