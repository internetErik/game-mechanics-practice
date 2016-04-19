//is the key currently held down?
var keys = {
  '37': false, //left
  '38': false, //up
  '39': false, //right
  '40': false, //down
  '32': false, //space
  '16': false,  //shift
  'left' : 37,
  'up'   : 38,
  'right': 39,
  'down' : 40,
  'space': 32,
  'shift': 16
}
var subscriptions = {};
//we pressed a button
document.addEventListener('keydown', function(e){
  var keyCode = e.keyCode;
  if(keys[keyCode] !== undefined)
     keys[keyCode] = true;
  if(subscriptions[keyCode]) 
    for(let i = 0; i < subscriptions[keyCode].length; i++)
      subscriptions[keyCode][i]();
});
//we released a button
document.addEventListener('keyup', function(e){
  var keyCode = e.keyCode;
  if(keys[keyCode] !== undefined)
    keys[keyCode] = false;
});
function isPressed(key) { //values could be 'space', 'up', 'down', 'shift'
  if(key === 'DIRECTIONAL')
    return isPressed('up') || isPressed('down') || isPressed('left') || isPressed('right');
  return keys[keys[key]];
}
function directionsPressed() {
  return isPressed('up') + isPressed('down') + isPressed('left') + isPressed('right');
}
function subscribeToKeyPress(key, fn) {
  if(subscriptions[key]) subscriptions[key].push(fn);
  else subscriptions[key] = [fn];
}