'use strict';
(function() {
  //canvas from dom
  var canvas = document.getElementById('game');
  var ctx = canvas.getContext('2d');
  //Constants of game canvas size
  var GAME_HEIGHT    = 400;
  var GAME_WIDTH     = 600;
  var CHARACTER_SIZE = 50;
  var CENTER_X       = (GAME_WIDTH/2)-(CHARACTER_SIZE/2);
  var CENTER_Y       = (GAME_HEIGHT/2)-(CHARACTER_SIZE/2);
  console.log(`Center is ${CENTER_X}x${CENTER_Y}`)
  var TILE_SIZE      = 50;
  var MAP_WIDTH      = map[GROUND][0].length * TILE_SIZE;
  var MAP_HEIGHT     = map[GROUND].length * TILE_SIZE;
  //Constants for sementic access of position arrays
  var X = 0, Y = 1, WIDTH = 2, HEIGHT = 3;
  //definitions of some characters to render
  var clearPosition = [0, 0, GAME_WIDTH, GAME_HEIGHT];
  var cPos = [CENTER_X, CENTER_Y, CHARACTER_SIZE, CHARACTER_SIZE]; //x, y, w, h
  var cLevel = 1;
  var hudFill = "#000000";
  var characterFill = "#ff0000";
  //information about what part of the map to render
  var curOrigin = [800, 100]; //X, Y
  //register a function to perform on spacebar
  var interval = setInterval(gameLoop.bind(this), 0);  
  subscribeToKeyPress('32', function() {
    console.log("act");
  });
  function gameLoop() {
    clearFrame();
    moveCharacter();
    render();
  }    
  function clearFrame() {
    ctx.clearRect.apply(ctx, clearPosition);
    ctx.fillStyle = "#000000";
    ctx.fillRect.apply(ctx, clearPosition);
  }
  function moveCharacter() {
    //handle walking inputs
    if(isPressed('DIRECTIONAL')) {
      if(!isWalking) startWalking();
      if(isPressed('shift')) 
        slowWalk();
      else 
        walk();
    }
    else if(isWalking) {
      if(!isSlowingDown) { 
        isSlowingDown = true; 
        decayWalk(true); //first call, in case we want to just walk forward 1 space
      }
      else
        decayWalk(false); //not first call
    }
  }
  function render() {
    for(let i = 0; i < map.length; i++) {
      //render character
      if(i === 1) {
        ctx.fillStyle = characterFill;
        ctx.fillRect.apply(ctx, cPos);
      }
      //render stationary objects
      renderStationary(i);
      //render rest of map
      renderMap(map[i]);
    }
    //render information
    ctx.fillStyle = hudFill;
    ctx.font = "18px Arial";
    ctx.fillText("Facing: " + DIRECTIONS[isFacing], 10, 20);
    ctx.fillText("Speed: " + speed, 10, 40);
  }
  function renderStationary(level) {
    //loop through stationary objects
    for(var i = stationary.length-1; i >= 0; i--) {
      //first see if object is within view at all
      if(objectInView(stationary[i])) {
        //find where to render it
        let x = stationary[i].pos[X] - curOrigin[X], //may be negative
            y = stationary[i].pos[Y] - curOrigin[Y], //may be negative
            w = stationary[i].pos[WIDTH],
            h = stationary[i].pos[HEIGHT];
        ctx.fillStyle = stationary[i].color;
        ctx.fillRect(x, y, w, h);
      }
    }
  }
  function objectInView(obj) {
    //shorter vars for the various heights and widths of object and origin
    var x = obj.pos[X], xw = obj.pos[X] + obj.pos[WIDTH],
        y = obj.pos[Y], yh = obj.pos[Y] + obj.pos[HEIGHT],
        ox = curOrigin[X], oxw = curOrigin[X] + GAME_WIDTH,
        oy = curOrigin[Y], oyh = curOrigin[Y] + GAME_HEIGHT;
    //check coreners object against the current origin
    if(x  > ox && x  < oxw && y  > oy && y  < oyh) //top left
      return true;
    if(xw > ox && xw < oxw && y  > oy && y  < oyh)//top right
      return true;
    if(xw > ox && xw < oxw && yh > oy && yh < oyh) //bottom right
      return true;
    if(x  > ox && x  < oxw && yh > oy && yh < oyh) //bottom left
      return true;
    return false;
  }
  function renderMap(map) {
    //define vars to iterate on, we may use them twice
    var x = 0, y = 0, px = 0, py = 0;
    //get the coordinates to start with in rendering the map
    var initX = Math.floor(curOrigin[X] / TILE_SIZE);
    var initY = Math.floor(curOrigin[Y] / TILE_SIZE);
    //bound of our render
    var boundX = initX + 12;
    var boundY = initY + 8;
    //get the number of pixels to offset the map, 
     //since the borders of a tile won't always be on the edge
    var offsetX =  curOrigin[X] % TILE_SIZE;
    var offsetY =  curOrigin[Y] % TILE_SIZE;
    //the positions we are rendering
    var posX = 0;
    var posY = 0;
    //get the coordinates to start with in rendering the map
    var initX = Math.floor(curOrigin[X] / TILE_SIZE);
    var initY = Math.floor(curOrigin[Y] / TILE_SIZE);
    //depending on how we are algined, we are going to show more or less tiles
    if(offsetX === 0 && offsetY === 0) {
      //12x8
      for(x = initX,px = 0; x < boundX; x++, px++) {
        for(y = initY,py = 0; y < boundY; y++, py++) {
          if(map[y][x]) {
            posX = (px*TILE_SIZE)-offsetX;
            posY = (py*TILE_SIZE)-offsetY;
            ctx.fillStyle = map[y][x];
            ctx.fillRect(posX, posY, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }
    else if(offsetX !== 0 && offsetY !== 0) {
      //this is the most common case!
      //13x9
      let bottom = TILE_SIZE*8-offsetY;
      let right  = TILE_SIZE*12-offsetX;
      //draw the left and right borders
      for(y = initY, py = 0; y <= boundY; y++, py++){
        posY = (TILE_SIZE*py)-offsetY;
        if(!map[y][initX] || !map[y][boundX])
          continue;
        if(y === initY) {
          if(map[y][initX]) {
            ctx.fillStyle = map[y][initX];
            ctx.fillRect(0, 0, TILE_SIZE-offsetX, TILE_SIZE-offsetY);
          }
          if(map[y][boundX]) {
            ctx.fillStyle = map[y][boundX];
            ctx.fillRect(right, 0, offsetX, TILE_SIZE-offsetY);
          }
        }
        else if(y === boundY) {
          if(map[y][initX]) {
            ctx.fillStyle = map[y][initX];
            ctx.fillRect(0, bottom, TILE_SIZE-offsetX, offsetY);
          }
          if(map[y][boundX]) {
            ctx.fillStyle = map[y][boundX];
            ctx.fillRect(right, bottom, offsetX, offsetY);
          }
        }
        else {
          if(map[y][initX]) {
            ctx.fillStyle = map[y][initX];
            ctx.fillRect(0, posY, TILE_SIZE-offsetX, 50);
          }
          if(map[y][boundX]) {
            ctx.fillStyle = map[y][boundX];
            ctx.fillRect(right, posY, offsetX, 50);
          }
        }
      }
      //draw the top and bottom borders (sans first column)
      for(x = initX+1, px = 1; x < boundX; x++,px++) {
        posX = (TILE_SIZE*px)-offsetX;
        if(map[initY][x]) {
          ctx.fillStyle = map[initY][x];
          ctx.fillRect(posX, 0, TILE_SIZE, TILE_SIZE-offsetY);
        }
        if(map[boundY][x]) {
          ctx.fillStyle = map[boundY][x];
          ctx.fillRect(posX, bottom, 50, offsetY);
        }
      }
      //draw the middle
      for(x = initX+1,px = 1; x < boundX; x++, px++) {
        for(y = initY+1,py = 1; y < boundY; y++, py++) {
          if(map[y][x]) {
            posX = (px*TILE_SIZE)-offsetX;
            posY = (py*TILE_SIZE)-offsetY; 
            ctx.fillStyle = map[y][x];
            ctx.fillRect(posX, posY, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }
    else if(offsetX !== 0) {
      //13x8
      let bottom = TILE_SIZE*8-offsetY;
      let right  = TILE_SIZE*12-offsetX;
      //draw the left and right borders
      for(y = initY, py = 0; y < boundY; y++, py++){
        posY = (TILE_SIZE*py)-offsetY;
        if(map[y][initX]) {
          ctx.fillStyle = map[y][initX];
          ctx.fillRect(0, posY, TILE_SIZE-offsetX, TILE_SIZE);
        }
        if(map[y][boundX]) {
          ctx.fillStyle = map[y][boundX];
          ctx.fillRect(right, posY, offsetX, TILE_SIZE);
        }
      }
      //draw the middle
      for(x = initX+1,px = 1; x < boundX; x++, px++) {
        for(y = initY,py = 0; y < boundY; y++, py++) {
          if(map[y][x]) {
            posX = (px*TILE_SIZE)-offsetX;
            posY = (py*TILE_SIZE)-offsetY; 
            ctx.fillStyle = map[y][x];
            ctx.fillRect(posX, posY, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }
    else if(offsetY !== 0) {
      //12x9
      let bottom = TILE_SIZE*8-offsetY;
      let right  = TILE_SIZE*12-offsetX;
      //draw the top and bottom borders
      for(x = initX, px = 0; x < boundX; x++, px++){
        if(!map[initY][x] || !map[boundY][x])
          continue;
        posX = (TILE_SIZE*px)-offsetX;
        if(x === initX) {
          if(map[initY][x]) {
            ctx.fillStyle = map[initY][x];
            ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE-offsetY);
          }
          if(map[boundY][x]) {
            ctx.fillStyle = map[boundY][x];
            ctx.fillRect(0, bottom, TILE_SIZE, offsetY);
          }
        }
        else if(x === boundX) {
          if(map[initY][x]) {
            ctx.fillStyle = map[initY][x];
            ctx.fillRect(right, 0, TILE_SIZE, TILE_SIZE-offsetY);
          }
          if(map[boundY][x]) {
            ctx.fillStyle = map[boundY][x];
            ctx.fillRect(right, bottom, TILE_SIZE, offsetY);
          }
        }
        else {
          if(map[initY][x]) {
            ctx.fillStyle = map[initY][x];
            ctx.fillRect(posX, 0, TILE_SIZE, TILE_SIZE-offsetY);
          }
          if(map[boundY][x]) {
            ctx.fillStyle = map[boundY][x];
            ctx.fillRect(posX, bottom, TILE_SIZE, offsetY);
          }
        }
      }
      //draw the middle
      for(x = initX,px = 0; x < boundX; x++, px++) {
        for(y = initY+1,py = 1; y < boundY; y++, py++) {
          if(map[y][x]) {
            posX = (px*TILE_SIZE)-offsetX;
            posY = (py*TILE_SIZE)-offsetY; 
            ctx.fillStyle = map[y][x];
            ctx.fillRect(posX, posY, TILE_SIZE, TILE_SIZE);
          }
        }
      }
    }
  }
  ///////////////////////
  //walk stuff
  var SPEEDUP_INTERVAL = 50;
  var SLOWDOWN_INTERVAL = 10;
  var INITIAL_SPEED = 0;
  var MAX_SPEED = 3;
  var MAX_SLOWWALK_SPEED = 1;
  //hand rolled enum of directions
  var DIRECTIONS = {
    'up':         0,
    'down':       1,
    'left':       2,
    'right':      3,
    'upRight':   4,
    'upLeft':    5,
    'downRight': 6,
    'downLeft':  7,
    '0':         'up',
    '1':         'down',
    '2':         'left',
    '3':         'right',
    '4':         'upRight',
    '5':         'upLeft',
    '6':         'downRight',
    '7':         'downLeft',
  }
  var isFacing = 3;
  var lastDirection = -1;
  var isWalking = false;
  var isSlowingDown = false;
  var walkingTime = 0;
  var speed = 0;
  function startWalking() {
    isWalking = true;
    isSlowingDown = false;
    walkingTime = 0;
    speed = INITIAL_SPEED;
    setDirection();
  }
  function setDirection() {
    if(directionsPressed() === 1) {
      if(isPressed('up'))         isFacing = DIRECTIONS.up;
      else if(isPressed('down'))  isFacing = DIRECTIONS.down;
      else if(isPressed('left'))  isFacing = DIRECTIONS.left;
      else if(isPressed('right')) isFacing = DIRECTIONS.right;
    }
    else {
      if(isPressed('up') && isPressed('right'))   isFacing = DIRECTIONS.upRight;
      else if(isPressed('up') && isPressed('left'))    isFacing = DIRECTIONS.upLeft;
      else if(isPressed('down') && isPressed('right')) isFacing = DIRECTIONS.downRight;
      else if(isPressed('down') && isPressed('left'))  isFacing = DIRECTIONS.downLeft;
    }
  }
  function directionChanged() {
    var direction = isFacing;
    setDirection();
    if(direction !== isFacing) {
      isFacing = direction; //change facing back
      isSlowingDown = true;
      return true;
    }
    return false;
  }
  function walk() {
    var d = [0,0];
    if(directionChanged()) {
      decayWalk();
      return;
    }
    if(speed < MAX_SPEED) {
      walkingTime++;
      if(walkingTime % SPEEDUP_INTERVAL === 0) 
        speed++;
    }
    if(isFacing === DIRECTIONS.up) d[Y]         -= speed;
    else if(isFacing === DIRECTIONS.down) d[Y]  += speed;
    else if(isFacing === DIRECTIONS.left) d[X]  -= speed;
    else if(isFacing === DIRECTIONS.right) d[X] += speed;
    else if(isFacing === DIRECTIONS.upRight) {
      d[X] += Math.ceil(speed/2);
      d[Y] -= Math.ceil(speed/2);
    }
    else if(isFacing === DIRECTIONS.upLeft) {
      d[X] -= Math.ceil(speed/2);
      d[Y] -= Math.ceil(speed/2);
    }
    else if(isFacing === DIRECTIONS.downRight) {
      d[X] += Math.ceil(speed/2);
      d[Y] += Math.ceil(speed/2);
    }
    else if(isFacing === DIRECTIONS.downLeft) {
      d[X] -= Math.ceil(speed/2);
      d[Y] += Math.ceil(speed/2);
    }
    changePosition(d, 0);
  }
  function slowWalk() {
    var d = [0,0];
    if(directionChanged()) {
      decayWalk();
      return;
    }
    if(speed > MAX_SLOWWALK_SPEED) 
      speed = MAX_SLOWWALK_SPEED;
    else if(speed < MAX_SLOWWALK_SPEED) {
      walkingTime++;
      if(walkingTime % SPEEDUP_INTERVAL === 0) 
        speed++;
    }
    if(isFacing === DIRECTIONS.up) d[Y] -= speed;
    else if(isFacing === DIRECTIONS.down) d[Y] += speed;
    else if(isFacing === DIRECTIONS.left) d[X] -= speed;
    else if(isFacing === DIRECTIONS.right) d[X] += speed;
    changePosition(d, 0);
  }
  function decayWalk(firstCall) {
    var singleStep = false;
    var d = [0,0];
    if(speed > 0) {
      walkingTime--;
      if(walkingTime % SLOWDOWN_INTERVAL === 0)
        speed--;
    }
    else {
      isWalking = false;
      isSlowingDown = false;
    }
    if(firstCall && speed === 0) { 
      singleStep = true;
      speed = 1;
    }
    if(isFacing === DIRECTIONS.up) d[Y] -= speed;
    else if(isFacing === DIRECTIONS.down) d[Y] += speed;
    else if(isFacing === DIRECTIONS.left) d[X] -= speed;
    else if(isFacing === DIRECTIONS.right) d[X] += speed;
    changePosition(d, 0);
    if(singleStep) speed = 0;
  }
  function changePosition(/*ref*/d, callCount) {
    //make sure we have a call count
    if(typeof callCount === 'undefined') callCount = 0;
    //see if we can cancel out some of the d values
    if(( d[X] < 0 && cPos[X] === 0 ) ||
       ( d[X] > 0 && cPos[X] === (GAME_WIDTH - CHARACTER_SIZE) )) 
      d[X] = 0;
    if(( d[Y] < 0 && cPos[Y] === 0 ) ||
       ( d[Y] > 0 && cPos[Y] === (GAME_HEIGHT - CHARACTER_SIZE) )) 
      d[Y] = 0;
    //see if we are going to talk into a solid object and limit the change
    checkForObstructions(/*ref*/d); //'d' IS PASSED BY REF AND UPDATED!
    //try to move the origin
    if(d[X] !== 0 || d[Y] !== 0)
      changeOriginPosition(/*ref*/d); //'d' IS PASSED BY REF AND UPDATED!
    //try to update the character
    if(d[X] !== 0 || d[Y] !== 0)
      changeCharacterPosition(/*ref*/d); //'d' IS PASSED BY REF AND UPDATED!
    //keep calling until we have finished moving or if we have called more than 3 times
    if(( d[X] !== 0 || d[Y] !== 0 ) && callCount < 3)
      changePosition(/*ref*/d, callCount+1);
  }
  function checkForObstructions(/*ref*/d) {
    //loops inrement change values until they aren't hitting anything
    //check for obstructions on x-axis
    if(d[X] > 0)
      for(;obstructed([cPos[X]+d[X], cPos[Y], cPos[WIDTH], cPos[HEIGHT]]) && d[X] !== 0; d[X]--);
    else if(d[X] < 0)
      for(;obstructed([cPos[X]+d[X], cPos[Y], cPos[WIDTH], cPos[HEIGHT]]) && d[X] !== 0; d[X]++);
    //check for obstructions on y-axis
    if(d[Y] > 0)
      for(;obstructed([cPos[X], cPos[Y]+d[Y], cPos[WIDTH], cPos[HEIGHT]]) && d[Y] !== 0; d[Y]--);
    else if(d[Y] < 0)
      for(;obstructed([cPos[X], cPos[Y]+d[Y], cPos[WIDTH], cPos[HEIGHT]]) && d[Y] !== 0; d[Y]++);
  }
  function obstructed(pos) {
    for(let i = stationary.length-1; i >= 0; i--) {
      if(cLevel === stationary[i].renderLevel && objectInView(stationary[i])) {
        if(hitDetect(pos, stationary[i].transformPos(curOrigin)))
          return true;
      }
    }
    return false;
  }
  function changeOriginPosition(/*ref*/d) {
    //see if we should move the x origin
    if(d[X] !== 0 && shouldMoveOriginX(d[X])) {
      //move origin x, then figure out if we moved too far 
      curOrigin[X] += d[X];
      if(curOrigin[X] < 0) {
        d[X] = curOrigin[X];
        curOrigin[X] = 0;
      }
      else if((curOrigin[X] + GAME_WIDTH) > MAP_WIDTH) {
        d[X] = (curOrigin[X] + GAME_WIDTH) % MAP_WIDTH;
        curOrigin[X] = MAP_WIDTH - GAME_WIDTH;
      }
    }
    //see if we should move the y origin
    if(d[Y] !== 0 && shouldMoveOriginY(d[Y])) {
      //move origin y, then figure out if we moved too far
      curOrigin[Y] += d[Y];
      if(curOrigin[Y] < 0) {
        d[Y] = curOrigin[Y];
        curOrigin[Y] = 0;
      }
      else if((curOrigin[Y] + GAME_HEIGHT) > MAP_HEIGHT) {
        d[Y] = (curOrigin[Y] + GAME_HEIGHT) % MAP_HEIGHT;
        curOrigin[Y] = MAP_HEIGHT - GAME_HEIGHT;
      }
    }
  }
  function changeCharacterPosition(/*ref*/d) {
    //see if we should move the character x position
    if(d[X] !== 0 && shouldMoveCharacterX(d[X])) {
      cPos[X] += d[X];
      if(d[X] < 0) {// moving left
        if(cPos[X] < 0) {
          d[X] = 0;
          cPos[X] = 0;
        }
	else if(curOrigin[X] !== 0 && cPos[X] < CENTER_X) {
	  d[X] = cPos[X] - CENTER_X;
	  cPos[X] = CENTER_X;
	}
      }
      else { //moving right
        if(cPos[X] + CHARACTER_SIZE > GAME_WIDTH) {
          d[X] = 0;
          cPos[X] = GAME_WIDTH - CHARACTER_SIZE;
        }
	else if(curOrigin[X] === 0 && cPos[X] > CENTER_X) {
	  d[X] = CENTER_X - cPos[X];
	  cPos[X] = CENTER_X;
	}
      }
    }
    //see if we should move the character y position
    if(d[Y] !== 0 && shouldMoveCharacterY(d[Y])) {
      cPos[Y] += d[Y];
      if(d[Y] < 0) { //moving up
        if(cPos[Y] < 0) {
          d[Y] = 0;
          cPos[Y] = 0;
        }
	else if(curOrigin[Y] !== 0 && cPos[Y] < CENTER_Y) {
	  d[Y] = CENTER_Y - cPos[Y];
	  cPos[Y] = CENTER_Y;
	}
      }
      else { //moving down
        if(cPos[Y] + CHARACTER_SIZE > GAME_HEIGHT) {
          d[Y] = 0;
          cPos[Y] = GAME_HEIGHT - CHARACTER_SIZE;
        }
	else if(curOrigin[Y] === 0 && cPos[Y] > CENTER_Y){
	 d[Y] = cPos[Y] - CENTER_Y;
	 cPos[Y] = CENTER_Y;
	}
      }
    }
  }
  function shouldMoveOriginX(dx) {
    return cPos[X] === CENTER_X;
  }
  function shouldMoveOriginY(dy) {
    return cPos[Y] === CENTER_Y;
  }
  function shouldMoveCharacterX(dx) {
    //moving left
    if(dx < 0) {
      return (curOrigin[X] === 0 && cPos[X] > 0) ||
             (curOrigin[X] + GAME_WIDTH === MAP_WIDTH && cPos[X] > CENTER_X);
    }
    //moving right
    if(dx > 0) {
      return (curOrigin[X] + GAME_WIDTH === MAP_WIDTH && cPos[X] + CHARACTER_SIZE < GAME_WIDTH) ||
             (curOrigin[X] === 0 && cPos[X] < CENTER_X);
    }
    return false;
  }
  function shouldMoveCharacterY(dy) {
    //moving up
    if(dy < 0) {
      return (curOrigin[Y] === 0 && cPos[Y] > 0) ||
             (curOrigin[Y] + GAME_HEIGHT === MAP_HEIGHT && cPos[Y] > CENTER_Y);
    }
    //moving down
    if(dy > 0) {
      //move if we are 
      return ( curOrigin[Y] + GAME_HEIGHT === MAP_HEIGHT && cPos[Y] + CHARACTER_SIZE < GAME_HEIGHT ) ||
             ( curOrigin[Y] === 0 && cPos[Y] < CENTER_Y );
    }
    return false;
  }
  /////////////////////////////
  //Hit Detection
  function hitDetect(c1, c2) { 
    var L = c1[X], T = c1[Y], W = c1[WIDTH], H = c1[HEIGHT],
        l = c2[X], t = c2[Y], w = c2[WIDTH], h = c2[HEIGHT];
    return (l <= L+W && l >= L-w && t <= T+H && t >= T-h);
  }
})();
