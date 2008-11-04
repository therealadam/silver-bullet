/**
 * The Silver Bullet - jQuery plugin for drawing bullet graphs
 *
 * http://github.com/therealadam/silver_bullet
 *
 * Copyright (c) 2008 Adam Keys (therealadam.com)
 * MIT licensed
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @requires jQuery 1.2.6
 * @author Adam Keys
 * @version 0.5.0
 */

(function($) {
  
  /**
   * Helper function for getting a canvas, regardless of browser.
   *
   * @example $(el).canvas(320, 200);
   *
   * @param Integer width The width of the created canvas
   * @param Integer height The height of the created canvas
   * @name $.canvas()
   * @cat Plugins/User Interface
   */
  $.fn.canvas = function(width, height) {
    var canvas = $('<canvas width="' + width + '" height="' + height + '"></canvas>').appendTo(this).get(0);
    
    if ($.browser.msie) {
      canvas = window.G_vmlCanvasManager.initElement(canvas);
    }
    
    return canvas.getContext("2d");
  };
  
  /**
   * Draw a bullet graph.
   *
   * @example $(el).bulletGraph(30, 80, 75)
   *
   * @param Integer min The minimum value of the highlighted range.
   * @param Integer max The maximum value of the highlighted range.
   * @param Integer marker The center value that is highlighted.
   * @param Object options An object literal containing key/value pairs to provide optional settings.
   * @option String baseColor The color to draw the background lines. Default: #444.
   * @option String markerColor The color to draw the center marker with. Default: #c11.
   * @option String rangerColor The color to draw the highlighted range with. Default: #aaa.
   * @option Integer markerWidth The width of the center marker (in pixels). Default: 3.
   * @option Integer width The width of the graph (in pixels). Default: 100.
   * @option Integer height The height of the graph (in pixels). Default: 30.
   * @option Integer padding Buffer between the outside of the canvas and the graph (in pixels). Default: 2.
   * @option Float lineThickness The width of the horizontal line on the graph (in pixels). Default: 2.5.
   * @option Boolean drawEdges Whether to show the vertical bars on the left and right sides of the graph. Default: true.
   */
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
    
    return this;
  };
}(jQuery));
