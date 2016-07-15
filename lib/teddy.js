const MovingObject = require('./moving_object');
const Util = require('./util');

const Teddy = function(options) {
  MovingObject.call(this, {
    pos: options.pos,
    x: options.x,
    y: options.y
  });

  this.speed = 5;
  this.width = 20;
  this.height = 25;
};

Util.inherits(Teddy, MovingObject);

Teddy.prototype.draw = function(context) {
  const teddyImg = new Image();
  teddyImg.src = 'http://res.cloudinary.com/dl8lhjvx0/image/upload/v1468431900/bear_transparent_chauaj.png';
  context.drawImage(teddyImg, this.pos[0], this.pos[1], this.width, this.height);
};

Teddy.prototype.stayInBounds = function() {
  this.pos[0] = Math.max(0, this.pos[0]);
  this.pos[0] = Math.min(this.pos[0], this.x - 20);

  this.pos[1] = Math.max(0, this.pos[1]);
  this.pos[1] = Math.min(this.pos[1], this.y - 25);
};

Teddy.prototype.moveLeft = function() {
  this.pos[0] -= this.speed;
  this.stayInBounds();
};

Teddy.prototype.moveRight = function() {
  this.pos[0] += this.speed;
  this.stayInBounds();
};

Teddy.prototype.moveUp = function() {
  this.pos[1] -= this.speed;
  this.stayInBounds();
};

Teddy.prototype.moveDown = function() {
  this.pos[1] += this.speed;
  this.stayInBounds();
};

Teddy.prototype.isCollidedWith = function(wolf) {
  let collided = false;

  if (
    this.pos[0] <= (wolf.pos[0] + 32)
    && wolf.pos[0] <= (this.pos[0] + 25)
    && this.pos[1] <= (wolf.pos[1] + 50)
    && wolf.pos[1] <= (this.pos[1] + 25)
  ) {
    collided = true;
  }
  return collided;
};


module.exports = Teddy;
