'use strict';
//stationary objects on the map
var stationary = [];
//mobile objects (npcs) on the map
var mobiles    = [];
(function() {
  function StationaryObject(x, y, width, height, color, renderLevel, map) {
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
})();
(function(){
  function MobileObject(x, y, width, height, color, renderLevel, map, program) {
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
    this.lastDirection = -1;
    this.isMoving = false;
    this.isSlowingDown = false;
    this.walkingTime = 0;
    this.staminaTime = 0;
    this.speed = 0;
    this.stamina = this.MAX_STAMINA;
    this.bodyWear = 0;
    this.isCreeping = false;
    this.isWalking = false;
    this.isRunning = false;
    this.isSprinting = false;
  }
  /**
   * basic level of behavior
   * @return {void}
   */
  MobileObject.prototype.behave = function behave() {
    //the goal will be to follow within some distance of the character
    var target;
    //1) See if character is visible
    target = this.findTarget();
    if(target) {
    //2) set direction to go towards character
      // this.look();
    //3) start or continue movement towards character
      this.move(target);
    }
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
      return [cPos[X], cPos[Y]];
    else
      return void(0);
    
  }
  /**
   * move mobile towards target
   * @param  {[number, number]} target the position to move towards
   * @return {void}
   */
  MobileObject.prototype.move = function move(target) {
    if(this.isCreeping) {

    }
    else if(this.isWalking) {}
    else if(this.isRunning) {}
    else if(this.isSprinting) {}
    else {
      this.startCreeping();
    }
  }
  /**
   * 
   */
  MobileObject.prototype.startCreeping = function startCreeping() {
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
  mobiles.push(new MobileObject(500, 500, 50, 50, "#f22", 1));
})();