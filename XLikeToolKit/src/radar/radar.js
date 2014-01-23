/**
* Radar plugin for jQuery
* @class Radar
*/
(function ($) {

  /**
   * Default options for this plugin
   */
  var defaults = {

  };
   /**
  * Plugin main function.
  * @method radar
  * @param options {Object} setting parameters in an object.
  * @return {Object} jQuery object
  */
  $.fn.radar = function (options) {
    var opts = $.extend({}, defaults, options || {});
    return this.each(function() {
      var $this = $(this);
      //alert($this.attr("id"));
      drawRadarChart(opts);
    });
  };
  
  function drawRadarChart(radaroptions){
	var divid = radaroptions.container;
	if(radaroptions.container.indexOf("#") === -1){
		divid = "#" + divid;
	}
	RadarChart.draw(divid, radaroptions.data, radaroptions.config);
	
	var svg = d3.select(divid)
		.selectAll('svg')
		.append('svg')
		.attr("width", radaroptions.config.w+300)
		.attr("height", radaroptions.config.h);

	//Create the title for the legend
	var text = svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(' + radaroptions.title.left +','+ radaroptions.title.top +')') 
		.attr("x", radaroptions.config.w - 70)
		.attr("y", 10)
		.attr("font-size", radaroptions.title.fontsize)
		.attr("fill", radaroptions.title.color)
		.text(radaroptions.title.title);
			
	//Initiate Legend	
	var legend = svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(' + radaroptions.legend.left +',' + radaroptions.legend.top +')') ;
	//Create colour squares
	legend.selectAll('rect')
		.data(radaroptions.legend.LegendOptions)
		.enter()
		.append("rect")
		.attr("x", radaroptions.config.w - 65)
		.attr("y", function(d, i){ return i * 20;})
		.attr("width", 10)
		.attr("height", 10)
		.style("fill", function(d, i){ return radaroptions.legend.colorscale(i);});
	//Create text next to squares
	legend.selectAll('text')
		.data(radaroptions.legend.LegendOptions)
		.enter()
		.append("text")
		.attr("x", radaroptions.config.w - 52)
		.attr("y", function(d, i){ return i * 20 + 9;})
		.attr("font-size", radaroptions.legend.fontsize)
		.attr("fill", radaroptions.legend.color)
		.text(function(d) { return d; });	
  }
})(jQuery);
