var stationary = [];

(function() {
  function StationaryObject(x, y, width, height, color, renderLevel) {
    if(!new.target) {
      console.log("Please call StationaryObject with 'new'! returning void");
      return;
    }
    //x and y are relative to the entire map, and not just the render frame
    this.pos = [x, y, width, height];
    this.color = color;
    this.renderLevel = renderLevel;
  }

  stationary.push(new StationaryObject(1000, 1000, 200, 200, "#000", 1));
})();