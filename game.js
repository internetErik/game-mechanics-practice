'use strict';
(function() {
  /**
   * the main loop for the game
   * @return {void}
   */
  function gameLoop() {
    var i = mobiles.length-1;
    characterUpdatePhase();
    for(; i >= 0; i--)
      mobiles[i].behave();
    render();
  }
  //register a function to perform on spacebar
  // This should see if there is an object to interact with within range of the
  // direction the character is facing.
  // if character is close to two things he will interact with the closer of them
  // if there are two equally close, he will interact with the left one
  // if facing a diagonal, objects on both sides of diagonal will be considered
  var unsubfn = subscribeToKeyPress('32', function() {
    //arrays to store indexes to objects that can be interacted with
    var stationaryNdxs = [];
    var mobileNdxs     = [];
    var facing = getCharState('currentFacingDirection');
    //check if there is an object nearby
    //this object will be a mobile or stationary object
    for(let i = mobiles.length-1; i >= 0; i--)
      if(mobiles[i].interactable && isInRange(cPos, facing, 20, mobiles[i]))
        mobileNdxs.push(i);
    for(let i = stationary.length-1; i >= 0; i--)
      if(stationary[i].interactable && isInRange(cPos, facing, 20, stationary[i]))
        stationaryNdxs.push(i);
      console.log("mobiles",mobileNdxs);
      console.log("stationary", stationaryNdxs);
    function isInRange(agent, facing, range, patient) {
      //imagines object (=obj) as bigger by 10px on each side
      var x = patient.pos[X], y = patient.pos[Y], w = patient.pos[WIDTH], h = patient.pos[HEIGHT];
      var cX = agent[X] + curOrigin[X], cY = agent[Y] + curOrigin[Y],
          cW = agent[WIDTH], cH = agent[HEIGHT];
      //depending on direction being faced (=facing) detect a 'hit'
      switch(facing) {
        case 'up':
          return ((cX + cW >= x && cX + cW <= x + w) ||
                  (cX >= x      && cX <= x + w     )   ) &&
                 cY <= y + h + range && cY >= y;
        case 'down':
          return ((cX + cW >= x && cX + cW <= x + w) ||
                  (cX >= x      && cX <= x + w)        ) &&
                 cY + cH >= y - range && cY + cH <= y + h;
        case 'left':
          return ((cY + cH >= y && cY + cH <= y + h) ||
                  (cY >= y      && cY <= y + h     )   ) &&
                 cX <= x + w + range && cX >= x;
        case 'right':
          return ((cY + cH >= y && cY + cH <= y + h) ||
                  (cY >= y      && cY <= y + h     )   ) &&
                 cX + cW >= x - range && cX + cW <= x + w;
        case 'upLeft':
          return ( //up
                  ((cX + cW >= x && cX + cW <= x + w) ||
                  (cX >= x      && cX <= x + w     )   ) &&
                  cY <= y + h + range && cY >= y
                  ) ||
                 ( //left
                  ((cY + cH >= y && cY + cH <= y + h) ||
                  (cY >= y      && cY <= y + h     )   ) &&
                  cX <= x + w + range && cX >= x
                  );
        case 'upRight':
          return ( //up
                  ((cX + cW >= x && cX + cW <= x + w) ||
                  (cX >= x      && cX <= x + w     )   ) &&
                  cY <= y + h + range && cY >= y
                  ) ||
                 ( //right
                  ((cY + cH >= y && cY + cH <= y + h) ||
                  (cY >= y      && cY <= y + h     )   ) &&
                  cX + cW >= x - range && cX + cW <= x + w
                  );
        case 'downLeft':
          return ( //down
                  ((cX + cW >= x && cX + cW <= x + w) ||
                  (cX >= x      && cX <= x + w)        ) &&
                  cY + cH >= y - range && cY + cH <= y + h
                  ) ||
                 ( //left
                  ((cY + cH >= y && cY + cH <= y + h) ||
                  (cY >= y      && cY <= y + h     )   ) &&
                  cX <= x + w + range && cX >= x
                  );
        case 'downRight':
          return ( //down
                  ((cX + cW >= x && cX + cW <= x + w) ||
                  (cX >= x      && cX <= x + w)        ) &&
                  cY + cH >= y - range && cY + cH <= y + h
                  ) ||
                 ( //right
                  ((cY + cH >= y && cY + cH <= y + h) ||
                  (cY >= y      && cY <= y + h     )   ) &&
                  cX + cW >= x - range && cX + cW <= x + w
                  );
        default: return false;//this should never happen
      }
      return false;
    }
  });
  //start the game loop
  var interval = setInterval(gameLoop.bind(this), 10);
})();
