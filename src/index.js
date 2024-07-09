import { Game } from "./game";

const game = new Game()
const canvas = document.getElementById('game')
const context = canvas.getContext("2d");

game.update(context)  