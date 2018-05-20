var canvas;
var stage;

function handleTick(){
  cars.forEach(function(car){
    //car.turnRight();
    //car.start();
    //car.stop();
    car.update();
  });
  stage.update();
}

function init() {
  canvas = document.getElementById("canvas");
  canvas.width  = (window.innerWidth*.7)*2;
  canvas.height = (window.innerHeight)*2;
  canvas.style.width = (canvas.width / 2) + "px";
  canvas.style.height = (canvas.height / 2) + "px";

  //stage setup
  stage = new createjs.Stage("canvas");
  addBlockLine(0,canvas.height, 100, -blockSize,blockSize);
  addBlockLine(500,canvas.height, 100, -blockSize,blockSize);
  addCar(canvas.width/2,canvas.height/2);

  //game loop reference
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.framerate = 60;

  stage.update();
}

function start(){
  cars.forEach(function(car){
    car.start();
  });
}
function stop(){
  cars.forEach(function(car){
    car.stop();
  });
}
