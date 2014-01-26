// window/global scope
var c99 = {};

c99.Game = (function() {
  // constructor
  function Count99Game() {
    console.log("Count99 game starts.");

    this.canvas = document.getElementById('game-canvas');

    // EaselJS Stage
    this.stage = new createjs.Stage(this.canvas);
    createjs.Touch.enable(this.stage, /*singleTouch=*/ true, /*allowDefault=*/false);

    // try to draw a shape
    var shape = new createjs.Shape();
    shape.graphics.setStrokeStyle(1);
    shape.graphics.beginStroke("#000");
    shape.graphics.beginFill("#efefef");
    shape.graphics.rect(0, 0, 80, 80);

    this.stage.addChild(shape);

    this.stage.update();
  }

  var p = Count99Game.prototype;

  return Count99Game;
})();

window.onload = function() {
  // entry point
  var game = new c99.Game();
};