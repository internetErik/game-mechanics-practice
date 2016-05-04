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
  }
  MobileObject.prototype.transformPos = function transformPos(curOrigin) {
    var ox = curOrigin[0], oy = curOrigin[1];
    return [this.pos[0] - ox, this.pos[1] - oy, this.pos[2], this.pos[3]];
  }
  MobileObject.prototype.behave = function behave() {
    console.log("doing stuff!");
  }
  mobiles.push(new MobileObject(500, 500, 50, 50, "#f00", 1));
})();