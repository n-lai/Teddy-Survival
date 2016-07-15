const GameView = require("./game_view");
const Game = require('./game');

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];

  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const context = canvasEl.getContext("2d");
  new GameView(context).start();
});
