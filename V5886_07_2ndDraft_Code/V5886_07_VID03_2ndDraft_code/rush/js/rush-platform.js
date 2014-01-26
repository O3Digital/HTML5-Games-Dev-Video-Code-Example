var rush = rush || {};

rush.Platform = (function(){
  function Platform(width){
    this.initialize(width);
  }

  var p = Platform.prototype = new rush.GameObject();

  p.category = 'platform';

  p.GameObject_initialize = p.initialize;
  p.initialize = function(width) {
    this.GameObject_initialize();

    this.width = width || 120;
    this.height = 12;

    var image = new createjs.Bitmap('images/platform.png');
    this.addChild(image);
  }

  return Platform;
})();