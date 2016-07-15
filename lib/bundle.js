/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(5);
	const Game = __webpack_require__(1);
	
	document.addEventListener("DOMContentLoaded", function() {
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const context = canvasEl.getContext("2d");
	  new GameView(context).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Werewolf = __webpack_require__(2);
	const Teddy = __webpack_require__(7);
	const Util = __webpack_require__(4);
	
	const Game = function() {
	  this.werewolves = [];
	  this.teddy = new Teddy({ pos: [500, 300], x: Game.DIM_X, y: Game.DIM_Y });
	  this.secondsElapsed = 0;
	  this.gameOver = false;
	};
	
	Game.DIM_X = 1000;
	Game.DIM_Y = 600;
	
	Game.prototype.isGameOver = function() {
	  this.werewolves.forEach(wolf => {
	    if (this.teddy.isCollidedWith(wolf)) {
	      this.gameOver = true;
	    }
	  });
	};
	
	Game.prototype.update = function() {
	  this.moveObjects();
	  this.isGameOver();
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
	
	  context.fillStyle = "rgb(250, 250, 250)";
	  context.font = "24px Helvetica";
	  context.textAlign = "left";
	  context.textBaseline = "top";
	  context.fillText("Time elapsed: " + this.secondsElapsed, 800, 32);
	
	};
	
	Game.prototype.moveObjects = function() {
	  this.werewolves.forEach(wolf => {
	    wolf.move();
	  });
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Util = __webpack_require__(4);
	
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits(ChildClass, ParentClass) {
	    function Surrogate(){}
	    Surrogate.prototype = ParentClass.prototype;
	    ChildClass.prototype = new Surrogate();
	    ChildClass.prototype.constructor = ChildClass;
	  }
	};
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	
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
	
	    if (this.pause) {
	      return;
	    }
	
	    if (_milliseconds % 1000 === 0 && this.game.werewolves.length < 15) {
	      this.game.addWolf();
	    }
	
	    if (_milliseconds % 1000 === 0) {
	      this.game.secondsElapsed += 1;
	    }
	
	    if (32 in this.keysDown) {
	      alert('Press okay to unpause');
	      this.keysDown = {};
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
	//
	
	
	GameView.prototype.restartGame = function() {
	  if (this.game.gameOver) {
	    this.pause = true;
	    this.keysDown = {};
	    this.sleep(2000).then(() => {
	      this.game = new Game();
	      this.pause = false;
	    });
	  }
	};
	
	GameView.prototype.sleep = function(time) {
	  return new Promise((resolve) => setTimeout(resolve, time));
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


/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(3);
	const Util = __webpack_require__(4);
	
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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map