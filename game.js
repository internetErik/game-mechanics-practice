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
    console.log("interact");
    //check if there is an object nearby
    //this object will be a mobile or stationary object
    for(let i = mobiles.length; i >= 0; i--)
      if(isInRange())
        mobileNdx.push(i);
    for(let i = stationary.length; i >= 0; i--)
      if(isInRange())
        mobileNdx.push(i);

    function isInRange(obj, character, facing) {
      return true;
    }
    
  });
  //start the game loop
  var interval = setInterval(gameLoop.bind(this), 10);  
})();
