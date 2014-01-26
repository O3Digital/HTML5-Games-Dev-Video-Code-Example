// window/global scope
var c99 = {};

c99.Tile = (function(){
  function Tile(number){
    this.initialize();

    this.number = number;

    this.width = this.height = 80;

    var shape = new createjs.Shape();
    shape.graphics.setStrokeStyle(1);
    shape.graphics.beginStroke("#000");
    shape.graphics.beginFill("#efefef");
    shape.graphics.rect(0, 0, this.width, this.height);
    this.addChild(shape);

    var numberText = new createjs.Text(number, "24px Helvetica", "#ac1000");
    // place it at the center of the tile box.
    numberText.x = this.width/2;
    numberText.y = this.height/2;

    // align cetner, vertically and horizontally.
    numberText.textAlign = "center";
    numberText.textBaseline = "middle";
    this.addChild(numberText);
  }
  var p = Tile.prototype = new createjs.Container();

  return Tile;
})();

c99.Game = (function() {
  // constructor
  function Count99Game() {
    console.log("Count99 game starts.");

    this.canvas = document.getElementById('game-canvas');

    // EaselJS Stage
    this.stage = new createjs.Stage(this.canvas);

    var totalTiles = 10;

    // the onPress event handler for tile
    var tileOnPress = function(event) {
      this.stage.removeChild(event.target);

      // update the canvas to reflect the new display list.
      this.stage.update();
    }

    for (var i=totalTiles; i>0; i--) {
      var tile = new c99.Tile(i);
      tile.x = Math.random()*(this.canvas.width-tile.width);
      tile.y = Math.random()*(this.canvas.height-tile.height);
      tile.onPress = (tileOnPress).bind(this); // bind the outer 'this' scope into the event handler function.
      this.stage.addChild(tile);
    }

    this.stage.update();
  }

  var p = Count99Game.prototype;

  return Count99Game;
})();

window.onload = function() {
  // entry point
  var game = new c99.Game();
};