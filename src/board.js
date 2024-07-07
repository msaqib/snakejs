export class Board {
    constructor(width, height, snake) {
        this.width = width
        this.height = height
        this.snake = snake
        this.fruit = null
        this.scoreObservers = []
        this.gameObservers = []
    }

    addScoreObserver(observer) {
    this.scoreObservers.push(observer)
    }

    removeScoreObserver(observer) {
        this.scoreObservers = this.scoreObservers.filter(ob => ob !== observer)
    }

    notifyScoreObservers(score) {
        this.scoreObservers.forEach(observer => observer.update(score))
    }

    addGameoverObserver(observer) {
    this.gameoverObservers.push(observer)
    }

    removeGameoverObserver(observer) {
        this.gameoverObservers = this.gameoverObservers.filter(ob => ob !== observer)
    }

    notifyGameoverObservers() {
        this.gameoverObservers.forEach(observer => observer.end())
    }

    render(context) {
        const cellWidth = context.canvas.width / this.width;
        const cellHeight = context.canvas.height / this.height;

        
    }
}