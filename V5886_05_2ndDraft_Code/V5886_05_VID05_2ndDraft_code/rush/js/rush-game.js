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
      } else {
        // put coins there if no obstacle.
        var coin = new rush.Coin();
        coin.x = platform.x + platform.width/2;
        coin.y = platform.y;
        this.stage.addChild(coin);
      }

    }

    var hero = this.hero = new rush.Hero();
    hero.x = 100;
    hero.y = 100;
    this.stage.addChild(hero);

    // for collision checking
    var platform = new rush.Platform();
    platform.x = 90;
    platform.y = 100;
    this.stage.addChild(platform);


    var obstacle = new rush.Obstacle();
    // obstacle.x = 90;
    // obstacle.y = 115;
    obstacle.x = 125;
    obstacle.y = 100;
    this.stage.addChild(obstacle);

    var coin = new rush.Coin();
    coin.x = 110;
    coin.y = 100;
    this.stage.addChild(coin);
    // end for collision checking

    this.resolveCollision();

    this.updateView();
  }

  p.updateView = function(){
    this.stage.update();
  }

  p.gameObjectHitHero = function (category, hitCallback) {
    for (var i=0, len=this.stage.children.length; i<len; i++){
      var gameObject = this.stage.children[i];

      // check collision between platform and hero
      if (gameObject.category === category) {
        // loop all collision point.
        for (var j=0, length = this.hero.collisionPoints.length; j<length; j++) {
          var collisionPoint = this.hero.collisionPoints[j];
          var point = this.hero.localToLocal(collisionPoint.x, collisionPoint.y, gameObject);
          if (gameObject.hitPoint(point)) {
            hitCallback();
          }
        }
      }
    }
  }

  p.resolveCollision = function() {

    // check collision between platform and hero
    this.gameObjectHitHero('platform', function(){
      console.log("Hero hits platform");
    });

    // check collision between obstacle and hero
    this.gameObjectHitHero('obstacle', function(){
      console.log("Hero hits obstacle");
    });

    // check collision between obstacle and hero
    this.gameObjectHitHero('coin', function(){
      console.log("Hero hits coin");
    });
  }

  return RushGame;
})();