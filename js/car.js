const carClass = {
  vel : 0,
  shape : null, //the createjs shape
  feelers : [],
  network : null, //the neural network controlling the actions,
  update: function(){
    this.goForward();
  },
  goForward: function(){
    this.shape.x += Math.cos(toRadians(this.shape.rotation-90)) * this.vel;
    this.shape.y += Math.sin(toRadians(this.shape.rotation-90)) * this.vel;
  },
  faster: function(){
    if(this.vel < speedCap)
    this.vel += accelRate;
  },
  slower: function(){
    if(this.vel > 0)
    this.vel -= accelRate;
  }
}

var cars = [];
var carWidth = 50;
var carHeight = 100;
var feelersAmountX = 10;
var feelersAmountY = 15;
var feelersWidth = 200;
var feelersHeight =300;
var feelersAlpha = .2;

var accelRate = .1;
var speedCap = 10;

function addCar(x,y){
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
      feeler.x = feelerX;
      feeler.y = feelerY;
      feeler.alpha = feelersAlpha;
      var checker = (i % 2 == 0) ? (o % 2 == 0) : !(o % 2 == 0);

      feeler.graphics.beginFill(checker ? "cyan" : "blue").drawRect(0,0,feelersWidth / feelersAmountX, feelersHeight / feelersAmountY);
      feeler.setBounds(0,0,feelersWidth / feelersAmountX, feelersHeight / feelersAmountY);
      container.addChild(feeler);
      row.push(feeler);
    }
    obj.feelers.push(row);
  }

  var body = new createjs.Shape();
  body.graphics.beginFill("black").drawRect(-carWidth/2,-carHeight/2,carWidth,carHeight);
  container.addChild(body);

  cars.push(obj);
}
