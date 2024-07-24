import _ from 'lodash'
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
        if (!_.isEqual(this.direction, {x: 1, y: 0})) {
            this.direction = {x: -1, y: 0}
        }
    }

    turnRight() {
        if (!_.isEqual(this.direction, {x: -1, y: 0})) {
            this.direction = {x: 1, y: 0}
        }
    }

    turnUp() {
        if (!_.isEqual(this.direction, {x: 0, y: 1})) {
            this.direction = {x: 0, y: -1}
        }
    }

    turnDown() {
        if (!_.isEqual(this.direction, {x: 0, y: -1})) {
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
            if (_.isEqual(this.head.position, this.body[i].position))
                return true
        }
        return false
    }

    checkOverlap(coordinates) {
        return this.body.some( (segment) => {
            return _.isEqual(segment.position, coordinates)
        })
    }
}