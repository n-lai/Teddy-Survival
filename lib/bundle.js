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

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(5);
	
	document.addEventListener("DOMContentLoaded", function() {
	  const canvasEl = document.getElementsByTagName("canvas")[0];
	  
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const context = canvasEl.getContext("2d");
	  const game = new Game();
	  new GameView(game, context).start();
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
	
	MovingObject.prototype.distanceBetween = function(pos1, pos2) {
	
	};
	
	MovingObject.prototype.isCollidedWith = function(otherObject) {
	  return (
	    this.x > otherObject.x &&
	    this.x < otherObject.x + otherObject.width &&
	    this.y > otherObject.y &&
	    this.y < otherObject.y + otherObject.height
	  );
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
	
	MovingObject.prototype.isInBounds = function() {
	  return (this.x < this.game.width - this.width && this.y < this.game.height - this.height);
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
	  },
	};
	
	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const key = __webpack_require__(6);
	
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	//     keymaster.js
	//     (c) 2011-2012 Thomas Fuchs
	//     keymaster.js may be freely distributed under the MIT license.
	
	;(function(global){
	  var k,
	    _handlers = {},
	    _mods = { 16: false, 18: false, 17: false, 91: false },
	    _scope = 'all',
	    // modifier keys
	    _MODIFIERS = {
	      '⇧': 16, shift: 16,
	      '⌥': 18, alt: 18, option: 18,
	      '⌃': 17, ctrl: 17, control: 17,
	      '⌘': 91, command: 91
	    },
	    // special keys
	    _MAP = {
	      backspace: 8, tab: 9, clear: 12,
	      enter: 13, 'return': 13,
	      esc: 27, escape: 27, space: 32,
	      left: 37, up: 38,
	      right: 39, down: 40,
	      del: 46, 'delete': 46,
	      home: 36, end: 35,
	      pageup: 33, pagedown: 34,
	      ',': 188, '.': 190, '/': 191,
	      '`': 192, '-': 189, '=': 187,
	      ';': 186, '\'': 222,
	      '[': 219, ']': 221, '\\': 220
	    },
	    code = function(x){
	      return _MAP[x] || x.toUpperCase().charCodeAt(0);
	    },
	    _downKeys = [];
	
	  for(k=1;k<20;k++) _MODIFIERS['f'+k] = 111+k;
	
	  // IE doesn't support Array#indexOf, so have a simple replacement
	  function index(array, item){
	    var i = array.length;
	    while(i--) if(array[i]===item) return i;
	    return -1;
	  }
	
	  var modifierMap = {
	      16:'shiftKey',
	      18:'altKey',
	      17:'ctrlKey',
	      91:'metaKey'
	  };
	  function updateModifierKey(event) {
	      for(k in _mods) _mods[k] = event[modifierMap[k]];
	  };
	
	  // handle keydown event
	  function dispatch(event, scope){
	    var key, handler, k, i, modifiersMatch;
	    key = event.keyCode;
	
	    if (index(_downKeys, key) == -1) {
	        _downKeys.push(key);
	    }
	
	    // if a modifier key, set the key.<modifierkeyname> property to true and return
	    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
	    if(key in _mods) {
	      _mods[key] = true;
	      // 'assignKey' from inside this closure is exported to window.key
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
	      return;
	    }
	    updateModifierKey(event);
	
	    // see if we need to ignore the keypress (filter() can can be overridden)
	    // by default ignore key presses if a select, textarea, or input is focused
	    if(!assignKey.filter.call(this, event)) return;
	
	    // abort if no potentially matching shortcuts found
	    if (!(key in _handlers)) return;
	
	    // for each potential shortcut
	    for (i = 0; i < _handlers[key].length; i++) {
	      handler = _handlers[key][i];
	
	      // see if it's in the current scope
	      if(handler.scope == scope || handler.scope == 'all'){
	        // check if modifiers match if any
	        modifiersMatch = handler.mods.length > 0;
	        for(k in _mods)
	          if((!_mods[k] && index(handler.mods, +k) > -1) ||
	            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
	        // call the handler and stop the event if neccessary
	        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
	          if(handler.method(event, handler)===false){
	            if(event.preventDefault) event.preventDefault();
	              else event.returnValue = false;
	            if(event.stopPropagation) event.stopPropagation();
	            if(event.cancelBubble) event.cancelBubble = true;
	          }
	        }
	      }
	    }
	  };
	
	  // unset modifier keys on keyup
	  function clearModifier(event){
	    var key = event.keyCode, k,
	        i = index(_downKeys, key);
	
	    // remove key from _downKeys
	    if (i >= 0) {
	        _downKeys.splice(i, 1);
	    }
	
	    if(key == 93 || key == 224) key = 91;
	    if(key in _mods) {
	      _mods[key] = false;
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
	    }
	  };
	
	  function resetModifiers() {
	    for(k in _mods) _mods[k] = false;
	    for(k in _MODIFIERS) assignKey[k] = false;
	  }
	
	  // parse and assign shortcut
	  function assignKey(key, scope, method){
	    var keys, mods, i, mi;
	    if (method === undefined) {
	      method = scope;
	      scope = 'all';
	    }
	    key = key.replace(/\s/g,'');
	    keys = key.split(',');
	
	    if((keys[keys.length-1])=='')
	      keys[keys.length-2] += ',';
	    // for each shortcut
	    for (i = 0; i < keys.length; i++) {
	      // set modifier keys if any
	      mods = [];
	      key = keys[i].split('+');
	      if(key.length > 1){
	        mods = key.slice(0,key.length-1);
	        for (mi = 0; mi < mods.length; mi++)
	          mods[mi] = _MODIFIERS[mods[mi]];
	        key = [key[key.length-1]];
	      }
	      // convert to keycode and...
	      key = key[0]
	      key = code(key);
	      // ...store handler
	      if (!(key in _handlers)) _handlers[key] = [];
	      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
	    }
	  };
	
	  // Returns true if the key with code 'keyCode' is currently down
	  // Converts strings into key codes.
	  function isPressed(keyCode) {
	      if (typeof(keyCode)=='string') {
	        keyCode = code(keyCode);
	      }
	      return index(_downKeys, keyCode) != -1;
	  }
	
	  function getPressedKeyCodes() {
	      return _downKeys.slice(0);
	  }
	
	  function filter(event){
	    var tagName = (event.target || event.srcElement).tagName;
	    // ignore keypressed in any elements that support keyboard data input
	    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
	  }
	
	  // initialize key.<modifier> to false
	  for(k in _MODIFIERS) assignKey[k] = false;
	
	  // set current scope (default 'all')
	  function setScope(scope){ _scope = scope || 'all' };
	  function getScope(){ return _scope || 'all' };
	
	  // delete all handlers for a given scope
	  function deleteScope(scope){
	    var key, handlers, i;
	
	    for (key in _handlers) {
	      handlers = _handlers[key];
	      for (i = 0; i < handlers.length; ) {
	        if (handlers[i].scope === scope) handlers.splice(i, 1);
	        else i++;
	      }
	    }
	  };
	
	  // cross-browser events
	  function addEvent(object, event, method) {
	    if (object.addEventListener)
	      object.addEventListener(event, method, false);
	    else if(object.attachEvent)
	      object.attachEvent('on'+event, function(){ method(window.event) });
	  };
	
	  // set the handlers globally on document
	  addEvent(document, 'keydown', function(event) { dispatch(event, _scope) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
	  addEvent(document, 'keyup', clearModifier);
	
	  // reset modifiers to false whenever the window is (re)focused.
	  addEvent(window, 'focus', resetModifiers);
	
	  // store previously defined key
	  var previousKey = global.key;
	
	  // restore previously defined key and return reference to our key object
	  function noConflict() {
	    var k = global.key;
	    global.key = previousKey;
	    return k;
	  }
	
	  // set window.key and window.key.set/get/deleteScope, and the default filter
	  global.key = assignKey;
	  global.key.setScope = setScope;
	  global.key.getScope = getScope;
	  global.key.deleteScope = deleteScope;
	  global.key.filter = filter;
	  global.key.isPressed = isPressed;
	  global.key.getPressedKeyCodes = getPressedKeyCodes;
	  global.key.noConflict = noConflict;
	
	  if(true) module.exports = key;
	
	})(this);


/***/ },
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
	
	  this.speed = 30;
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
	};
	
	Teddy.prototype.moveRight = function() {
	  this.pos[0] += this.speed;
	};
	
	Teddy.prototype.moveUp = function() {
	  this.pos[1] -= this.speed;
	};
	
	Teddy.prototype.moveDown = function() {
	  this.pos[1] += this.speed;
	};
	
	
	module.exports = Teddy;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map