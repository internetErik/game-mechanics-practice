var stationary = [];

(function() {
  function StationaryObject(x, y, width, height) {
    if(!new.target) {
      console.log("Please call StationaryObject with 'new'! returning void");
      return;
    }
    this.pos = [x, y, width, height];
  }
})();