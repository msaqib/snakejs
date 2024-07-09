const segments = Object.freeze({
    TOPLEFT: Symbol('topleft'),
    TOPRIGHT: Symbol('topright'),
    BOTTOMRIGHT: Symbol('bottomright'),
    BOTTOMLEFT: Symbol('bottomleft'),
    HORIZONTAL: Symbol('horizontal'),
    VERTICAL: Symbol('vertical')
})

export class Segment {
    constructor(x, y) {
        this.orientation = 'horizontal'
        this.position = {x: x, y: y}
    }
}