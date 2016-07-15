const Werewolf = require('./werewolf');
const Teddy = require('./teddy');
const Util = require('./util');

const Game = function() {
  this.werewolves = [];
  this.teddy = new Teddy({ pos: [500, 300], x: Game.DIM_X, y: Game.DIM_Y });
  this.FPS = 32;
  this.NUM_WEREWOLVES = 10;

};

Game.DIM_X = 1000;
Game.DIM_Y = 600;


Game.prototype.update = function(modifier) {
  this.moveObjects();
};

Game.prototype.addWolf = function() {
  const newWolf = new Werewolf({ pos: this.randomPos(), x: Game.DIM_X, y: Game.DIM_Y });
  this.werewolves.push(newWolf);
};

Game.prototype.randomPos = function() {
  const rand = [];
  rand.push([32 + Math.floor(Math.random() * (Game.DIM_X - 32)), 0]);
  rand.push([0, 50 + Math.floor(Math.random() * (Game.DIM_Y - 50))]);
  return rand[Math.floor(Math.random() * rand.length)];
};


Game.prototype.draw = function(context) {
  context.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  const bgrImg = new Image();
  bgrImg.src = 'http://res.cloudinary.com/dl8lhjvx0/image/upload/v1468453193/1_criorz.jpg';
  context.drawImage(bgrImg, 0, 0, Game.DIM_X, Game.DIM_Y);

  this.werewolves.forEach(wolf => {
    wolf.draw(context);
  });

  this.teddy.draw(context);

};

Game.prototype.moveObjects = function() {
  this.werewolves.forEach(wolf => {
    wolf.move();
  });
};

module.exports = Game;
