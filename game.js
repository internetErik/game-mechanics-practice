'use strict';
(function() {
  /**
   * the main loop for the game
   * @return {void}
   */
  function gameLoop() {
    characterUpdatePhase();
    render();
  }
  //register a function to perform on spacebar
  subscribeToKeyPress('32', function() {
    console.log("act");
  });
  //start the game loop
  var interval = setInterval(gameLoop.bind(this), 10);  
})();
