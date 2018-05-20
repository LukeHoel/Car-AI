function distance(x1,y1,x2,y2){
  var a = x1 - x2;
  var b = y1 - y2;
  var c = Math.sqrt( a*a + b*b );
  return c;
}
function angle(x1,y1,x2,y2){
  var angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  return angleDeg;
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}
