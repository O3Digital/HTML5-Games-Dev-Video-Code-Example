// window/global scope
var c99 = {};

c99.Game = (function() {
  // constructor
  function Count99Game() {
    console.log("Count99 game starts.");

    this.canvas = document.getElementById('game-canvas');

    // EaselJS Stage
    this.stage = new createjs.Stage(this.canvas);

    this.stage.update();
  }

  var p = Count99Game.prototype;

  return Count99Game;
})();

window.onload = function() {
  // entry point
  var game = new c99.Game();
};