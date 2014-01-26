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

      // let's put an obstacle on platform.
      if (Math.random()>0.5 && i >= 1) {
        var obstacle = new rush.Obstacle();
        obstacle.x = platform.x + platform.width/2;
        obstacle.y = platform.y;
        this.stage.addChild(obstacle);
      }

    }

    var hero = this.hero = new rush.Hero();
    hero.x = 100;
    hero.y = 100;
    this.stage.addChild(hero);

    // for collision checking
    var obstacle = new rush.Obstacle();
    // obstacle.x = 90;
    // obstacle.y = 115;
    obstacle.x = 120;
    obstacle.y = 100;
    this.stage.addChild(obstacle);
    // end for collision checking

    // check collision between platform and hero
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

    // check collision between obstacle and hero
    for (var i=0, len=this.stage.children.length; i<len; i++){
      var gameObject = this.stage.children[i];
      if (gameObject.category === 'obstacle') {
        // loop all collision point.
        for (var j=0, length = hero.collisionPoints.length; j<length; j++) {
          var collisionPoint = hero.collisionPoints[j];
          var point = hero.localToLocal(collisionPoint.x, collisionPoint.y, gameObject);
          if (point.x >= 0 && point.x <= gameObject.width && point.y >= 0 && point.y <= gameObject.height) {
            console.log("Hero hits obstacle");
          }
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