var rush = rush || {};

rush.Coin = (function(){
  function Coin() {
    this.initialize();
  }
  var p = Coin.prototype = new rush.GameObject();

  // instance variables
  p.category = 'coin';

  p.width = 10;
  p.height = 10;

  // put registration point to the bottom center.
  p.regX = p.width/2;
  p.regY = p.height;

  p.GameObject_initialize = p.initialize;
  p.initialize = function() {
    this.GameObject_initialize();

    var shape = rush.CommonShapes.rectangle({
      width: this.width,
      height: this.height,
      fillColor: "#ff0", // yellow
    });

    this.addChild(shape);
  }

  return Coin;
})();