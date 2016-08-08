# Survival of the Teddy

[Survival of the Teddy live][link]

[link]: https://n-lai.github.io/Teddy-Survival/

Survival of the Teddy is a game built with JavaScript, Canvas, and HTML/CSS. It features a teddy as the protagonist that has to dodge enemy werewolves.

![image of game][game_image]

[game_image]: js_game_screenshot.png  

## Object-Oriented JavaScript

### Class Breakdown
* GameView
* Game
* MovingObject
  * Teddy
  * Werewolf

### GameView and Game
`GameView` is responsible for starting the game. It initializes with making a new `Game` object and setting event listeners on the arrow keys. It runs the game with `setInterval` and `GameView.restartGame()` will restart the game if the player has lost.

`Game` contains all the core logic for the game. Upon initialization, a new `Teddy` object is created. It also tracks the seconds elapsed and the amount of werewolves on the screen. `Game.draw()` is responsible for rendering objects onto the screen - namely the background werewolves, and teddy. `Game` also tracks whether or not the player has lost by checking whether or not the `Teddy` object has collided with any of the `Werewolf` objects.

```javascript
Game.prototype.isGameOver = function() {
  this.werewolves.forEach(wolf => {
    if (this.teddy.isCollidedWith(wolf)) {
      this.gameOver = true;
    }
  });
};
```

### Teddy and Werewolf
The `Teddy` and `Werewolf` classes each have their own `draw` function that is passed a `context` to render an image.

```javascript
Teddy.prototype.draw = function(context) {
  const teddyImg = new Image();
  teddyImg.src = 'http://res.cloudinary.com/dl8lhjvx0/image/upload/v1468431900/bear_transparent_chauaj.png';
  context.drawImage(teddyImg, this.pos[0], this.pos[1], this.width, this.height);
};
```
`Werewolf` has a `stayInBounds()` function that reverses the velocity whenever the wolf has hit the bounds of the canvas object.

```javascript
Werewolf.prototype.stayInBounds = function() {
  if (this.pos[0] > 1000 - 32 || this.pos[0] < 0) {
    this.vel[0] *= -1;
  } else if (this.pos[1] > 600 - 50 || this.pos[1] < 0) {
    this.vel[1] *= -1;
  }
};
```
