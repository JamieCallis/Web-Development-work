// variables

const allEnemies = [];


// Enemy Class

class Enemy {

  /**
   * @description handles the construction of the Enemy object
   * @param {number} x - x starting coordinate
   * @param {number} y - y starting coordinate
   * @param {number} speed - card information
   */
    constructor(x, y, speed) {
      this.sprite = 'images/enemy-bug.png';
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.width = 101;
      this.height = 171;
      this.cwidth = 506;
      this.cheight = 606;
    }

    /**
     * @description updates the x coordinate position of the enemy object
     */
    update() {
      this.x = this.x + this.speed;

      if (this.x > 500) {
        this.reset();
      }
    }

    /**
     * @description draws the enemey object on the canvas
     */
    render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
     * @description resets the enemey object in a new position on the x coordinate, and with a new speed
     */
    reset() {
      this.x = Math.random(30, 150);
      this.speed = Math.random(2, 10);
    }
};

class Player {

  /**
   * @description handles the consutrction of the player object, setting up all of the internal attributes
   * @param {number} x - starting x coordinate
   * @param {number} y - starting y coordinate
   */
  constructor(x, y) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
    this.width = 101;
    this. height = 171;
    this.victory = false;
    this.cwidth = 506;
    this.cheight = 606;
  }
  /**
   * @description checks for collisions, and if the game is complete
   */
  update() {
    this.collisiondetection();
    this.congratulations();
  }

  /**
   * @description draws the player object on the canvas
   */
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  /**
   * @description checks to see if the player has won the game, and outputs a
   congratulations message.

   */
  congratulations() {
    let message = document.createElement('h1');

    if(this.y <= -15 && this.victory == false) {
      message.innerHTML = "Congratulations you Win!";
      this.victory = true;
      document.body.appendChild(message);
      this.resetCharacter();
    }
  }
  /**
   * @description handles the user input and changes the position of the chracter
   * @param {string} input - user inputted key press action type
   */
  handleInput(input) {
    switch(input) {
      case 'left':
      this.x -= 101;
      this.checkbounderies();
      this.update(this.x);
      break;
      case 'up':
      this.y -= 83;
      this.checkbounderies();
      this.update(this.y);
      break;
      case 'right':
        this.x += 101;
        this.checkbounderies();
        this.update(this.x);
      break;
      case 'down':
      this.y += 83;
      this.checkbounderies();
      this.update(this.y);
      break;

    }

  }

  /**
   * @description stops the player object from moving off of the canvas
   */
  checkbounderies() {

    if(this.x >= 404) {
      this.x -= 101;
    }

    if(this.y >= 483) {
      this.y -= 83;
    }

    if(this.x < -2) {
      this.x += 101;
    }

    if(this.y < -15) {
      this.y += 83;
    }

  }
  /**
   * @description reset the position of the player character to the starting position
   */
  resetCharacter() {
    this.x = 200;
    this.y = 400;
  }

  /**
   * @description checks the player position against all of the enemines for any collisions
   */
  collisiondetection() {
    for (var i = 0; i < allEnemies.length; i++) {
      if(this.x < allEnemies[i].x + ((allEnemies[i].width + 20) / 2 ) &&
      this.x + (this.width / 2) > allEnemies[i].x &&
      this.y < allEnemies[i].y + ((allEnemies[i].height - 111) / 2  ) &&
      ((this.height - 30) / 2) + this.y > allEnemies[i].y) {
        this.resetCharacter();
        break;
      }

  }

}
};

const enemy = new Enemy(30, 60, 2);
const enemy2 = new Enemy(30, 140, 4);
const enemy3 = new Enemy(30, 225, 5);

allEnemies.push(enemy);
allEnemies.push(enemy2);
allEnemies.push(enemy3);

const player = new Player(200, 400);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
