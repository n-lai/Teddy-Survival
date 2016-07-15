const MovingObject = require('./moving_object');
const Util = require('./util');

const Werewolf = function(options) {
  MovingObject.call(this, {
    pos: options.pos,
    x: options.x,
    y: options.y,
    width: 32,
    height: 50
  });

  this.vel = this.randomVel();

  this.width = 32;
  this.height = 50;
};

Util.inherits(Werewolf, MovingObject);

Werewolf.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];

  this.stayInBounds();
};

Werewolf.prototype.randomVel = function(context) {
  return [Math.random() * 5, Math.random() * 5];
};

Werewolf.prototype.draw = function(context) {
  const wolfImg = new Image();
  wolfImg.src = 'http://res.cloudinary.com/dl8lhjvx0/image/upload/z_2.0,c_scale/v1468454199/werewolf_top_ca58jk.png';
  context.drawImage(wolfImg, this.pos[0], this.pos[1], this.width, this.height);
};

Werewolf.prototype.stayInBounds = function() {
  if (this.pos[0] > 1000 - 32 || this.pos[0] < 0) {
    this.vel[0] *= -1;
  } else if (this.pos[1] > 600 - 50 || this.pos[1] < 0) {
    this.vel[1] *= -1;
  }
};

module.exports = Werewolf;
