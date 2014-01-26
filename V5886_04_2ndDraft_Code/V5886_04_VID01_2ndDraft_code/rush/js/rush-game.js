var rush = rush || {};
rush.Game = (function() {
  // constructor
  function RushGame() {
    console.log("Rush game starts.");

    this.canvas = document.getElementById('game-canvas');

    // EaselJS Stage
    this.stage = new createjs.Stage(this.canvas);

    this.initGame();
  }

  var p = RushGame.prototype;

  p.initGame = function() {

  }

  p.updateView = function(){
    this.stage.update();
  }

  return RushGame;
})();