const MovingObject = function(options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.x = options.x;
  this.y = options.y;
  this.width = options.width;
  this.height = options.height;
  this.game = options.game;
};



MovingObject.prototype.move = function() {
  if (this.isInBounds()) {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  } else {
    if (this.x > this.game.width - this.width) {
      this.vel[0] *= -1;
    } else if (this.y > this.game.height - this.height) {
      this.vel[-1] *= -1;
    }
  }
};

module.exports = MovingObject;
