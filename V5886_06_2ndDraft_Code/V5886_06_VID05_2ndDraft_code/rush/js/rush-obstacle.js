var rush = rush || {};
rush.Obstacle = (function(){
  function Obstacle() {
    this.initialize();
  }
  var p = Obstacle.prototype = new rush.GameObject();

  p.category = 'obstacle';

  p.width = 40;
  p.height = 20;

  // put registration point to the bottom center.
  p.regX = p.width/2;
  p.regY = p.height;

  p.GameObject_initialize = p.initialize;
  p.initialize = function() {
    this.GameObject_initialize();

    var shape = rush.CommonShapes.rectangle({
      width: this.width,
      height: this.height,
      fillColor: "#f00", // red
    });
    this.addChild(shape);
  }

  return Obstacle;
})();