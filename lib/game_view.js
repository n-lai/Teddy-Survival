const key = require('../vendor/keymaster');

const GameView = function(game, context) {
  this.context = context;
  this.game = game;

  this.bindKeyHandlers();
};

GameView.prototype.bindKeyHandlers = function() {
  const that = this;

  key('left', () => {
    that.game.teddy.moveLeft();
  });

  key('right', () => {
    that.game.teddy.moveRight();
  });

  key('up', () => {
    that.game.teddy.moveUp();
  });

  key('down', () => {
    that.game.teddy.moveDown();
  });

};

GameView.prototype.start = function() {
  const that = this;

  let _milliseconds = 0;

  this.gameInterval = setInterval(function() {
    _milliseconds += 10;

    if (_milliseconds % 1000 === 0 && that.game.werewolves.length < 15) {
      that.game.addWolf();
    }

    that.game.update();
    that.game.draw(that.context);

  }, 10);
};



module.exports = GameView;
