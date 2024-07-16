export class Snake {
    constructor(x, y) {
        this.body = [{position: {x: x, y: y}}, {position: {x: x + 1, y: y}}, {position: {x: x + 2, y: y}}]
        this.direction = {x: -1, y: 0}
    }

    get head() {
        return this.body[0]
    }

    get tail() {
        return this.body[this.body.length - 1]
    }

    turnLeft() {
        if (!(this.direction.x === 1 && this.direction === 0)) {
            this.direction = {x: -1, y: 0}
        }
    }

    turnRight() {
        if (!(this.direction.x === -1 && this.direction.y === 0)){
            this.direction = {x: 1, y: 0}
        }
    }

    turnUp() {
        if (!(this.direction.x === 0 && this.direction.y === 1)) {
            this.direction = {x: 0, y: -1}
        }
    }

    turnDown() {
        if (!(this.direction.x === 0 && this.direction.y === -1)) {
            this.direction = {x: 0, y: 1}
        }
    }

    step() {
        const newHead = {position: {x: this.body[0].position.x + this.direction.x, y: this.body[0].position.y + this.direction.y}}
        this.body.unshift(newHead)
    }

    moveTail() {
        this.body.pop()
    }

    biteSelf() {
        for (let i = 1 ; i < this.body.length ; i++) {
            if (this.head.position.x === this.body[i].position.x && this.head.position.y === this.body[i].position.y)
                return true
        }
        return false
    }
}