'use strict';
//canvas from dom
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
//Constants of game canvas size
const GAME_HEIGHT    = 400;
const GAME_WIDTH     = 600;
const CHARACTER_SIZE = 50;
const CENTER_X       = (GAME_WIDTH/2)-(CHARACTER_SIZE/2);
const CENTER_Y       = (GAME_HEIGHT/2)-(CHARACTER_SIZE/2);
const TILE_SIZE      = 50;
const MAP_WIDTH      = map[GROUND][0].length * TILE_SIZE;
const MAP_HEIGHT     = map[GROUND].length * TILE_SIZE;
//Constants for sementic access of position arrays
const X = 0, Y = 1, WIDTH = 2, HEIGHT = 3;
//definitions of some characters to render
//ALL OF THESE MAY MUTATE!
var cPos = [CENTER_X, CENTER_Y, CHARACTER_SIZE, CHARACTER_SIZE]; //x, y, w, h
var cLevel = 1;
var hudFill = "#000000";
var characterFill = "#ff0000";
//information about what part of the map to render
//THIS MAY MUTATE!
var curOrigin = [800, 100]; //X, Y