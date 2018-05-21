var blocks = [];
var blockSize = 40;

//test types
var TEST_TYPE_STAY_ON_ROAD = 0;
var TEST_TYPE_ROAD_NORMAL = 1;
function addBlock(x,y,size){
  var block = new createjs.Shape();
  block.x = x;
  block.y = y;
  block.graphics.beginFill("white").drawRect(0,0,size,size);
  blocks.push({
    size:size,
    shape:block
  });
  stage.addChild(block);
}
function addBlockLine(startX, startY, amount, rise, run){
  for(var i = 0; i < amount; i ++){
    var x = startX + (run * i);
    var y = startY + (rise * i);
    addBlock(x,y,blockSize);
  }
}
var trainingSteps = 10;
function setUpNetwork(){
  var network = new synaptic.Architect.Perceptron(feelersAmountX*feelersAmountY, 10, 10, 4);
  var trainer = new synaptic.Trainer(network)
  var roadOffset = 800
  addBlockLine(((canvas.width/2)-250)-roadOffset,(canvas.height/2)+roadOffset, 50, -blockSize,blockSize);
  addBlockLine(((canvas.width/2)+250)-roadOffset,(canvas.height/2)+roadOffset, 50, -blockSize,blockSize);

  var trainingSet = [];
  //left side of road
  for(var i = 0; i < trainingSteps; i ++){
    var offset = 50 + (Math.random() * 30) - 15;
    var angle = 45 + (Math.random() * 60) - 30;
    var car = addCar((canvas.width/2)-offset,(canvas.height/2)-offset,angle);
    var trainingInstance = {
      input: car.checkCollision(),
      output: [0,0,0,1]
    }
    stage.removeChild(car.shape);
    cars = [];

    trainingSet.push(trainingInstance);
  }
  //right side of road
  for(var i = 0; i < trainingSteps; i ++){
    var offset = 50 + (Math.random() * 30) - 15;
    var angle = 45 + (Math.random() * 60) - 30;
    var car = addCar((canvas.width/2)+offset,(canvas.height/2)+offset,angle);
    var trainingInstance = {
      input: car.checkCollision(),
      output: [0,0,1,0]
    }
    stage.removeChild(car.shape);
    cars = [];

    trainingSet.push(trainingInstance);
  }

  //middle of road
  for(var i = 0; i < trainingSteps; i ++){
    var offset = 50 + (Math.random() * 30) - 20;
    var angle = 45 + (Math.random() * 60) - 30;
    var car = addCar((canvas.width/2),(canvas.height/2),angle);
    var trainingInstance = {
      input: car.checkCollision(),
      output: [1,0,0,0]
    }
    stage.removeChild(car.shape);
    cars = [];

    trainingSet.push(trainingInstance);
  }

  for(var i = 0; i < trainingSteps; i ++){
    var offset = 50 + (Math.random() * 30) - 20;
    var angle = 90 + (Math.random() * 30) - 15;
    var car = addCar((canvas.width/2)+offset,(canvas.height/2)+offset,angle);
    var trainingInstance = {
      input: car.checkCollision(),
      output: [0,1,0,0]
    }
    stage.removeChild(car.shape);
    cars = [];

    trainingSet.push(trainingInstance);
  }



  blocks.forEach(function(block){
    stage.removeChild(block.shape);
  });
  blocks = [];
  trainer.train(trainingSet);
  return network;
}

function exportStandalone(){
    var network = setUpNetwork();
    var standalone = network.standalone();
    console.log(standalone.toString());
    init();
}

function setUpTest(testType){
  blocks.forEach(function(block){
    stage.removeChild(block);
  });
  blocks = [];
  switch(testType){
    case(TEST_TYPE_STAY_ON_ROAD):
    var offset = 500;
    var angle = 45 + Math.random() * 30;
    var x = (canvas.width/2)-offset;
    var y = (canvas.height/2)+offset;
    var car = addCar(x,y,angle);//a litte skewed to the left
    car.initX = x;
    car.initY = y;
    car.initAngle = angle;
    car.network = setUpNetwork();
    var roadOffset = 600;
    addBlockLine(((canvas.width/2)-250)-roadOffset,(canvas.height/2)+roadOffset, 50, -blockSize,blockSize);
    addBlockLine(((canvas.width/2)+250)-roadOffset,(canvas.height/2)+roadOffset, 50, -blockSize,blockSize);
    var stopperOffset = 500;
    addBlockLine(((canvas.width/2)+blockSize*10) + stopperOffset,(canvas.height/2)-stopperOffset, 10, -blockSize,-blockSize);

    cars.push(car);
    break;

    case(TEST_TYPE_ROAD_NORMAL):
    var roadWidth = 250;
    var x = canvas.width/2;
    var y = canvas.height-carHeight - roadWidth*2;
    var angle = Math.random()*360;
    var car = addCar(x,y,angle);
    car.initX = x;
    car.initY = y;
    car.initAngle = angle;
    //car.network = setUpNetwork();
    //car.network = standalone();
    addBlock((canvas.width/2)-roadWidth,canvas.height-roadWidth, roadWidth);
    addBlock((canvas.width/2),canvas.height-roadWidth, roadWidth);
    for(var i = 2; i < 6; i ++){
      addBlock((canvas.width/2)-roadWidth*2,canvas.height-roadWidth*i, roadWidth);
      addBlock((canvas.width/2)+roadWidth,canvas.height-roadWidth*i, roadWidth);
    }
    addBlock((canvas.width/2)-roadWidth,canvas.height-roadWidth*6, roadWidth);
    addBlock((canvas.width/2),canvas.height-roadWidth*6, roadWidth);
    cars.push(car);
    break;
  }
}
var minAccept = .5;
function chooseAction(car){
  var input = car.checkCollision();
  //var output = car.network.activate(input);
  var output = standalone(input);
  if(anySubstantial(output)){

    highestIndex = 0;
    highest = 0;
    for(var i = 0; i < output.length;i++){
      if(output[i] > highest){
        highestIndex = i;
        highest = output[i];
      }
    }
    switch(highestIndex){
      case(0):
      car.gasOn = true;
      break;
      case(1):
      car.gasOn = false;
      break;
      case(2):
      car.turnLeft();
      break;
      case(3):
      car.turnRight();
      break;
    }
  }
}
