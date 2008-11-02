(function($) {
  $.fn.canvas = function(width, height) {
    var canvas = $('<canvas width="' + width + '" height="' + height + '"></canvas>').appendTo(this).get(0);
    
    if ($.browser.msie) {
      canvas = window.G_vmlCanvasManager.initElement(canvas);
    }
    
    return canvas.getContext("2d");
  };
}(jQuery));

(function($) {
  $.fn.bulletGraph = function(min, max, marker, options) {
    options = $.extend({
      baseColor: '#444',
      markerColor: '#c11',
      rangeColor: '#aaa',
      markerWidth: 3,
      width: 100,
      height: 30,
      padding: 2,
      lineThickness: 2.5,
      drawEdges: true
    }, options ? options : {});
    
    var getContext = function(el) {
      return $(el).canvas(options.width, options.height);
    };
    
    var normalizeX = function(n) {
      return Math.ceil((((options.width - (2 * options.padding)) / options.width) * n) + options.padding);
    };
    
    var normalizeY = function(n) {
      return Math.ceil((((options.height - (2 * options.padding)) / options.height) * n) + options.padding);
    };
    
    var rangeThickness = function() {
      return options.height * 0.5;
    };
    
    var drawEdges = function(ctx) {
      ctx.fillStyle = options.baseColor;
      ctx.fillRect(normalizeX(0), normalizeY(0), options.lineThickness, options.height);
      ctx.fillRect(options.width - options.padding - 2, options.padding, options.lineThickness, options.height);
    };
    
    var drawBar = function(ctx) {
      ctx.fillStyle = options.baseColor;
      ctx.fillRect(normalizeX(0), options.height / 2, options.width - (options.padding * 2), options.lineThickness);
    };
    
    var drawMarker = function(ctx) {
      ctx.fillStyle = options.markerColor;
      ctx.fillRect(marker, options.padding, options.lineThickness * 2, options.height - options.padding);
    };
    
    var drawRange = function(ctx) {
      ctx.fillStyle = options.rangeColor;
      ctx.fillRect(normalizeX(min), rangeThickness() / 2, normalizeX(max - min), rangeThickness());
    };
    
    this.each(function() {
      ctx = getContext(this);
      
      if (options.drawEdges) {
        drawEdges(ctx);
      }
      drawBar(ctx);
      drawRange(ctx);
      drawMarker(ctx);
    });
  };
}(jQuery));

jQuery(function($) {
  $('.graph').bulletGraph(25, 75, 50);
  $('.hugeGraph').bulletGraph(100, 300, 200, {width: 400, height: 100});
  $('.neater').bulletGraph(150, 375, 350, {width: 400, drawEdges: false});
  $('.posh').each(function() {
    var el = $(this);
    el.bulletGraph(el.children('.graph-low').text(),
                   el.children('.graph-high').text(),
                   el.children('.graph-marker').text(),
                   {width: el.children('.graph-max').text()});
    el.children().empty('span');
  });
});
