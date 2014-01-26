var rush = rush || {};
rush.Game = (function() {
  // constructor
  function RushGame() {
    console.log("Rush game starts.");

    this.canvas = document.getElementById('game-canvas');

    // EaselJS Stage
    this.stage = new createjs.Stage(this.canvas);

    // Camera
    this.camera = new createjs.Container();
    this.stage.addChild(this.camera);

    // Create heartbreat for our game loop
    createjs.Ticker.setFPS(40);
    createjs.Ticker.addListener(this, /*pausable=*/ true);

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

      this.camera.addChild(platform);

      var gapBetweenPlatforms = Math.random() * 32;
      lastPlatformX += platform.width + gapBetweenPlatforms;
      lastPlatformY = platform.y;

      // let's put an obstacle on platform.
      if (Math.random()>0.5 && i >= 1) {
        var obstacle = new rush.Obstacle();
        obstacle.x = platform.x + platform.width/2;
        obstacle.y = platform.y;
        this.camera.addChild(obstacle);
      } else {
        // put coins there if no obstacle.
        var coin = new rush.Coin();
        coin.x = platform.x + platform.width/2;
        coin.y = platform.y;
        this.camera.addChild(coin);
      }

    }

    var hero = this.hero = new rush.Hero();
    hero.x = 100;
    hero.y = 100;
    this.camera.addChild(hero);

    this.stage.onMouseDown = function() {
      hero.jump();
    }

    this.updateView();
  }

  p.tick = function() {
    this.updateView();

    this.moveGameObjects();
    this.resolveCollision();

    this.moveCamera();
  }

  p.moveCamera = function() {
    this.camera.x -= this.hero.velocity.x;
  }

  p.updateView = function(){
    this.stage.update();
  }

  p.moveGameObjects = function () {
    for (var i=0, len=this.camera.children.length; i<len; i++){
      var gameObject = this.camera.children[i];

      if (gameObject.velocity) {
        gameObject.x += gameObject.velocity.x;
        gameObject.y += gameObject.velocity.y;
      }
    }
  }

  p.gameObjectHitHero = function (category, hitCallback) {
    for (var i=0, len=this.camera.children.length; i<len; i++){
      var gameObject = this.camera.children[i];

      // check collision between platform and hero
      if (gameObject.category === category) {
        // loop all collision point.
        for (var j=0, length = this.hero.collisionPoints.length; j<length; j++) {
          var collisionPoint = this.hero.collisionPoints[j];
          var point = this.hero.localToLocal(collisionPoint.x, collisionPoint.y, gameObject);
          if (gameObject.hitPoint(point)) {
            hitCallback(point);
          }
        }
      }
    }
  }

  p.resolveCollision = function() {
    // check collision between platform and hero
    this.hero.onGround = false;
    this.gameObjectHitHero('platform', (function(point){
      // get distance between target point and game object
      var distanceY = - point.y;
      if (this.hero.velocity.y > 0) {
        this.hero.y += distanceY;
        this.hero.velocity.y = 0;
      }

      this.hero.onGround = true;
    }).bind(this));

    // check collision between obstacle and hero
    this.gameObjectHitHero('obstacle', function(){
    });

    // check collision between obstacle and hero
    this.gameObjectHitHero('coin', function(){
    });
  }

  return RushGame;
})();