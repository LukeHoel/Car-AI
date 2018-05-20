var canvas;
var stage;

function handleTick(){
  cars.forEach(function(car){
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
  setUpTest(TEST_TYPE_STAY_ON_ROAD);
  document.getElementById("learning").innerHTML = "";
  document.getElementById("buttons").style.display = "initial";
  canvas.style.display = "initial";
  //game loop reference
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.framerate = 60;

  stage.update();
}

function start(){
  cars.forEach(function(car){
    car.gasOn = true;
  });
}
function stop(){
  cars.forEach(function(car){
    car.gasOn = false;;
  });
}
