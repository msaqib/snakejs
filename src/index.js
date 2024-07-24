import { Game } from "./game";

const canvas = document.getElementById('game')
const context = canvas.getContext("2d");
canvas.width = 600
canvas.height = 600

const startButton = document.getElementById('start')

const game = new Game(context)
game.start.bind(game)
startButton.onclick = () => game.start()
game.start(context)  