var blocks = [];
var blockSize = 20;

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
