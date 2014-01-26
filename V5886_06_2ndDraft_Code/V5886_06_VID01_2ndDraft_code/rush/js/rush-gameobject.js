var rush = rush || {};
rush.GameObject = (function(){
  function GameObject() {
    this.initialize();
  };

  var p = GameObject.prototype = new createjs.Container();

  // instance variables
  p.category = 'object';

  p.width = 0;
  p.height = 0;

  // reference the super initialize
  // before overriding the initialize method.
  p.Container_initialize = p.initialize;
  p.initialize = function(){
    this.Container_initialize();
  }

  p.hitPoint = function(point) {
    if (point.x >= 0 && point.x <= this.width && point.y >= 0 && point.y <= this.height) {
      return true;
    }
    return false;
  }

  return GameObject;
})();