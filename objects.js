var stationary = [];

(function() {
  function StationaryObject(x, y, width, height) {
    if(!new.target) {
      console.log("Please call StationaryObject with 'new'! returning void");
      return;
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }


})();