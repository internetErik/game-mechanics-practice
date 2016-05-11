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
  subscribeToKeyPress('32', function() {
    //arrays to store indexes to objects that can be interacted with
    var stationaryNdxs = [];
    var mobileNdx      = [];
    var facing = getCharState('currentDirection');
    console.log("interact");
    //check if there is an object nearby
    //this object will be a mobile or stationary object
    for(let i = mobiles.length-1; i >= 0; i--)
      if(isInRange(mobiles[i], cPos, facing))
        mobileNdx.push(i);
    for(let i = stationary.length-1; i >= 0; i--)
      if(isInRange(stationary[i], cPos, facing))
        mobileNdx.push(i);

    function isInRange(obj, character, facing) {
      //imagines object (=obj) as bigger by 10px on each side
      var nObj = [obj.pos[X]-10, obj.pos[Y]-10, obj.pos[WIDTH]+20, obj.pos[HEIGHT]+20];
      //depending on direction being faced (=facing) detect a 'hit'
      switch(facing) {
        case 'up': 
        case 'upLeft':
        case 'upRight':
          if(facing === 'up') {}
          else if(facing === 'upLeft') {}
          else if(facing === 'upRight') {}
          return false;
        case 'down': 
        case 'downLeft':
        case 'downRight':
          if(facing === 'down') {}
          else if(facing === 'downLeft') {}
          else if(facing === 'downRight') {}
          return false;
        case 'left':
          return false;
        case 'right':
          return false;
        default: return false;
      }
    }
    
  });
  //start the game loop
  var interval = setInterval(gameLoop.bind(this), 10);  
})();
