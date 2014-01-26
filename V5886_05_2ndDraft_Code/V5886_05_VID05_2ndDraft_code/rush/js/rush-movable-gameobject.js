var rush = rush || {};

rush.MovableGameObject = (function(){
  function MovableGameObject() {
    this.initialize();
  };

  var p = MovableGameObject.prototype = new rush.GameObject();

  p.GameObject_initialize = p.initialize;
  p.initialize = function() {
    this.GameObject_initialize();
  }

  return MovableGameObject;
})();