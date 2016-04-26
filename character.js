'use strict';
//functions in global scope
var getCharState;
var characterUpdatePhase;
(function(){
  ///////////////////////
  //walk stuff
  const SPEEDUP_INTERVAL = 50;
  const SLOWDOWN_INTERVAL = 10;
  const INITIAL_SPEED = 0;
  const MAX_CREEP_SPEED = 1;
  const MAX_WALK_SPEED = 2;
  const MAX_RUN_SPEED = 3;
  const MAX_SPRINT_SPEED = 5;
  const WEAR_SPEED_THRESHOLD = 2;
  const STAMINA_LOSS_INTERVAL = 30;
  const STAMINA_GAIN_INTERVAL = 60;
  const MAX_STAMINA = 20;
  const BODY_WEAR_LOSS_INTERVAL = 30;
  const BODY_WEAR_GAIN_INTERVAL = 60;
  const MAX_BODY_WEAR = 10;
  //hand rolled enum of directions
  const DIRECTIONS = {
    'up':        0,
    'down':      1,
    'left':      2,
    'right':     3,
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
  var staminaTime = 0;
  var speed = 0;
  var stamina = MAX_STAMINA;
  var bodyWear = 0;
  //function for getting state of character
  getCharState = function _getCharState(property) {
    switch(property) {
      case 'speed'           : return speed;
      case 'isWalking'       : return isWalking;
      case 'startWalking'    : return startWalking;
      case 'currentDirection': return DIRECTIONS[isFacing];
      case 'stamina'         : return stamina;
      default: return null;
    }
  }  
  //handle walking inputs
  characterUpdatePhase = function _characterUpdatePhase() {
    if(isPressed('DIRECTIONAL')) {
      if(!isWalking) startWalking();
      walkingTime++;
      //cannot sprint without stamina, but you can run, walk or creep
      if(stamina > 0 && isPressed('backtick'))
        sprint();
      else if(isPressed('ctrl'))
        run();
      else if(isPressed('shift')) 
        creep();
      else 
        walk();
    }
    else if(isWalking) {
      walkingTime--;
      if(!isSlowingDown) { 
        isSlowingDown = true; 
        decayWalk(true); //first call, in case we want to just walk forward 1 space
      }
      else
        decayWalk(false); //not first call
    }
    //recover stamina
    if(stamina < MAX_STAMINA && speed < WEAR_SPEED_THRESHOLD) {
      if(staminaTime > 2000000) staminaTime = 0;
      staminaTime++;
      if(speed <= WEAR_SPEED_THRESHOLD) {
        if(staminaTime % STAMINA_GAIN_INTERVAL === 0) 
          stamina++;
      }
    }
  }
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
    if(directionChanged()) {
      decayWalk();
      return;
    }
    if(speed < MAX_WALK_SPEED) {
      if(walkingTime % SPEEDUP_INTERVAL === 0) 
        speed++;
    }
    else if(speed > MAX_WALK_SPEED) 
      speed = MAX_WALK_SPEED;
    moveCharacter();
  }
  function run() {
    if(directionChanged()) {
      decayWalk();
      return;
    }
    if(speed < MAX_RUN_SPEED) {
      if(walkingTime % SPEEDUP_INTERVAL === 0) 
        speed++;
    }
    else if(speed > MAX_RUN_SPEED) 
      speed = MAX_RUN_SPEED;
    if(speed > WEAR_SPEED_THRESHOLD) {
      if(stamina > 0 && walkingTime % STAMINA_LOSS_INTERVAL === 0)
        stamina -= speed;
      if(stamina < 0) stamina = 0;
    }
    moveCharacter();
  }
  function sprint() {
    if(directionChanged()) {
      decayWalk();
      return;
    }
    if(speed < MAX_SPRINT_SPEED) {
      if(walkingTime % SPEEDUP_INTERVAL === 0) 
        speed++;
    }
    if(speed > WEAR_SPEED_THRESHOLD) {
      if(stamina > 0 && walkingTime % STAMINA_LOSS_INTERVAL === 0)
        stamina -= speed;
      if(stamina < 0) stamina = 0;
    }
    moveCharacter();
  }
  function creep() {
    if(directionChanged()) {
      decayWalk();
      return;
    }
    if(speed > MAX_CREEP_SPEED) 
      speed = MAX_CREEP_SPEED;
    else if(speed < MAX_CREEP_SPEED) {
      if(walkingTime % SPEEDUP_INTERVAL === 0) 
        speed++;
    }
    moveCharacter();
  }
  function decayWalk(firstCall) {
    var singleStep = false;
    if(speed > 0) {
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
    moveCharacter();
    if(singleStep) speed = 0;
  }
  function moveCharacter() {
    var d = [0,0];
    if(isFacing === DIRECTIONS.up) d[Y] -= speed;
    else if(isFacing === DIRECTIONS.down) d[Y] += speed;
    else if(isFacing === DIRECTIONS.left) d[X] -= speed;
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