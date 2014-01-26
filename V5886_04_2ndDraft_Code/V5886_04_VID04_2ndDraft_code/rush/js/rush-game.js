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
    var platform = new rush.Platform();
    platform.x = 100;
    platform.y = 100;
    this.stage.addChild(platform);

    var hero = new rush.Hero();
    hero.x = 110;
    hero.y = 100;
    this.stage.addChild(hero);

    this.updateView();
  }

  p.updateView = function(){
    this.stage.update();
  }

  return RushGame;
})();