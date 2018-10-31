/*The walkthroughs and examples from: https://matthewcranford.com/category/blog-posts/walkthrough/arcade-game/
have helped me alot in completing the project
Some code may be similar to what is in the walkthroughs
*/
class Enemy {
    constructor(x,y,speed) {
        this.x = x;
        this.y = y + 55;
        this.sprite = 'images/enemy-bug.png';
        this.step = 101;
        this.speed = speed;
        this.boundary = this.step * 5 ;
        this.resetPosition = -this.step;


    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if(this.x < this.boundary){
          this.x += this.speed * dt;
        }
        else{
          this.x = this.resetPosition;
        }
        /*function checkCollisions() {

        }*/
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.step = 101;
    this.jump = 83;
    this.initX = this.step * 2;
    this.initY = (this.jump * 4)+55;
    this.x = this.initX;
    this.y = this.initY;
    this.sprite = 'images/char-boy.png';
    this.victory = false;

  }
  update(){
    /*for(let enemy of allEnemies){
      if(this.y === enemy.y){
        console.log('tumegongana!!');
      }
      console.log(this.y,enemy.y);
    }*/

    //Checks for collisions
      for(let enemy of allEnemies){
        if(this.y === enemy.y &&(enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2)){
          this.reset();
        }
      }
    //Checks for win
    if(this.y === 55){
      // console.log('win!!');
      this.victory = true;
    }
  }

//Draws the player on the screen
  render(){
    ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
  }
  //Handles the logic for the input within the game
  handleInput(input){
    switch (input) {
      case 'left':
        if(this.x > 0){
          this.x -= this.step;
        }
        break;

      case 'up':
        if(this.y > this.jump){
          this.y -= this.jump;
        }
        break;

      case 'right':
        if(this.x < this.step*4){
          this.x += this.step;
        }
        break;

      case 'down':
        if(this.y < this.jump*4){
          this.y += this.jump;
        }
        break;
    }

  }

  // resets the game back to defaults
  reset(){
    this.x = this.initX;
    this.y = this.initY;

  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

const roach0 = new Enemy(-101,0,250);
const roach1 = new Enemy(-101,83,300);
const roach2 = new Enemy((-101*4), 83, 150);
const roach3 = new Enemy((-101*2.5),83,400);
const allEnemies = [];
allEnemies.push(roach0,roach1,roach2,roach3);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', e => {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
