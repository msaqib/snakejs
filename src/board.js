import { Snake } from "./snake"
import { Util } from "./util"
import _ from 'lodash'
export class Board {
    constructor(canvaswidth, canvasheight, rows, columns, context) {
        this.width = columns
        this.height = rows
        this.boxheight = canvasheight / rows
        this.boxwidth = canvaswidth / columns
        this.snake = new Snake(10, 10)
        this.food = null
        this.scoreObservers = []
        this.gameoverObservers = []
        this.registerKeyListener()
        this.foodVisible = false
        this.context = context
        this.foodInterval = null
    }

    clear() {
        clearInterval(this.foodInterval)
        this.context.clearRect(0, 0, this.width * this.boxwidth, this.height * this.boxheight)
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
        })
    }

    drawFood() {
        const min = 24000
        const max = 54000
        this.foodInterval = setTimeout(() => {
            if (this.foodVisible) {
                this.context.clearRect(this.food.x * this.boxwidth, this.food.y * this.boxheight, this.boxwidth, this.boxheight)
                this.food = null
                this.foodVisible = false
            }
        }, Math.floor(Math.random() * (max - min)) + min)
        let x = null
        let y = null
        do {
            x = Math.floor(Math.random() * this.width)
            y = Math.floor(Math.random() * this.height)
            this.food = {x: x, y: y}
        } while (this.snake.checkOverlap(this.food))
        
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
        this.scoreObservers.forEach(observer => observer.onScore(score))
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
    }

    update() {
        const tail = this.snake.tail
        this.context.clearRect(tail.position.x * this.boxwidth, tail.position.y * this.boxheight, this.boxwidth, this.boxheight)
        this.snake.step()
        if (this.snake.biteSelf() || this.hitWall()) {
            this.notifyGameoverObservers()
        }
        else if (this.foodVisible && _.isEqual(this.snake.head.position, this.food)) {
            clearInterval(this.foodInterval)
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

    hitWall() {
        return (this.snake.head.position.x < 0 || this.snake.head.position.y < 0 || this.snake.head.position.x >= this.width - 1 || this.snake.head.position.y > this.height - 1)
    }
}