jQuery(function($) {
  var createCanvas = function() {
    var width = 100;
    var height = 30;
    
    var canvas = $('<canvas width="100" height="30"></canvas>').appendTo($('.graph')).get(0);
    console.log(canvas);
    return canvas.getContext("2d");
  };
  
  var drawBase = function() {
    ctx.fillRect(1, 1, 2, 30);
    ctx.fillRect(97, 1, 2, 30);
    ctx.fillRect(1, 15, 98, 2);
  };
  
  var drawMarker = function() {
    ctx.fillStyle = '#777';
    ctx.fillRect(48, 1, 5, 28);
  };
  
  var drawRange = function() {
    ctx.fillStyle = '#aaa';
    ctx.fillRect(25, 5, 49, 20);
  };
  
  var ctx = createCanvas();
  drawBase(ctx);
  drawRange(ctx);
  drawMarker(ctx);
});
