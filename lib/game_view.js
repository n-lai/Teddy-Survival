const Game = require('./game');
const sweetalert = require('sweetalert');

const GameView = function(context) {
  this.context = context;
  this.game = new Game();
  this.keysDown = {};
  this.pause = true;

  addEventListener("keydown", (e) => {
    this.keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", (e) => {
    delete this.keysDown[e.keyCode];
  }, false);

  $("#pause").on("click", this.pause.bind(this));
};

GameView.prototype.start = function() {
  this.pause = false;
  let _milliseconds = 0;

  this.gameInterval = setInterval(() => {
    _milliseconds += 10;

    if (_milliseconds % 1000 === 0 && this.game.werewolves.length < 15) {
      this.game.addWolf();
    }

    if (_milliseconds % 1000 === 0) {
      this.game.secondsElapsed += 1;
    }

    if (38 in this.keysDown) {
      this.game.teddy.moveUp();
    }
    if (40 in this.keysDown) {
      this.game.teddy.moveDown();
    }
    if (37 in this.keysDown) {
      this.game.teddy.moveLeft();
    }
    if (39 in this.keysDown) {
      this.game.teddy.moveRight();
    }

    this.restartGame();
    this.game.update();
    this.game.draw(this.context);

  }, 10);

};

GameView.prototype.restartGame = function() {
  if (this.game.gameOver) {
    this.pause = true;
    this.keysDown = {};
    const that = this;

    sweetalert({
      title: `Your teddy survived for ${this.game.secondsElapsed} seconds!`,
      text: "Click below to start another game. Good luck!",
      type: "error",
      showCancelButton: false,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Start",
      cancelButtonText: "Cancel",
      closeOnConfirm: true,
      closeOnCancel: true
    },
      function(isConfirm) {
        if (isConfirm) {
          clearInterval(that.gameInterval);
          that.game = new Game();
          that.start();
        }
      });

  }
};

GameView.prototype.pause = function(e) {
  e.preventDefault();

  this.pause = true;
};

GameView.prototype.checkIfPause = function() {
  if (this.pause) {
    clearInterval(this.gameInterval);
  }
};

module.exports = GameView;
