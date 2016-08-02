const GameView = require("./game_view");
const Game = require('./game');
const sweetalert = require('sweetalert');

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];

  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const context = canvasEl.getContext("2d");

  sweetalert({
    title: "Survival of the Teddy!",
    text: "Use arrow keys to avoid the werewolves. Press spacebar to pause. Good luck!",
    type: "warning",
    showCancelButton: false,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "Start",
    cancelButtonText: "Cancel",
    closeOnConfirm: true,
    closeOnCancel: true
  },
    function(isConfirm){
      if (isConfirm) {
        new GameView(context).start();
      }
    });
});
