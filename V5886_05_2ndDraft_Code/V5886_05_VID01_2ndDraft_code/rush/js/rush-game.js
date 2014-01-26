var rush = rush || {};
rush.Game = (function() {
  // constructor
  function RushGame() {
    console.log("Rush game starts.");

    this.canvas = document.getElementById('game-canvas');

    // EaselJS Stage
    this.stage = new createjs.Stage(this.canvas);

    this.initGame();
  }

  var p = RushGame.prototype;

  p.initGame = function() {
    var lastPlatformX = 50;
    var lastPlatformY = 150;

    for (var i=0;i<10;i++)
    {
      var platform = new rush.Platform(120);

      platform.x = lastPlatformX;
      // -40~+40 from the last y position.
      platform.y = Math.random() * 80 - 40 + lastPlatformY;;

      // we need to limit the max and min y to a range.
      // the range is 80-250
      platform.y = Math.max(80, Math.min(250, platform.y));

      this.stage.addChild(platform);

      var gapBetweenPlatforms = Math.random() * 32;
      lastPlatformX += platform.width + gapBetweenPlatforms;
      lastPlatformY = platform.y;

    }

    var hero = this.hero = new rush.Hero();
    hero.x = 100;
    hero.y = 100;
    this.stage.addChild(hero);

    // for collision checking
    var platform = new rush.Platform();
    platform.x = 90;
    platform.y = 90;
    this.stage.addChild(platform);
    // end for collision checking

    // check collision
    for (var i=0, len=this.stage.children.length; i<len; i++){
      var gameObject = this.stage.children[i];
      if (gameObject.category === 'platform') {
        var collisionPointX = hero.collisionPoints[0].x;
        var collisionPointY = hero.collisionPoints[0].y;
        var point = hero.localToLocal(collisionPointX, collisionPointY, gameObject);
        if (point.x >= 0 && point.x <= gameObject.width && point.y >= 0 && point.y <= gameObject.height) {
          console.log("Hero hits platform");
        }
      }
    }

    this.updateView();
  }

  p.updateView = function(){
    this.stage.update();
  }

  return RushGame;
})();