var rush = rush || {};
rush.Hero = (function(){
  function Hero() {
    this.initialize();
  };
  var p = Hero.prototype = new rush.MovableGameObject();

  // super initialize
  p.MovableGameObject_initialize = p.initialize;
  p.initialize = function() {
    this.MovableGameObject_initialize();

    this.category = 'hero';

    this.width = 10;
    this.height = 16;

    // put registration point to the middle of botth feet.
    this.regX = this.width/2;
    this.regY = this.height;

    var shape = rush.CommonShapes.rectangle({
      width: this.width,
      height: this.height,
      fillColor: "#0f0", // green
    });
    this.addChild(shape);

    // collision point
    this.collisionPoints = [
      new createjs.Point(this.width/2, this.height), // bottom center
      new createjs.Point(this.width, this.height/2), // right middle
    ];
  };

  return Hero;
})();