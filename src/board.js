import { Snake } from "./snake"
import { Util } from "./util"
export class Board {
    constructor(canvaswidth, canvasheight, rows, columns, context) {
        this.width = columns
        this.height = rows
        this.boxheight = canvasheight / rows
        this.boxwidth = canvaswidth / columns
        this.snake = new Snake(10, 10)
        this.food = null
        this.scoreObservers = []
        this.gameObservers = []
        this.registerKeyListener()
        this.foodVisible = false
        this.snakeCorner = null
        this.context = context
    }

    registerKeyListener() {
        document.addEventListener('keydown', (event) => {
            const key = event.key
            const prevDirection = this.snake.direction
            switch(key){
                case "ArrowLeft":
                    this.snake.turnLeft()
                    break;
                case "ArrowRight":
                    this.snake.turnRight()
                    break
                case "ArrowUp":
                    this.snake.turnUp()
                    break
                case "ArrowDown":
                    this.snake.turnDown()
                    break
            }
            const newDirection = this.snake.direction
            this.snakeCorner = Util.whichCorner(prevDirection, newDirection)
        })
    }

    drawFood() {
        const x = Math.floor(Math.random() * this.width)
        const y = Math.floor(Math.random() * this.height)
        this.food = {x: x, y: y}
        this.context.fillStyle = 'red'
        this.context.fillRect(x * this.boxwidth + this.boxwidth / 4, y * this.boxheight + this.boxheight / 4, this.boxwidth / 2, this.boxheight / 2)
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

    drawGrid() {
        this.context.strokeStyle = '#ddd'
        for (let i = 0 ; i < this.width ; i++) {
            for (let j = 0 ; j < this.height ; j++) {
                this.context.strokeRect(j * this.boxwidth, i * this.boxheight, this.boxwidth, this.boxheight)
                this.context.stroke()
            }
        }
        this.context.strokeStyle = 'black'
    }

    drawInitialSnake() {
        for (let segment of this.snake.body) {
            this.drawSegment(segment.position.x, segment.position.y, this.boxwidth, this.boxheight)
        }
        // for (let i = this.snake.head.position.x ; i <= this.snake.tail.position.x ; i++) {
        //     this.drawHorizontalLine(i, this.snake.head.position.y, this.boxwidth, this.boxheight)
        // }
    }

    update() {
        const tail = this.snake.tail
        this.context.clearRect(tail.position.x * this.boxwidth, tail.position.y * this.boxheight, this.boxwidth, this.boxheight)
        this.snake.step()
        if (this.snake.biteSelf()) {
            console.log('Dead')
            this.notifyGameoverObservers()
        }
        else if (this.foodVisible && this.snake.head.position.x === this.food.x && this.snake.head.position.y === this.food.y) {
            this.notifyScoreObservers()
            this.context.clearRect(this.snake.head.position.x * this.boxwidth, this.snake.head.position.y * this.boxheight, this.boxwidth, this.boxheight)
            this.food = null
            this.foodVisible = false
        }
        else {
            this.snake.moveTail()
        }
        this.render()
        const rand = Math.random()
        if (rand > 0.5 && !this.foodVisible) {
            this.foodVisible = true
            this.drawFood()
        }
    }

    render() {
        this.context.strokeStyle = 'black'
        this.context.fillStyle = 'black'
        this.drawSegment(this.snake.head.position.x, this.snake.head.position.y)
    }

    drawSegment(x, y) {
        this.context.strokeStyle = 'black'
        this.context.fillStyle = 'black'
        this.context.fillRect(x * this.boxwidth, y * this.boxheight, this.boxwidth, this.boxheight)
        this.context.stroke()
    }
}