(function() {
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  var X = 0, Y = 1, WIDTH = 2, HEIGHT = 3;
  var clearPosition = [0, 0, 600, 400];
  var cPos = [50, 350, 50, 50]; //x, y, w, h
  var hudFill = "#000000";
  var characterFill = "#ff0000";
  var ePos = [300, 50, 25, 0, Math.PI*2, true];
  var enemyFill = "#0000ff";
  var interval = setInterval(gameLoop.bind(this), 0);
  subscribeToKeyPress('32', function() {
    console.log("act");
  });
  function gameLoop() {
    characterFill = (hitDetect(cPos, ePos)) ? "#00ff00" : "#ff0000";
    clearFrame();
    moveCharacter();
    // moveEnemy();
    render();
  }    
  function clearFrame() {
    ctx.clearRect.apply(ctx, clearPosition);
    ctx.strokeRect.apply(ctx, clearPosition);
  }
  function moveCharacter() {
    //handle walking inputs
    if(isPressed('DIRECTIONAL')) {
      if(!isWalking) startWalking();
      walk();
    }
    else if(isWalking) {
      if(!isSlowingDown) isSlowingDown = true;
      decayWalk();
    }
  }
  function render() {
    //render information
    ctx.fillStyle = hudFill;
    ctx.font = "18px Arial";
    ctx.fillText("Facing: "+DIRECTIONS[isFacing], 10, 20);
    ctx.fillText("speed: " + speed, 10, 40);
    //render character
    ctx.fillStyle = characterFill;
    ctx.fillRect.apply(ctx, cPos);
    //render enemy
    ctx.fillStyle = enemyFill;
    ctx.beginPath();
    ctx.arc.apply(ctx, ePos);
    ctx.fill();
  }
  ///////////////////////
  //walk stuff
  var SPEEDUP_INTERVAL = 20;
  var SLOWDOWN_INTERVAL = 10;
  var INITIAL_SPEED = 0;
  var MAX_SPEED = 4;
  var DIRECTIONS = {
    'up':    0,
    'down':  1,
    'left':  2,
    'right': 3,
    '0':     'up',
    '1':     'down',
    '2':     'left',
    '3':     'right'
  }
  var isFacing = 3;
  var isWalking = false;
  var isSlowingDown = false;
  var walkingTime = 0;
  var speed = 0;
  function startWalking() {
    isWalking = true;
    isSlowingDown = false;
    walkingTime = 0;
    speed = INITIAL_SPEED;
    if(isPressed('up'))    isFacing = DIRECTIONS['up'];
    if(isPressed('down'))  isFacing = DIRECTIONS['down'];
    if(isPressed('left'))  isFacing = DIRECTIONS['left'];
    if(isPressed('right')) isFacing = DIRECTIONS['right'];
  }
  function walk() {
    var dx = 0, dy = 0;
    if(speed < MAX_SPEED) {
      walkingTime++;
      if(walkingTime % SPEEDUP_INTERVAL === 0) 
        speed++;
    }
    if(isFacing === DIRECTIONS['up']) dy -= speed;
    else if(isFacing === DIRECTIONS['down']) dy += speed;
    else if(isFacing === DIRECTIONS['left']) dx -= speed;
    else if(isFacing === DIRECTIONS['right']) dx += speed;
    cPos[X] += dx;
    cPos[Y] += dy;
  }
  function decayWalk() {
    var dx = 0, dy = 0;
    if(speed > 0) {
      walkingTime--;
      if(walkingTime % SLOWDOWN_INTERVAL === 0)
        speed--;
    }
    else {
      isWalking = false;
      isSlowingDown = false;
    }
    if(isFacing === DIRECTIONS['up']) dy -= speed;
    else if(isFacing === DIRECTIONS['down']) dy += speed;
    else if(isFacing === DIRECTIONS['left']) dx -= speed;
    else if(isFacing === DIRECTIONS['right']) dx += speed;
    cPos[X] += dx;
    cPos[Y] += dy;
  }
  /////////////////////////////
  //Hit Detection
  function hitDetect(c1, c2) { 
    var L = c1[X], T = c1[Y], W = c1[WIDTH], H = c1[HEIGHT],
        l = c2[X], t = c2[Y], w = c2[WIDTH], h = c2[HEIGHT];
    return (l <= L+W && l >= L-w && t <= T+H && t >= T-h);
  }
  /////////////////////////////
  //Enemy
  var up = true;
  function moveEnemy() {
    ePos[1] += (up) ? 4 : -4;
    if(up  && ePos[Y] > 400) up = false;
    if(!up && ePos[Y] <= 0)  up = true;
  }
})();