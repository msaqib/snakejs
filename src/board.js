import { Snake } from "./snake"
export class Board {
    constructor(canvaswidth, canvasheight, columns, rows) {
        this.width = columns
        this.height = rows
        this.boxheight = canvasheight / rows
        this.boxwidth = canvaswidth / columns
        this.snake = new Snake(100, 100)
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
        context.strokeStyle = 'black'
        context.fillStyle = 'black'
        this.drawHorizontalLine(context, this.snake.head.position.x, this.snake.head.position.y)
        this.drawHorizontalLine(context, this.snake.tail.position.x, this.snake.tail.position.y)
    }

    drawTopLeftLShape(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + size / 2, y);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.lineTo(x, y + size / 2);
        ctx.closePath();
        ctx.fill();
    }

    // Top Right L-shape
    drawTopRightLShape(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x + size, y);
        ctx.lineTo(x + size / 2, y);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.lineTo(x + size, y + size / 2);
        ctx.closePath();
        ctx.fill();
    }

    // Bottom Right L-shape
    drawBottomRightLShape(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x + size, y + size);
        ctx.lineTo(x + size / 2, y + size);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.lineTo(x + size, y + size / 2);
        ctx.closePath();
        ctx.fill();
    }

    // Bottom Left L-shape
    drawBottomLeftLShape(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x, y + size);
        ctx.lineTo(x + size / 2, y + size);
        ctx.lineTo(x + size / 2, y + size / 2);
        ctx.lineTo(x, y + size / 2);
        ctx.closePath();
        ctx.fill();
    }

    // Horizontal Line
    drawHorizontalLine(ctx, x, y) {
        const size = 1;
        console.log(x, y, this.boxwidth, this.boxheight);
        // console.log((x + size) * this.boxwidth, (y + size / 2) * this.boxheight);
        ctx.beginPath();
        ctx.moveTo(x * this.boxwidth, (y + size / 2) * this.boxheight);
        ctx.lineTo((x + size) * this.boxwidth, (y + size / 2) * this.boxheight);
        ctx.stroke();
    }

    // Vertical Line
    drawVerticalLine(ctx, x, y) {
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x + size / 2, y + size);
        ctx.stroke();
    }
}