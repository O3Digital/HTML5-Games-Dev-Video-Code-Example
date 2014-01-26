var rush = rush || {};

rush.Platform = (function(){
  function Platform(width){
    this.initialize(width);
  }

  var p = Platform.prototype = new rush.GameObject();

  p.category = 'platform';

  p.GameObject_initialize = p.initialize;
  p.initialize = function(width) {
    this.width = width || 120;
    this.height = 12;

    // draw a shape to represent the platform.
    var shape = rush.CommonShapes.rectangle({
      width: this.width,
      height: this.height,
    });
    this.addChild(shape);
  }

  return Platform;
})();