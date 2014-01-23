/**
* Stream plugin for jQuery
* @class Stream
*/
(function ($) {

  /**
   * Default options for this plugin
   */
  var defaults = {

  };
  
   /**
  * Plugin main function.
  * @method stream
  * @param options {Object} setting parameters in an object.
  * @return {Object} jQuery object
  */
  $.fn.stream = function (options) {
    var opts = $.extend({}, defaults, options || {});
    return this.each(function() {
      var $this = $(this);

      drawStreamChart(opts);
    });
  };
  
   function drawStreamChart(streamOptions) {
  var datearray = [];
  var colorrange = streamOptions.color;
  var strokecolor = streamOptions.color[0];
  var format = d3.time.format("%m/%d/%y");
  var margin = streamOptions.margin;
  var width = streamOptions.width;
  var height = streamOptions.height;
  var diffdays = 0;
  var tooltip = d3.select("body")
    .append("div")
    .attr("class", "remove")
    .style("position", "absolute")
    .style("z-index", "20")
    .style("visibility", "hidden")
    .style("top", "30px")
    .style("left", "55px");

  var x = d3.time.scale()
    .range([0, width]);

  var y = d3.scale.linear()
    .range([height-10, 0]);
  var z = d3.scale.ordinal()
    .range(colorrange);

  var stack = d3.layout.stack()
    .offset("silhouette")
    .values(function(d) { return d.values; })
    .x(function(d) { return d.date; })
    .y(function(d) { return d.value; });

  var nest = d3.nest()
    .key(function(d) { return d.key; });

  var area = d3.svg.area()
    .interpolate("cardinal")
    .x(function(d) { return x(d.date); })
    .y0(function(d) { return y(d.y0); })
    .y1(function(d) { return y(d.y0 + d.y); });

  var div = "." + streamOptions.container;
		
  var svg = d3.select(div).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var streamdata = streamOptions.data;
		
  var graph = streamdata.forEach(function(d) {
    d.date = format.parse(d.date);
    d.keyword = d.value.split(":")[0];
    d.entity = d.value.split(":")[1];
    d.value = +d.value.split(":")[2];
  });
  
  var layers = stack(nest.entries(streamdata));
  diffdays = (_.max(_.pluck(layers[0].values, 'date')) - _.min(_.pluck(layers[0].values, 'date'))) /1000/60/60/24;
  
  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(d3.time.format('%Y-%m-%d'))
    .tickSize(5)
    .tickPadding(8);
	
	if(diffdays / 7 <= 4){
		xAxis.ticks(d3.time.days);
	}else if(diffdays / 7 > 4 && diffdays / 7 <= 28){
		xAxis.ticks(d3.time.weeks);
	}else if(diffdays / 28 > 4 && diffdays / 28 <= 28){
		xAxis.ticks(d3.time.months);
	}else if(diffdays / 196 > 4 && diffdays / 196 <= 28){
		xAxis.ticks(d3.time.years);
	}

  var yAxis = d3.svg.axis()
    .scale(y);

  var yAxisr = d3.svg.axis()
    .scale(y);
  
  x.domain(d3.extent(streamdata, function(d) { return d.date;}));
  y.domain([0, d3.max(streamdata, function(d) { return d.y0 + d.y; })]);
  
  svg.selectAll(".layer")
      .data(layers)
    .enter().append("path")
      .attr("class", "layer")
      .attr("d", function(d) { return area(d.values); })
      .style("fill", function(d, i) { return z(i); });


  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
 
  svg.selectAll("g")
      .select("text")
      .attr("transform", "rotate(-25)")
      .attr("x","-25");	

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ", 0)")
      .call(yAxis.orient("right"));

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis.orient("left"));

  svg.selectAll(".layer")
    .attr("opacity", 1)
    .on("mouseover", function(d, i) {
      svg.selectAll(".layer")
      .transition()
      .duration(450)
      .attr("opacity", function(d, j) {
        return j !== i ? 0.6 : 1;
      });
	})
	.on("mousemove", function(d, i) {
      mousex = d3.mouse(this);
      mousex = mousex[0];
      var invertedx = x.invert(mousex);
      var year = invertedx.getFullYear();
      var month = invertedx.getMonth()+1;
      var date = invertedx.getDate(); 
      if(month<10){
         month = "0" + month;
      }
      if(date<10){
         date = "0" + date;
      }
      var curdate = year + "-" + month + "-" + date;
      invertedx = invertedx.getMonth() + invertedx.getDate();
      var selected = (d.values);
      for (var k = 0; k < selected.length; k++) {
        datearray[k] = selected[k].date;
        datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
      }

      mousedate = datearray.indexOf(invertedx);
      pro = d.values[mousedate].value;
      keyword = d.values[mousedate].keyword;
      entity = d.values[mousedate].entity;

      d3.select(this)
      .classed("hover", true)
      .attr("stroke", strokecolor)
      .attr("stroke-width", "0.5px"); 
      tooltip.html("<p><Strong><Span style='font-size:14px;'>Topic : </span></Strong>" + d.key + 
					"<br><Strong><Span style='font-size:14px;'>CurDate :</span> </Strong>" + curdate + 
					"<br><Strong><Span style='font-size:14px;'>Keyword :</span> </Strong>" + keyword + 
					"<br><Strong><Span style='font-size:14px;'>Entity : </span></Strong>" + entity + 
					"<br><Strong><Span style='font-size:14px;'>Similarity : </span></Strong>" + pro + "</p>")
      .style("visibility", "visible");
     })
    .on("mouseout", function(d, i) {
	/*
     svg.selectAll(".layer")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      d3.select(this)
      .classed("hover", false)
      .attr("stroke-width", "0px"), tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" ).style("visibility", "hidden");
      */
  });
    
  var vertical = d3.select(div)
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "1px")
        .style("height", "380px")
        .style("top", "10px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "#fff");

  d3.select(div)
      .on("mousemove", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px" );})
      .on("mouseover", function(){  
         mousex = d3.mouse(this);
         mousex = mousex[0] + 5;
         vertical.style("left", mousex + "px");});
 }
})(jQuery);
