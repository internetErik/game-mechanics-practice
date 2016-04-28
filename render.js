'use strict';
//functions in global scope
var render;
var objectInView;
(function(){
  const TILE_WIDTH  = GAME_WIDTH /  TILE_SIZE;
  const TILE_HEIGHT = GAME_HEIGHT /  TILE_SIZE;
  render = function _render() {
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
    ctx.fillText("Facing: " + getCharState('currentDirection'), 10, 20);
    ctx.fillText("Speed: " + getCharState('speed'), 10, 40);
    ctx.fillText("Stamina: " + getCharState('stamina'), 10, 60);
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
  objectInView = function _objectInView(obj) {
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
    var boundX = initX + TILE_WIDTH;
    var boundY = initY + TILE_HEIGHT;
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
      //TILE_WIDTH x TILE_HEIGHT
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
      let bottom = TILE_SIZE * TILE_HEIGHT - offsetY;
      let right  = TILE_SIZE * TILE_WIDTH - offsetX;
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
      //TILE_WIDTH+1 x TILE_HEIGHT
      let bottom = TILE_SIZE * TILE_HEIGHT - offsetY;
      let right  = TILE_SIZE * TILE_WIDTH - offsetX;
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
      //TILE_WIDTH x TILE_HEIGHT+1
      let bottom = TILE_SIZE * TILE_HEIGHT - offsetY;
      let right  = TILE_SIZE * TILE_WIDTH - offsetX;
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
})();