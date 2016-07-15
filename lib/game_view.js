const Game = require('./game');

const GameView = function(context) {
  this.context = context;
  this.game = new Game();
  this.keysDown = {};
  this.pause = true;
  this.timer = 0;

  addEventListener("keydown", (e) => {
    this.keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", (e) => {
    delete this.keysDown[e.keyCode];
  }, false);
};


GameView.prototype.start = function() {
  this.pause = false;
  let _milliseconds = 0;

  this.gameInterval = setInterval(() => {
    _milliseconds += 10;

    if (_milliseconds % 1000 === 0 && this.game.werewolves.length < 15) {
      this.game.addWolf();
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
    this.game = new Game();
  }
};

GameView.prototype.checkPause = function() {
  if (this.pause) {
    clearInterval(this.gameInterval);
  }
};

GameView.prototype.resume = function(e) {
  e.preventDefault();
  $("#pause").off("click");
  $("#pause").text("pause");
  $("#pause").on("click", this.pause.bind(this));
  this.start();
};

GameView.prototype.pause = function(e) {
  e.preventDefault();
  this.isPause = true;
  $("#pause").off("click");
  $("#pause").text("resume");
  $("#pause").on("click", this.resume.bind(this));
};


module.exports = GameView;
