const carClass = {
  gasOn : false,
  vel : 0,
  shape : null, //the createjs shape
  feelers : [],
  network : null, //the neural network controlling the actions,
  update: function(){
    this.checkCollision();
    this.move();
  },
  move: function(){
    if(this.gasOn)
    {
      this.start();
    }
    else{
      this.stop();
    }
    this.shape.x += Math.cos(toRadians(this.shape.rotation-90)) * this.vel;
    this.shape.y += Math.sin(toRadians(this.shape.rotation-90)) * this.vel;
  },
  start: function(){
    if(this.vel < speedCap)
    this.vel += accelRate;
  },
  stop: function(){
    if(this.vel > 0)
    this.vel -= accelRate;
  },
  turnRight: function(){
    this.shape.rotation += turnSpeed;
    for(var i = 0; i < this.feelers.length; i ++){
      for(var j = 0; j < this.feelers[i].length; j ++){
        this.feelers[i][j].rotation -= turnSpeed;
      }
    }
  },
  turnLeft: function(){
    this.shape.rotation -= turnSpeed;
    for(var i = 0; i < this.feelers.length; i ++){
      for(var j = 0; j < this.feelers[i].length; j ++){
        this.feelers[i][j].rotation += turnSpeed;
      }
    }
  },
  checkCollision: function(){

    for(var i = 0; i < this.feelers.length; i ++){
      for(var j = 0; j < this.feelers[i].length; j ++){
        var feeler = this.feelers[i][j];
        var collide = false;
        for(var k = 0; k < blocks.length; k ++){
          var block = blocks[k];

          //collision detection


          var width = feelersWidth/feelersAmountX;
          var height = feelersHeight/feelersAmountY;

          var point = this.shape.localToGlobal(feeler.x-width/2,feeler.y-height/2);

          var rect1 = {left:point.x, right: point.x + width,top:point.y, bottom:point.y+height};

          var rect2 = {left:block.x, right: block.x + blockSize,top:block.y, bottom:block.y+blockSize};

          var collide = intersectRect(rect1,rect2);
          feeler.graphics.clear();
          if(collide)
          break;
        }
        if(collide){
          feeler.graphics.beginFill("red").drawRect(0,0,feelersWidth / feelersAmountX, feelersHeight / feelersAmountY);
        }else{
          var checker = (i % 2 == 0) ? (j % 2 == 0) : !(j % 2 == 0);
          feeler.graphics.beginFill(checker ? "cyan" : "blue").drawRect(0,0,feelersWidth / feelersAmountX, feelersHeight / feelersAmountY);
        }
      }
    }
  },
  setAngle: function(angle){
    this.shape.rotation = angle;
    for(var i = 0; i < this.feelers.length; i ++){
      for(var j = 0; j < this.feelers[i].length; j ++){
        this.feelers[i][j].rotation = -angle;
      }
    }
  }
}

var cars = [];
var carWidth = 50;
var carHeight = 100;
var feelersAmountX = 10;
var feelersAmountY = 10*1.3;
var feelersWidth = 200;
var feelersHeight = 300;
var feelersAlpha = .2;

var turnSpeed = 1;
var accelRate = .1;
var speedCap = 10;

function addCar(x,y,angle){
  var obj = Object.assign({}, carClass);
  var container = new createjs.Container();
  stage.addChild(container);
  obj.shape = container;
  container.x = x;
  container.y = y;


  for(var i = 0; i < feelersAmountY; i ++){
    var row = [];
    for(var o = 0; o < feelersAmountX; o ++){
      //center it initially
      var feelerX = -(feelersWidth/2);
      var feelerY = -(feelersHeight/2);
      feelerX += (feelersWidth / feelersAmountX) * o;
      feelerY += (feelersHeight / feelersAmountY) * i;
      var feeler = new createjs.Shape();
      feeler.x = feelerX + (feelersWidth / feelersAmountX)/2;
      feeler.y = feelerY + (feelersHeight / feelersAmountY)/2;
      feeler.alpha = feelersAlpha;
      var checker = (i % 2 == 0) ? (o % 2 == 0) : !(o % 2 == 0);

      feeler.graphics.beginFill(checker ? "cyan" : "blue").drawRect(0,0,feelersWidth / feelersAmountX, feelersHeight / feelersAmountY);
      feeler.regX = (feelersWidth / feelersAmountX)/2;
      feeler.regY = (feelersHeight / feelersAmountY)/2;
      container.addChild(feeler);
      row.push(feeler);
    }
    obj.feelers.push(row);
  }

  var body = new createjs.Shape();
  body.graphics.beginFill("black").drawRect(-carWidth/2,-carHeight/2,carWidth,carHeight);
  container.addChild(body);

  obj.setAngle(angle);
  cars.push(obj);
}
