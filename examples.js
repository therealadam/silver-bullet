jQuery(function($) {
  
  $('.graph').bulletGraph(25, 75, 50, {height: 36});
  $('.hugeGraph').bulletGraph(100, 300, 200, {width: 400, height: 108});
  $('.neater').bulletGraph(150, 375, 350, {width: 360, drawEdges: false});
  $('.posh').each(function() {
    var el = $(this);
    el.bulletGraph(el.children('.graph-low').text(),
                   el.children('.graph-high').text(),
                   el.children('.graph-marker').text(),
                   {width: el.children('.graph-max').text()}, {height: 36});
    el.children().empty('span');
  });
  $('.sparkline').each(function() {
    var el = $(this);
    el.bulletGraph(el.children('.graph-low').text(),
                   el.children('.graph-high').text(),
                   el.children('.graph-marker').text(),
                   {width: el.children('.graph-max').text(), height: 10});
    el.children().empty();
  });
  
});
