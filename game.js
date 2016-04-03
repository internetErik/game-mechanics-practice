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
  var MAP_WIDTH      = map[0].length * TILE_SIZE;
  var MAP_HEIGHT     = map.length * TILE_SIZE;
  //Constants for sementic access of position arrays
  var X = 0, Y = 1, WIDTH = 2, HEIGHT = 3;
  //definitions of some characters to render
  var clearPosition = [0, 0, GAME_WIDTH, GAME_HEIGHT];
  var cPos = [CENTER_X, CENTER_Y, CHARACTER_SIZE, CHARACTER_SIZE]; //x, y, w, h
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
      walk();
    }
    else if(isWalking) {
      if(!isSlowingDown) isSlowingDown = true;
      decayWalk();
    }
  }
  function render() {
    renderGround();
    //render information
    ctx.fillStyle = hudFill;
    ctx.font = "18px Arial";
    ctx.fillText("Facing: "+DIRECTIONS[isFacing], 10, 20);
    ctx.fillText("speed: " + speed, 10, 40);
    //render character
    ctx.fillStyle = characterFill;
    ctx.fillRect.apply(ctx, cPos);
  }
  function renderGround() {
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
          posX = (px*TILE_SIZE)-offsetX;
          posY = (py*TILE_SIZE)-offsetY; 
          ctx.fillStyle = map[y][x];
          ctx.fillRect(posX, posY, TILE_SIZE, TILE_SIZE);
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
        if(y === initY) {
          ctx.fillStyle = map[y][initX];
          ctx.fillRect(0, 0, TILE_SIZE-offsetX, TILE_SIZE-offsetY);
          ctx.fillStyle = map[y][boundX];
          ctx.fillRect(right, 0, offsetX, TILE_SIZE-offsetY);
        }
        else if(y === boundY) {
          ctx.fillStyle = map[y][initX];
          ctx.fillRect(0, bottom, TILE_SIZE-offsetX, offsetY);
          ctx.fillStyle = map[y][boundX];
          ctx.fillRect(right, bottom, offsetX, offsetY)
        }
        else {
          ctx.fillStyle = map[y][initX];
          ctx.fillRect(0, posY, TILE_SIZE-offsetX, 50);
          ctx.fillStyle = map[y][boundX];
          ctx.fillRect(right, posY, offsetX, 50);
        }
      }
      //draw the top and bottom borders (sans first column)
      for(x = initX+1, px = 1; x < boundX; x++,px++) {
        posX = (TILE_SIZE*px)-offsetX;
        ctx.fillStyle = map[initY][x];
        ctx.fillRect(posX, 0, TILE_SIZE, TILE_SIZE-offsetY);
        ctx.fillStyle = map[boundY][x];
        ctx.fillRect(posX, bottom, 50, offsetY);
      }
      //draw the middle
      for(x = initX+1,px = 1; x < boundX; x++, px++) {
        for(y = initY+1,py = 1; y < boundY; y++, py++) {
          posX = (px*TILE_SIZE)-offsetX;
          posY = (py*TILE_SIZE)-offsetY; 
          ctx.fillStyle = map[y][x];
          ctx.fillRect(posX, posY, TILE_SIZE, TILE_SIZE);
        }
      }
    }
    else if(offsetX !== 0) {
      //13x8
      let bottom = TILE_SIZE*8-offsetY;
      let right  = TILE_SIZE*12-offsetX;
      //draw the left and right borders
      for(y = initY, py = 0; y <= boundY; y++, py++){
        posY = (TILE_SIZE*py)-offsetY;
        ctx.fillStyle = map[y][initX];
        ctx.fillRect(0, posY, TILE_SIZE-offsetX, TILE_SIZE);
        ctx.fillStyle = map[y][boundX];
        ctx.fillRect(right, posY, offsetX, TILE_SIZE);
      }
      //draw the middle
      for(x = initX+1,px = 1; x < boundX; x++, px++) {
        for(y = initY,py = 0; y < boundY; y++, py++) {
          posX = (px*TILE_SIZE)-offsetX;
          posY = (py*TILE_SIZE)-offsetY; 
          ctx.fillStyle = map[y][x];
          ctx.fillRect(posX, posY, TILE_SIZE, TILE_SIZE);
        }
      }
    }
    else if(offsetY !== 0) {
      //12x9
      let bottom = TILE_SIZE*8-offsetY;
      let right  = TILE_SIZE*12-offsetX;
      //draw the top and bottom borders
      for(x = initX, px = 0; x <= boundX; x++, px++){
        posX = (TILE_SIZE*px)-offsetX;
        if(x === initX) {
          ctx.fillStyle = map[initY][x];
          ctx.fillRect(0, 0, TILE_SIZE, TILE_SIZE-offsetY);
          ctx.fillStyle = map[boundY][x];
          ctx.fillRect(0, bottom, TILE_SIZE, offsetY);
        }
        else if(x === boundX) {
          ctx.fillStyle = map[initY][x];
          ctx.fillRect(right, 0, TILE_SIZE, TILE_SIZE-offsetY);
          ctx.fillStyle = map[boundY][x];
          ctx.fillRect(right, bottom, TILE_SIZE, offsetY)
        }
        else {
          ctx.fillStyle = map[initY][x];
          ctx.fillRect(posX, 0, TILE_SIZE, TILE_SIZE-offsetY);
          ctx.fillStyle = map[boundY][x];
          ctx.fillRect(posX, bottom, TILE_SIZE, offsetY);
        }
      }
      //draw the middle
      for(x = initX,px = 0; x < boundX; x++, px++) {
        for(y = initY+1,py = 1; y < boundY; y++, py++) {
          posX = (px*TILE_SIZE)-offsetX;
          posY = (py*TILE_SIZE)-offsetY; 
          ctx.fillStyle = map[y][x];
          ctx.fillRect(posX, posY, TILE_SIZE, TILE_SIZE);
        }
      }
    }
  }
  ///////////////////////
  //walk stuff
  var SPEEDUP_INTERVAL = 20;
  var SLOWDOWN_INTERVAL = 10;
  var INITIAL_SPEED = 0;
  var MAX_SPEED = 3;
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
    var d = [0,0];
    if(speed < MAX_SPEED) {
      walkingTime++;
      if(walkingTime % SPEEDUP_INTERVAL === 0) 
        speed++;
    }
    if(isFacing === DIRECTIONS['up']) d[Y] -= speed;
    else if(isFacing === DIRECTIONS['down']) d[Y] += speed;
    else if(isFacing === DIRECTIONS['left']) d[X] -= speed;
    else if(isFacing === DIRECTIONS['right']) d[X] += speed;
    changePosition(d, 0);
  }
  function decayWalk() {
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
    if(isFacing === DIRECTIONS['up']) d[Y] -= speed;
    else if(isFacing === DIRECTIONS['down']) d[Y] += speed;
    else if(isFacing === DIRECTIONS['left']) d[X] -= speed;
    else if(isFacing === DIRECTIONS['right']) d[X] += speed;
    changePosition(d, 0);
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
  function changeOriginPosition(/*ref*/d) {
    //see if we should move the x origin
    if(d[X] !== 0 && shouldMoveOriginX(d[X])) {
      //move origin x, then figure out if we moved too far 
      console.log("move origin x");
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
      console.log("move origin y");
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
