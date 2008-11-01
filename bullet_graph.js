(function($) {
  $.fn.bulletGraph = function(options) {
    var options = $.extend({
      baseColor: '#444',
      markerColor: '#c11',
      rangeColor: '#aaa',
      markerWidth: 3
    }, options ? options : {});
    
    var getContext = function(el) {
      var width = 100;
      var height = 30;
      
      console.log(el);
      
      var canvas = $('<canvas width="100" height="30"></canvas>').appendTo(el).get(0);
      return canvas.getContext("2d");
    };

    var drawBase = function(ctx) {
      ctx.fillStyle = options.baseColor;
      ctx.fillRect(1, 1, 2, 30);
      ctx.fillRect(97, 1, 2, 30);
      ctx.fillRect(1, 15, 98, 2);
    };

    var drawMarker = function(ctx) {
      ctx.fillStyle = options.markerColor;
      ctx.fillRect(48, 1, 5, 28);
    };

    var drawRange = function(ctx) {
      ctx.fillStyle = options.rangeColor;
      ctx.fillRect(25, 5, 49, 20);
    };
    
    this.each(function() {
      ctx = getContext(this);
      
      drawBase(ctx);
      drawRange(ctx);
      drawMarker(ctx);
    });
  };
}(jQuery));

jQuery(function($) {
  $('.graph').bulletGraph();
});
