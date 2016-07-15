const key = require('../vendor/keymaster');

const GameView = function(game, context) {
  this.context = context;
  this.game = game;
  this.keysDown = {};

  const that = this;
  addEventListener("keydown", function (e) {
     that.keysDown[e.keyCode] = true;
  }, false);

  addEventListener("keyup", function (e) {
    delete that.keysDown[e.keyCode];
  }, false);
};

GameView.prototype.bindKeyHandlers = function() {
  const that = this;
  //
  // key('left', () => {
  //   that.game.teddy.moveLeft();
  // });
  //
  // key('right', () => {
  //   that.game.teddy.moveRight();
  // });
  //
  // key('up', () => {
  //   that.game.teddy.moveUp();
  // });
  //
  // key('down', () => {
  //   that.game.teddy.moveDown();
  // });


  //
  // if (38 in this.keysDown) { // Player holding up
  //   that.game.teddy.moveUp();
  // }
  // if (40 in this.keysDown) {
  //   that.game.teddy.moveDown();
  // }
  // if (37 in this.keysDown) {
  //   that.game.teddy.moveLeft();
  // }
  // if (39 in this.keysDown) {
  //   that.game.teddy.moveRight();
  // }

};

GameView.prototype.start = function() {
  const that = this;

  let _milliseconds = 0;

  this.gameInterval = setInterval(function() {
    _milliseconds += 10;

    if (_milliseconds % 1000 === 0 && that.game.werewolves.length < 15) {
      that.game.addWolf();
    }

    if (38 in that.keysDown) { // Player holding up
      that.game.teddy.moveUp();
    }
    if (40 in that.keysDown) {
      that.game.teddy.moveDown();
    }
    if (37 in that.keysDown) {
      that.game.teddy.moveLeft();
    }
    if (39 in that.keysDown) {
      that.game.teddy.moveRight();
    }

    that.game.update();
    that.game.draw(that.context);

  }, 10);
};



module.exports = GameView;
