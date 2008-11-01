(function($) {
  $.fn.bulletGraph = function(min, max, marker, options) {
    var options = $.extend({
      baseColor: '#444',
      markerColor: '#c11',
      rangeColor: '#aaa',
      markerWidth: 3
    }, options ? options : {});
    
    var getContext = function(el) {
      var width = 100;
      var height = 30;
      
      var canvas = $('<canvas width="100" height="30"></canvas>').appendTo(el).get(0);
      return canvas.getContext("2d");
    };
    
    var drawEdges = function(ctx) {
      ctx.fillStyle = options.baseColor;
      ctx.fillRect(1, 1, 2, 30);
      ctx.fillRect(97, 1, 2, 30);
    };
    
    var drawBar = function(ctx) {
      ctx.fillStyle = options.baseColor;
      ctx.fillRect(1, 15, 98, 2);
    };
    
    var drawMarker = function(ctx) {
      ctx.fillStyle = options.markerColor;
      ctx.fillRect(marker, 1, 5, 28);
    };
    
    var drawRange = function(ctx) {
      ctx.fillStyle = options.rangeColor;
      ctx.fillRect(min + 1, 5, (max - min) + 1, 20);
    };
    
    this.each(function() {
      ctx = getContext(this);
      
      drawEdges(ctx);
      drawBar(ctx);
      drawRange(ctx);
      drawMarker(ctx);
    });
  };
}(jQuery));

jQuery(function($) {
  $('.graph').bulletGraph(25, 75, 50);
});
