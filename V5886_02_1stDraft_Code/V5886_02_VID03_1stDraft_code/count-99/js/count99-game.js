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

    // store which number player should click on next tile.
    this.nextCount = 1;

    // we have a <span> in the HTML that display the nextCount variable.
    // We can store the reference of that element
    // so we can access later without finding it again.
    this.nextCountLabel = document.getElementById('next-count');

    // the onPress event handler for tile
    var tileOnPress = function(event) {
      if (event.target.number === this.nextCount) {
        this.stage.removeChild(event.target);

        // count the next tile.
        this.nextCount++;

        // update the canvas to reflect the new display list.
        this.stage.update();
        // update the <span id='next-count'> element
        this.nextCountLabel.innerText = this.nextCount;

      }
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