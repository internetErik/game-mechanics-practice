//canvas from dom
var canvas = document.getElementById('game');
var ctx = canvas.getContext('2d');
//Constants of game canvas size
var GAME_HEIGHT    = 400;
var GAME_WIDTH     = 600;
var CHARACTER_SIZE = 50;
var CENTER_X       = (GAME_WIDTH/2)-(CHARACTER_SIZE/2);
var CENTER_Y       = (GAME_HEIGHT/2)-(CHARACTER_SIZE/2);
console.log(`Center is ${CENTER_X}x${CENTER_Y}`)
var TILE_SIZE      = 50;
var MAP_WIDTH      = map[GROUND][0].length * TILE_SIZE;
var MAP_HEIGHT     = map[GROUND].length * TILE_SIZE;
//Constants for sementic access of position arrays
var X = 0, Y = 1, WIDTH = 2, HEIGHT = 3;
//definitions of some characters to render
var cPos = [CENTER_X, CENTER_Y, CHARACTER_SIZE, CHARACTER_SIZE]; //x, y, w, h
var cLevel = 1;
var hudFill = "#000000";
var characterFill = "#ff0000";
//information about what part of the map to render
var curOrigin = [800, 100]; //X, Y