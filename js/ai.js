var blocks = [];
var blockSize = 20;

//test types
var TEST_TYPE_STAY_ON_ROAD = 0;
var TEST_TYPE_STAY_ON_ROAD_RIGHT = 1;
var TEST_TYPE_STAY_ON_ROAD_LEFT = 2;
function addBlock(x,y){
  var block = new createjs.Shape();
  block.x = x;
  block.y = y;
  block.graphics.beginFill("white").drawRect(0,0,blockSize,blockSize);
  blocks.push(block);
  stage.addChild(block);
}
function addBlockLine(startX, startY, amount, rise, run){
  for(var i = 0; i < amount; i ++){
    var x = startX + (run * i);
    var y = startY + (rise * i);
    addBlock(x,y);
  }
}
var trainingSteps = 20;
function setUpNetwork(){
  var network = new synaptic.Architect.Perceptron(feelersAmountX*feelersAmountY, 10, 10, 4);
  var trainer = new synaptic.Trainer(network)
  addBlockLine(0,canvas.height, 100, -blockSize,blockSize);
  addBlockLine(500,canvas.height, 100, -blockSize,blockSize);
  //left side of road
  var trainingSetLeftSide = [];
  for(var i = 0; i < trainingSteps; i ++){
    var offset = 50 + (Math.random() * 30) - 20;
    var angle = 45 + (Math.random() * 60) - 30;
    var car = addCar((canvas.width/2)-offset,(canvas.height/2)-offset,angle);
    var trainingInstance = {
      input: car.checkCollision(),
      output: [0,0,0,1]
    }
    stage.removeChild(car.shape);
    cars = [];
  }
  trainer.train(trainingSetLeftSide);
  return network;
}
function setUpTest(testType){
  blocks.forEach(function(block){
    stage.removeChild(block);
  });
  blocks = [];
  switch(testType){
    case(TEST_TYPE_STAY_ON_ROAD):
    addBlockLine(0,canvas.height, 100, -blockSize,blockSize);
    addBlockLine(500,canvas.height, 100, -blockSize,blockSize);
    var car = addCar(canvas.width/2,canvas.height/2,30);//a litte skewed to the left
    car.network = setUpNetwork();
    cars.push(car);
  }
}
