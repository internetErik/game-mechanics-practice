'use strict';
(function() {
  function gameLoop() {
    clearFrame();
    handleInputUpdates();
    render();
  }    
  var interval = setInterval(gameLoop.bind(this), 0);  
  function clearFrame() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  }
  //register a function to perform on spacebar
  subscribeToKeyPress('32', function() {
    console.log("act");
  });
})();
