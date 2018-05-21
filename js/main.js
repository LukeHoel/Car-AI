var canvas;
var stage;
var showFeelers = true;

function handleTick(){
  cars.forEach(function(car){
    car.update();
  });
  stage.update();

}
function resize(){
  canvas.width  = (window.innerWidth*.7)*2;
  canvas.height = (window.innerHeight)*2;
  canvas.style.width = (canvas.width / 2) + "px";
  canvas.style.height = (canvas.height / 2) + "px";
}
function init(testType) {
  cars = [];
  blocks = [];
  canvas = document.getElementById("canvas");
  canvas.width  = (window.innerWidth*.7)*2;
  canvas.height = (window.innerHeight)*2;
  canvas.style.width = (canvas.width / 2) + "px";
  canvas.style.height = (canvas.height / 2) + "px";

  //stage setup
  stage = new createjs.Stage("canvas");
  setUpTest(testType);
  document.getElementById("learning").innerHTML = "";
  document.getElementById("buttons").style.display = "initial";
  canvas.style.display = "initial";
  //game loop reference
  createjs.Ticker.addEventListener("tick", handleTick);
  createjs.Ticker.framerate = 60;

  //refresh feelers and hide them initially
  showFeelers = true;
  toggleShowFeelers(TEST_TYPE_BOX);
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
function reset(){
  cars.forEach(function(car){
    car.vel = 0;
    car.shape.x = car.initX;
    car.shape.y = car.initY;
    car.setAngle(Math.random()*360);
  });
}
