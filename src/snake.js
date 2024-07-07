export class Snake {
    constructor(x, y) {
        this.head = {x: x, y: y}
        this.direction = 'left'
        this.tail = {x: x + 1, y: y}
    }

    turnLeft() {
        if (this.direction !== 'left' && this.direction !== 'right') {
            this.direction = 'left'
        }
    }

    turnRight() {
        if (this.direction !== 'left' && this.direction !== 'right') {
            this.direction = 'right'
        }
    }

    turnUp() {
        if (this.direction !== 'up' && this.direction !== 'down') {
            this.direction = 'up'
        }
    }

    turnDown() {
        if (this.direction !== 'up' && this.direction !== 'down') {
            this.direction = 'down'
        }
    }

    step() {
        if (direction === 'right') {
            this.head.x = this.head.x + 1
        }

        else if (direction === 'left') {
            this.head.x = this.head.x - 1
        }

        else if (direction === 'up') {
            this.head.y = this.head.y - 1
        }

        else if (direction === 'down') {
            this.head.y = this.head.y + 1
        }
    }
}