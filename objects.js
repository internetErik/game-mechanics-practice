'use strict';
var stationary = [];//stationary objects on the map
var mobiles    = [];//mobile objects (npcs) on the map
(function() {
  //these are flags for objects. 
  //in use, undefined should produce the same result as false
  var flags = {
    solid: true, //true = cannot be walked through
    interactable: true //true = reacts to interaction
  };
  function StationaryObject(x, y, width, height, color, renderLevel, map, flags) {
    if(!new.target) {
      console.log("Please call StationaryObject with 'new'! returning void");
      return;
    }
    //x and y are relative to the entire map, and not just the render frame
    this.pos = [x, y, width, height];
    this.color = color;
    this.renderLevel = renderLevel;
    //map is a description of the object akin to that of the map
    this.map = map;
  }
  StationaryObject.prototype.transformPos = function transformPos(curOrigin) {
    var ox = curOrigin[0], oy = curOrigin[1];
    return [this.pos[0] - ox, this.pos[1] - oy, this.pos[2], this.pos[3]];
  }
  stationary.push(new StationaryObject(1000, 1000, 200, 200, "#f60", 1));
  stationary.push(new StationaryObject(1254, 1000, 200, 200, "#f60", 1));
  stationary.push(new StationaryObject(1000, 1254, 200, 200, "#f60", 1));
  stationary.push(new StationaryObject(1254, 1254, 200, 200, "#f60", 1));
})();
(function(){
  function MobileObject(x, y, width, height, color, renderLevel, map, program, flags) {
    if(!new.target) {
      console.log("Please call StationaryObject with 'new'! returning void");
      return;
    }
    //x and y are relative to the entire map, and not just the render frame
    this.pos = [x, y, width, height];
    this.color = color;
    this.renderLevel = renderLevel;
    //map is a description of the object akin to that of the map
    this.map = map;
    //this is the program that the mobile will carry out.
    //it is either a function, or a number that corresponds to a type of 
    //behavior
    this.program = program;
    //state of mobile  const SPEEDUP_INTERVAL = 50;
    this.SLOWDOWN_INTERVAL = 10;
    this.INITIAL_SPEED = 0;
    this.MAX_CREEP_SPEED = 1;
    this.MAX_WALK_SPEED = 2;
    this.MAX_RUN_SPEED = 3;
    this.MAX_SPRINT_SPEED = 5;
    this.WEAR_SPEED_THRESHOLD = 2;
    this.STAMINA_LOSS_INTERVAL = 30;
    this.STAMINA_GAIN_INTERVAL = 60;
    this.MAX_STAMINA = 20;
    this.BODY_WEAR_LOSS_INTERVAL = 30;
    this.BODY_WEAR_GAIN_INTERVAL = 60;
    this.MAX_BODY_WEAR = 10;
    //hand rolled enum of directions
    this.DIRECTIONS = {
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
    this.isFacing = 3;
    this.isMoving = false;
    this.isSlowingDown = false;
    this.walkingTime = 0;
    this.staminaTime = 0;
    this.speed = 0;
    this.stamina = this.MAX_STAMINA;
    this.bodyWear = 0;
    this.isMoving = false;
    this.isCreeping = false;
    this.isWalking = false;
    this.isRunning = false;
    this.isSprinting = false;
    this.target = [this.pos[X], this.pos[Y]];
  }
  /**
   * basic level of behavior
   * @return {void}
   */
  MobileObject.prototype.behave = function behave() {
    //the goal will be to follow within some distance of the character
    //1) See if character is visible
    this.target = this.findTarget();
    if(this.target[X] !== this.pos[X] && this.target[Y] !== this.pos[Y]) {
    //2) set direction to go towards character
      this.look();
    //3) start or continue movement towards character
      this.move();
    }
  }
  /**
   * Sets mobile's direction to face target
   * @return {void}
   */
  MobileObject.prototype.look = function look() {
    this.reversedDirection();
  }
  /**
   * Sees if the character is within view. We assume that the mob sees one screen
   * @return {[number, number]} the x, y position to move towards (if no 
   *                            movement, return current location)
   */
  MobileObject.prototype.findTarget = function findTarget() {
    var L = cPos[X] + curOrigin[X], 
        T = cPos[Y] + curOrigin[Y], 
        W = CHARACTER_SIZE, H = CHARACTER_SIZE,
        l = this.pos[X] - (GAME_WIDTH/2) + (this.pos[WIDTH]/2), 
        t = this.pos[Y] - (GAME_HEIGHT/2) + (this.pos[HEIGHT]/2), 
        w = GAME_WIDTH, h = GAME_HEIGHT;
    if(l <= L+W && l >= L-w && t <= T+H && t >= T-h)
      return [cPos[X], cPos[Y]]; //position of the target
    else
      return [this.pos[X], this.pos[Y]]; // return the position of the mobile
  }
  /**
   * move mobile towards target
   * @param  {[number, number]} target the position to move towards
   * @return {void}
   */
  MobileObject.prototype.move = function move() {
    if(!this.isMoving) this.startCreeping();
    if(this.isCreeping) this.creep();
    else if(this.isWalking) {}
    else if(this.isRunning) {}
    else if(this.isSprinting) {}
  }
  /**
   * 
   */
  MobileObject.prototype.startCreeping = function startCreeping() {
    this.isMoving = true;
    this.isCreeping = true;
    this.isWalking = false;
    this.isRunning = false;
    this.isSprinting = false;
    this.isSlowingDown = false;
    this.walkingTime = 0;
    if(this.speed > this.MAX_CREEP_SPEED)
      this.speed = this.MAX_CREEP_SPEED;
    else
      this.speed = this.INITIAL_SPEED;
  }
  /**
   * called whenever character is moving in order to change speed
   * @return {void}
   * @sideEffects: speed incremements
   */
  MobileObject.prototype.speedUp = function speedUp() {
    //first point to speed happens faster
    if(this.speed === 0 && this.walkingTime > this.SPEEDUP_INTERVAL/3)
      this.speed++
    else if(this.walkingTime % this.SPEEDUP_INTERVAL === 0) 
      this.speed++;
  }
  /**
   * Handle logic for creeping (slow walking)
   * @return {void}
   * @sideEffects: speed, stamina
   */
  MobileObject.prototype.creep = function creep() {
    if(this.reversedDirection()) {
      this.decayWalk();
      return;
    }
    if(this.speed > this.MAX_CREEP_SPEED) 
      this.speed = this.MAX_CREEP_SPEED;
    else if(this.speed < this.MAX_CREEP_SPEED) this.speedUp();
    this.moveMobile();
  }
  /**
   * Sets the direction based on the position of the target
   * @return {null}
   * @sideEffects: isFacing
   */
  MobileObject.prototype.setDirection = function setDirection() {
    //find where the target is relative to the mobile
    //[_,-] = up
    //[_,+] = down
    //[-,_] = left
    //[+,_] = right
    if(this.pos[X] > this.target[X]) { //left
      if(this.pos[Y] > this.target[Y]) { // bottom
      }
      else { //top
      }
    }
    else { //right
      if(this.pos[Y] > this.target[Y]) { // bottom
      }
      else { //top
      }
    }
  }
  /**
   * Called to see if a change in direction is a full reverse or only a turn
   * @return {boolean} true if direction has been reversed, false if its only a turn 
   * @sideEffects: isFacing, isSlowingDown
   */
  MobileObject.prototype.reversedDirection = function reversedDirection() {
    var reversed = false;
    var oldDirection = this.isFacing;
    this.setDirection();
    if(oldDirection !== this.isFacing) {
      if(this.DIRECTION[oldDirection] === 'up') 
        reversed = this.DIRECTION[isFacing] !== 'upRight' && this.DIRECTION[isFacing] !== 'upLeft';
      else if(this.DIRECTION[oldDirection] === 'down') 
        reversed = this.DIRECTION[isFacing] !== 'downRight' && this.DIRECTION[isFacing] !== 'downLeft';
      else if(this.DIRECTION[oldDirection] === 'left') 
        reversed = this.DIRECTION[isFacing] !== 'upLeft' && this.DIRECTION[isFacing] !== 'downLeft';
      else if(this.DIRECTION[oldDirection] === 'right') 
        reversed = this.DIRECTION[isFacing] !== 'upRight' && this.DIRECTION[isFacing] !== 'downRight';
      else if(this.DIRECTION[oldDirection] === 'upRight') 
        reversed = this.DIRECTION[isFacing] !== 'up' && this.DIRECTION[isFacing] !== 'right';
      else if(this.DIRECTION[oldDirection] === 'upLeft') 
        reversed = this.DIRECTION[isFacing] !== 'up' && this.DIRECTION[isFacing] !== 'left';
      else if(this.DIRECTION[oldDirection] === 'downRight') 
        reversed = this.DIRECTION[isFacing] !== 'down' && this.DIRECTION[isFacing] !== 'right';
      else if(this.DIRECTION[oldDirection] === 'downLeft') 
        reversed = this.DIRECTION[isFacing] !== 'down' && this.DIRECTION[isFacing] !== 'left';
      if(reversed) {
        this.isFacing = oldDirection; //change facing back so we can slide to a stop
        this.isSlowingDown = true;
      }
    }
    return reversed;
  }
  /**
   * start slowing down character for a stop of change directions
   * @param  {boolean} firstCall set to true on first call in order to allow 
   *                   for single step to be taken
   * @return {void}
   * @sideEffects: speed, isMoving, isSlowingDown
   */
  MobileObject.prototype.decayWalk = function decayWalk(firstCall) {
    var singleStep = false;
    if(this.speed > 0) {
      if(this.walkingTime % this.SLOWDOWN_INTERVAL === 0)
        this.speed--;
    }
    else {
      this.isCreeping = false;
      this.isWalking = false;
      this.isRunning = false;
      this.isSprinting = false;
      this.isSlowingDown = false;
    }
    if(firstCall && this.speed === 0) { 
      this.singleStep = true;
      this.speed = 1;
    }
    this.moveMobile();
    if(singleStep) this.speed = 0;
  }
  /**
   * set the vector of direction change and call function to change position
   * @return {void}
   */
  MobileObject.prototype.moveMobile = function moveMobile() {
    var d = [0,0];
    if(this.isFacing === this.DIRECTIONS.up) d[Y] -= this.speed;
    else if(this.isFacing === this.DIRECTIONS.down) d[Y] += this.speed;
    else if(this.isFacing === this.DIRECTIONS.left) d[X] -= this.speed;
    else if(this.isFacing === this.DIRECTIONS.right) d[X] += this.speed;
    else if(this.isFacing === this.DIRECTIONS.upRight) {
      d[X] += Math.ceil(this.speed/2);
      d[Y] -= Math.ceil(this.speed/2);
    }
    else if(this.isFacing === this.DIRECTIONS.upLeft) {
      d[X] -= Math.ceil(this.speed/2);
      d[Y] -= Math.ceil(this.speed/2);
    }
    else if(this.isFacing === this.DIRECTIONS.downRight) {
      d[X] += Math.ceil(speed/2);
      d[Y] += Math.ceil(speed/2);
    }
    else if(this.isFacing === this.DIRECTIONS.downLeft) {
      d[X] -= Math.ceil(this.speed/2);
      d[Y] += Math.ceil(this.speed/2);
    }
    // this.changePosition(d, 0);
  }
  mobiles.push(new MobileObject(500, 500, 50, 50, "#f22", 1));
})();