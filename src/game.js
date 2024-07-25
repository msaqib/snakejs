import { Board } from "./board";
export class Game {
    constructor(context) {
        this.context = context
        this.updateInterval = null
        this.boundUpdate = this.update.bind(this)
        this.scoreElement = document.getElementById('score')
    }

    initBoard() {
        this.board = new Board(600, 600, 30, 30, this.context)
        this.board.clear()
        if (this.updateInterval) {
            clearInterval(this.updateInterval)
        }
        this.scoreElement.innerText = this.score
    }

    update() {
        this.board.update()
    }

    end() {
        clearInterval(this.updateInterval)
    }

    onScore() {
        this.score += 1
        this.scoreElement.innerText = this.score
    }

    start() {
        this.score = 0
        this.initBoard()
        this.board.drawInitialSnake()
        this.board.addGameoverObserver(this)
        this.board.addScoreObserver(this)
        this.updateInterval = setInterval(this.boundUpdate, 800)
    }
}