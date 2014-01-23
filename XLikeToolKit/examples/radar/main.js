require.config({
　paths: {
    "jquery": "../../libs/jquery-1.8.2.min",
    "jquery-ui": "../../libs/jquery-ui-1.9.2.min",
    "d3": "../../libs/d3.v3.min",
    "json": "../../libs/json2",
    "underscore": "../../libs/underscore-1.5.2.min",
    "RadarChart": "../../libs/RadarChart",
    "toolkit": "../../build/jquery.xlike-toolkit.min"
  }
});

/**
* Radar module
*/
require(["jquery", "jquery-ui", "d3", "json", "underscore", "RadarChart","toolkit"], 
  function() {
	var radarOptions= {
			config: {
			w: 300,
			h: 300,
			maxValue: 0.6,
			levels: 6,
			ExtraWidthX: 300
		},
		legend: {
			colorscale: d3.scale.category10(),
			LegendOptions: ['Smartphone','Tablet','Book'],
			left: 90,
			top: 20,
			fontsize: "11px",
			color: "#737373"
		},
		title: {
			title: 'What % of owners use a specific service in a week',
			left: 50,
			top: 0,
			fontsize: "12px",
			color: "#404040"
		},
		data: [
				{axis:"Email",value:[0.59,0.48,0.55]},
				{axis:"Social Networks",value:[0.56,0.41,0.49]},
				{axis:"Internet Banking",value:[0.42,0.27,0.77]},
				{axis:"News Sportsites",value:[0.34,0.28,0.99]},
				{axis:"Search Engine",value:[0.48,0.46,0.30]},
				{axis:"View Shopping sites",value:[0.14,0.29,0.20]},
				{axis:"Paying Online",value:[0.1,0.11,0.10]},
			]
		,
		container: 'radarchart'
	}

	//drawRadarChart(radarOptions);
    $("#radarchart").radar(radarOptions);
  }
);