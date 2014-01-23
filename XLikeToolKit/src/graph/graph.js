/**
* Graph plugin for jQuery
* @class Graph
*/
var nodesArray = [];
(function ($) {

  /**
   * Default options for this plugin
   */
  var defaults = {

  };
  
   /**
  * Plugin main function.
  * @method graph
  * @param options {Object} setting parameters in an object.
  * @return {Object} jQuery object
  */
  $.fn.graph = function (options) {
    var opts = $.extend({}, defaults, options || {});
    return this.each(function() {
      var $this = $(this);

      drawGraphChart(opts);
    });
  };
  
  function onReady(node,callback){
	if(!callback){return false;}
		if (navigator.userAgent.toLowerCase().indexOf('msie')>-1){
			node.onreadystatechange = function(){
				if(this.readyState === 'complete' || this.readyState === 'loaded'){
					callback();
				}
			};
		} else {
			node.onload = function(){callback();};
		}
	}
	function insertCSS(link){
		var nodeHide;
		if (navigator.userAgent.toLowerCase().indexOf('msie')>-1){
			nodeHide = document.createElement('script');
			nodeHide.type = 'text/css_js';
		}else{
			nodeHide = document.createElement('iframe');
			nodeHide.style.display = 'none';
		}
		nodeHide.src = link + '?=a' + Math.random();
		document.getElementsByTagName('body')[0].appendChild(nodeHide);
		onReady(nodeHide,function(){
			var node = document.createElement("link");
				node.href = link;
				node.type = "text/css";
				node.rel = "stylesheet";
				document.getElementsByTagName('head')[0].appendChild(node);
		});
	}

  
  function drawGraphChart(graphOptions){
	insertCSS("../../libs/graph/css/jquery-ui.css");
    insertCSS("../../libs/graph/css/bootstrap.css");
  
	var maphtml = "<div class='div4' id='"+ graphOptions.graph.container +"'></div>";
	var optionshtml = "<div id='"+ graphOptions.settings.container +"' class='form-horizontal'>"+ 
						"<div class='control-group' id='program'>" + 
						"<label id='programlabel' class='control-label' for='username'><Strong>" + graphOptions.settings.layout + ":</Strong></label>" + 
						"<div class='controls' id='programdiv'>" + 
						"<select id='rule' style='width: 98%;'>" + 
						"<option value='null'>--select--</option>" + 
						"<option value='a'>default</option>" + 
						"<option value='b'>tight</option>" + 
						"<option value='c'>normal</option>" + 
						"<option value='d'>simple</option>" + 
						"</select>" + 
						"</div>" + 
						"</div>" +  
						"<div class='control-group' id='program'>" + 
						"<label class='control-label' for='username' id='programlabel'><Strong>"+  graphOptions.settings.eflabel +":</Strong></label>" + 
						"<div class='controls' id='programdiv'><div id='slider1'></div><div id='slider1Info'></div></div>" + 
						"</div>" + 
						"<div class='control-group' id='program'>" + 
						"<label class='control-label' for='username' id='programlabel'><Strong>"+ graphOptions.settings.rflabel + ":</Strong></label>" + 
						"<div class='controls' id='programdiv'><div id='slider2'></div><div id='slider2Info'></div></div>" + 
						"</div>" + 
						"<div class='control-group' id='program'>" + 
						"<label class='control-label' for='username' id='programlabel'><Strong>"+  graphOptions.settings.wslabel +":</Strong></label>" + 
						"<div class='controls' id='programdiv'><div id='slider3'></div></div>" + 
						"</div>" + 
						"<div class='control-group' id='program'>" + 
						"<label class='control-label' for='username' id='programlabel'><Strong>"+ graphOptions.settings.lclabe +":</Strong></label>" + 
						"<div class='controls' id='programdiv'><div id='topiclist' style='width: 300px'></div></div>" + 
						"</div>" + 
						"</div>"
						;
	var graphhtml = maphtml + optionshtml;
	var div = "#" + graphOptions.container;
	$(div).html(graphhtml);

	var options = "#" + graphOptions.settings.container; 
	
	$(options)
		.css("width",graphOptions.settings.sw)
		.css("height",graphOptions.settings.sh)
		.css("float","left")
		.css("margin-left","1em");
		
	var maps = "#" + graphOptions.graph.container;
	$(maps)
		.css("margin-left","1%")
		.css("width","50%")
		.css("border","1px dashed")
		.css("display","inline-block")
		.css("FILTER","alpha(opacity=0)")
		.css("background-color","white")
		.css("float","left");
	
	var graphdiv = "#" + graphOptions.container;
	$(graphdiv)
		.css("width","90%")
		.css("margin-top","1em");
		
	var graph = getEERelationData(graphOptions.graph.data);
	//var graphtojson = eval("(" + graph + ")");
	var graphtojson = JSON.parse(graph);
	
	vis(graphtojson, graphOptions);
  }

  function pageInit() {
	drawGraphChart(graphOptions);
  }

  function getEERelationData(data){
	var html = "";
	
	var conceptsList = data.concepts;
	var linksList = data.links;
	
	function nodes(name, type, id ,uri) {
        this.name = name;
        this.type = type;
        this.id = id;
		this.uri = uri;
    }
	
	function links(source, target, value) {
        this.source = source;
        this.target = target;
        this.value = value;
    }
	
	for(var i in conceptsList){
		var name = conceptsList[i].label;
		var type = getEntityType(conceptsList[i].type);
		var id = conceptsList[i].id;
		var uri = conceptsList[i].uri;
		
		nodesArray.push(new nodes(name,type,id,uri));
	}
	
	var linksArray = [];
	for(var li in linksList){
		var sourceid = linksList[li].id1;
		var targetid = linksList[li].id2;
		
		var sourceindex = getEntityIndex(nodesArray,sourceid);
		var targetindex = getEntityIndex(nodesArray,targetid);
		var score = linksList[li].score;
		
		linksArray.push(new links(sourceindex,targetindex,score));
	}
	
    html += '{"nodes":[';
    //On nodesArray traverse, and add it to html string
    for(var ni = 0;ni < nodesArray.length;ni ++){
        if (ni !== 0) {
            html += ',';
        }
        html += '{"name":"';
        html += nodesArray[ni].name;
        html += '","type":"';
        html += nodesArray[ni].type;
        html += '"}';
    }
    
    html += '],"links":[';
    //On linksArray traverse, and add it to html string	
    for (var lsi = 0; lsi < linksArray.length; lsi++) {
        if (lsi !== 0) {
            html += ',';
        }
        html += '{"source":';
        html += (linksArray[lsi].source);
        html += ',"target":';
        html += (linksArray[lsi].target);
        html += ',"value":';
        html += linksArray[lsi].value;
        html += '}';

    }
    html += ']}';
	
	return html;
  }

  function getEntityIndex(nodesArray,eid){
	var index = 0;
	for(var i in nodesArray){
		if((nodesArray[i].id - eid) === 0){
			index = i;
			break;
		}
	}
	return index;
  }

  function getEntityType(labelname){
	var type = "";
	if(labelname.search("org") !== -1){
		type = "org";
	}else if(labelname.search("loc") !== -1){
		type = "loc";
	}else if(labelname.search("per") !== -1){
		type = "per";
	}
	
	return type;
  }

  var weiArg = 0,
	disArg1 = 1,
	//disArg2 = 10,
	disArg2 = 10,
	//sizeArgT = 4,
	sizeArgT = 1,
	//sizeArgE = 4,
	sizeArgE = 1,
	sizeArg = 3,
	relaArg = 0,
	maxrelaArg = 100,
	minrelaArg = 0;
var nullnode = JSON.parse('{"id":"n999999","name":"null","type":"null","x":null,"y":null}');
var nullnode2 = JSON.parse('{"id":"n888888","name":"null","type":"null","x":null,"y":null}');

var force;
var w = 0,
	h = 0;	

var nh0 = 9,
	nw0 = 5;
var nh = nh0 * sizeArg,
	nw = nw0 * sizeArg;
var tw = 12;

var max = 0,
	min = 5;
var log = d3.scale.log();
var node, link, svg, nodeRects, nodeTexts;
var nodedatas, nodedatas0, linkdatas, linkdatas0;
var color = d3.scale.category10();
var fill = [];
	
var tempnodes, templinks;
	
function HashMap() {
    var size = 0;
    var entry = {};

    this.put = function(key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    };

    this.get = function(key) {
        if (this.containsKey(key)) {
            return entry[key];
        } else {
            return null;
        }
    };

    this.remove = function(key) {
        if (delete entry[key]) {
            size--;
        }
    };

    this.containsKey = function(key) {
        return (key in entry);
    };

    this.containsValue = function(value) {
        for (var prop in entry) {
            if (entry[prop] === value) {
                return true;
            }
        }
        return false;
    };

    this.values = function() {
        var values = new Array(size);
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    };

    this.keys = function() {
        var keys = new Array(size);
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    };

    this.size = function() {
        return size;
    };
}	

var map = new HashMap();

function setweight(arg) {
	weiArg = arg / 4;
	refresh();
}	

function setdistance1(arg) {
	disArg1 = arg;
	disrefresh();
}
	
function setdistance2(arg) {
	disArg2 = arg;
	disrefresh();
}
	
function setsize(arg) {
	sizeArg = arg;
	sizerefresh();
}
	
function setrelation(arg) {
	relaArg = arg;
	refresh();	
}	
	
function initNodes() {
    nodeRects.attr("x",function(d) {
        return d.name.length > 3 ? -(nw + (d.name.substring(0, 8).length - 3) * tw) / 2 : -nw / 2;
    }).attr("y",function(d) {
        return nh / 2.5 / -2;
    }).attr("width",function(d) {
		var wthlen = 0;
		if(d.name.length <= 3){
			wthlen = nw * 3;
		}else if(d.name.length > 3 && d.name.length < 9){
			wthlen = nw + (d.name.substring(0, 8).length) * tw;
		}else {
			wthlen = nw + (d.name.substring(0, 8).length - 3) * tw;
		}
		return wthlen;
    }).attr("height",function(d) {
        return nh / 2.5;
    }).attr("rx",function(d) {
        return 8;
    }).attr("ry",function(d) {
        return 8;
    }).style("fill",function(d) {
        return fill[d.type];
    }).style("stroke",function(d) {
        return fill[d.type];
    }).style("fill-opacity", "0.9");

    nodeTexts.attr("dy", ".3em").attr("dx",function(d){
		return d.name.length > 4 ? "null" : "1.3em";
	}).style("text-anchor", "middle").style("fill",
    function(d) {
        return "#666";
    }).style("font", "12px arial").text(function(d) {
        return d.name.length > 8 ? d.name.substring(0, 8) + "...": d.name;
    });
}
	
function sizerefresh() {
	nh = nh0 * sizeArg;
	nw = nw0 * sizeArg;
	initNodes();
}

function disrefresh() {
    var max = 0,
    max2 = 0;
    for (var i in linkdatas) {
        max = max > cdis(linkdatas[i].value) ? max: cdis(linkdatas[i].value);
    }
    refresh();
    force.linkDistance(function(d) {
        max2 = max2 > ((cdis(d.value) / max) * (w / 2)) ? max2: ((cdis(d.value) / max) * (w / 2));
        return ((cdis(d.value) / max) * (w / 2));
    });
}

function setArgs(wei, rela, size, dis2, dis) {
	sizeArg = size;
	sizerefresh();
	disArg1 = dis;
	disArg2 = dis2;
	disrefresh();
	weiArg = wei;
	refresh();
	//relaArg = rela/1000;
	relaArg = rela;
	refresh();
}
	
function UI() {
    $("#rule").change(function() {
        if ($(this).val() === "a") {
            setArgs(0, 0, 4, 10, 1);
            $("#slider1").slider("value", 1);
			$("#slider2").slider("value", minrelaArg);
			$("#slider3").slider("value", 1);
        } else if ($(this).val() === "b") {
            setArgs(1, 0, 2, 0.1, 2);
            $("#slider1").slider("value", 1);
			$("#slider2").slider("value", maxrelaArg / 12);
			$("#slider3").slider("value", 2);
        } else if ($(this).val() === "c") {
            setArgs(1, 0, 3, 10, 1);
            $("#slider1").slider("value", 1);
			$("#slider2").slider("value", maxrelaArg / 10);
			$("#slider3").slider("value", 1);
        } else if ($(this).val() === "d") {
            setArgs(2, 120, 3, 10, 1);
            $("#slider1").slider("value", 6);
            $("#slider2").slider("value", maxrelaArg / 9);
			$("#slider3").slider("value", 20);
        }
    });
    $("#slider1").slider({
        range: "max",
        min: 0,
        max: 10,
        value: weiArg,
        slide: function(event, ui) {
            setweight(ui.value);
           //$("#slider1Info").val("weights: >" + ui.value);
        }
    });
    $("#slider1Info").val("weights: >" + $("#slider1").slider("value"));
    $("#slider2").slider({
        range: "max",
        //min: 0,
        //max: 100,
		max: maxrelaArg / 3,
		min: minrelaArg,
        value: relaArg,
        slide: function(event, ui) {
            setrelation(ui.value);
            //$("#slider2Info").val("relation: >" + ui.value);
			//$("#slider2Info").innerText = ui.value;
        }
    });
    $("#slider2Info").val("relation: >" + $("#slider2").slider("value"));
	$("#slider3").slider({
        range: "max",
        min: 0,
        //max: 2600,
		max: 4,
        value: disArg1,
        slide: function(event, ui) {
            setdistance1(ui.value);
            //$("#slider3Info").val("weight setting: >" + ui.value);
        }
    });
    $("#slider3Info").val("weight setting: >" + $("#slider3").slider("value"));
}

function cdis(dis) {
    var diss = min - disArg1 * log(dis) / log(disArg2);
    return diss;
}

function cx(dx, visible) {
    if (visible === 0) {
        return - 100;
    }
    dx = dx < nw / 2 ? nw - dx: dx;
    dx = dx > w - nw / 2 ? w * 2 - dx - nw: dx;
    return dx;
}

function cy(dy, visible) {
    if (visible === 0) {
        return - 100;
    }
    dy = dy < nh / 2 ? nh - dy / 2 : dy;
    dy = dy > h - nh / 2 ? h * 2 - dy - nh: dy;
    return dy;
}

function initLinks() {
    link.style("stroke-width",function(d) {
        return 5 / cdis(d.value);
    }).style("stroke",function(l) {
        return "";
    }).style("stroke-opacity",function(l) {
        if (l.source.weight > weiArg && l.target.weight > weiArg) {
            return 0.9;
        } else {
            return 0;
		}
    });
}

function refresh() {
	//alert("linkdatas.length : "+linkdatas.length);
	linkdatas.forEach(function(d, i) {
		//alert("d.value : " + d.value + " relaArg : " + relaArg);
		if (d.value < relaArg) {
			if (d.source !== nullnode && d.target !== nullnode) {
				d.source = nullnode2;
				d.target = nullnode2;
			}
		} else {
			if (d.source === nullnode2 && d.source !== nullnode && d.target !== nullnode) {
				linkdatas[i] = clone(linkdatas0[i]);
			}
		}
	});
		
    var cklist = $("#topiclist :checkbox");
    force.nodes(nodedatas).links(linkdatas).start();
    svg.selectAll("line.link").data(linkdatas).enter();
	
	initLinks();
    nodedatas.forEach(function(d) {
		//alert(d.weight + " : " + weiArg);
        d.visible = d.weight > weiArg ? 1 : 0;
    });
	
    force.on("tick",function() {
        link.attr("x1",function(d) {
            return cx(d.source.x, d.source.visible);
        }).attr("y1",function(d) {
            return cy(d.source.y, d.source.visible);
        }).attr("x2",function(d) {
            return cx(d.target.x, d.target.visible);
        }).attr("y2",function(d) {
            return cy(d.target.y, d.target.visible);
        });

        node.attr("transform",function(d) {
            return "translate(" + cx(d.x, d.visible) + "," + cy(d.y, d.visible) + ")";
        });
    });
}
	
function checkBoxUI() {
	var cklist = $("#topiclist :checkbox");
	$("#topiclist :checkbox").click(function() {
        var ck = this.checked;
        var id = $(this).attr("id");

        if (ck) {
            addTopic(id);
        }else {
			removeTopic(id);
		}
		
        refresh();
    });
}

function addTopic(id) {
	if(!map.containsKey(id)){
		map.put(id,id);
	}
	
	linkdatas0 = clone(templinks);
	nodedatas0 = clone(tempnodes);

	linkdatas0.forEach(function(d, i) {
		if (nodedatas0[d.source].type === id && nodedatas0[d.target].type === id) {
			linkdatas[i] = clone(linkdatas0[i]);
		} else if (nodedatas0[d.source].type === id && nodedatas0[d.target].type !== id) {
			if (!map.containsKey(nodedatas0[d.target].type)) {
				linkdatas0[i].target = linkdatas0[i].source;
			}
			linkdatas[i] = clone(linkdatas0[i]);
		} else if (nodedatas0[d.source].type !== id && nodedatas0[d.target].type === id) {
			if (!map.containsKey(nodedatas0[d.source].type)) {
				linkdatas0[i].source = linkdatas0[i].target;
			}
			linkdatas[i] = clone(linkdatas0[i]);
		} else {
			if (map.containsKey(nodedatas0[d.source].type) && map.containsKey(nodedatas0[d.target].type)) {
				linkdatas[i] = clone(linkdatas0[i]);
			} else if (map.containsKey(nodedatas0[d.source].type) && !map.containsKey(nodedatas0[d.target].type)) {
				linkdatas0[i].target = linkdatas0[i].source;
				linkdatas[i] = clone(linkdatas0[i]);
			} else if (!map.containsKey(nodedatas0[d.source].type) && map.containsKey(nodedatas0[d.target].type)) {
				linkdatas0[i].source = linkdatas0[i].target;
				linkdatas[i] = clone(linkdatas0[i]);
			}
		}
	});
    
	//refresh();
}

function removeTopic(id) {
	if(map.containsKey(id)){
		map.remove(id);
	}
	
    linkdatas.forEach(function(d, i) {
		if(map.containsKey(d.source.type)){
			if(!map.containsKey(d.target.type)){
				d.target = d.source;
			}else {
				d.source = d.source;
				d.target = d.target;
			}
		}else {
			if(map.containsKey(d.target.type)){
				d.source = d.target;
			}else {
				d.source = nullnode;
				d.target = nullnode;
			}
		}
    });
	//refresh();
}

function addCheckBox(name, id, color) {
	if(!map.containsKey(id)){
		map.put(id,id);
	}
	
    $("#topiclist").append('<div id="topiclist'+id+'" style="margin-bottom: 6px;"><input type="checkbox" id="' + id + '" clase="topicset" checked="true" />' + '<input type="button" style="background: ' + color + ';width: 60px; border: 0px;margin-left: 5px;"><span style="vertical-align: middle;margin-left: 5px;">' + name + '</span></div>');
}

function clone(jsonObj) {
    var buf;
    if (jsonObj instanceof Array) {
        buf = [];
        var i = jsonObj.length;
        while (i--) {
            buf[i] = clone(jsonObj[i]);
        }
        return buf;
    } else if (jsonObj instanceof Object) {
        buf = {};
        for (var k in jsonObj) {
            buf[k] = clone(jsonObj[k]);
        }
        return buf;
    } else {
        return jsonObj;
    }
}
	
function vis(json,graphOptions) {
    w = graphOptions.graph.gw;
	h = graphOptions.graph.gh;
	/*
	fill["loc"] = "#55cccc";
	fill["org"] = "#cc99cc";
	fill["per"] = "#cccc55";
	
	fill["loc"] = graphOptions.color(0);
	fill["org"] = graphOptions.color(1);
	fill["per"] = graphOptions.color(3);
	*/
	if(typeof graphOptions.color === 'undefined'){
		var optionsColor = d3.scale.category20();
		fill.loc = optionsColor(0);
		fill.org = optionsColor(1);
		fill.per = optionsColor(2);
		fill.topic = optionsColor(3);
	}else {
		fill.topic = graphOptions.color[0];
		fill.loc = graphOptions.color[1];
		fill.org = graphOptions.color[2];
		fill.per = graphOptions.color[3];
	}
	
	var nodesdata = json.nodes;
	var linksdata = json.links;
	
	tempnodes = clone(nodesdata);
	templinks = clone(linksdata);
	
	maxrelaArg = _.max(_.pluck(json.links, 'value'));
	minrelaArg = _.min(_.pluck(json.links, 'value'));
	
	UI();
	
	initDatas(true);
	
	function initDatas(vis) {
		var linear = d3.scale.linear();
		linear.domain([0, 0.00005, 0.0001, 0.005, 0.1, 0.6, 1]);
		linear.range([0, 0.001, 0.3, 0.4, 0.5, 0.9, 1]);
		for (var i in linksdata) {
			linksdata[i].value = linear(linksdata[i].value);
		}
		for (var ii in nodesdata) {
			nodesdata[ii].id = ii;
		}
		nodedatas = clone(nodesdata);
		linkdatas = clone(linksdata);
		//linkdatas = nullinks;
		nodedatas0 = clone(nodesdata);
		linkdatas0 = clone(linksdata);

		if (vis) {
			initVis();
		}
	}
	
	function initVis() {
		for ( var i in linkdatas) {
			max = max > cdis(linkdatas[i].value) ? max : cdis(linkdatas[i].value);
		}
		force = d3.layout.force().charge(-300).friction(0.9).linkDistance(function(d) {
			return (cdis(d.value) / max) * (w / 3);
		}).linkStrength(0.5).size([ w, h ]);

		force.nodes(nodedatas).links(linkdatas).start();

		var mapdiv = "#" + graphOptions.graph.container;
		
		svg = d3.select(mapdiv).append("svg").attr("width", w).attr("height", h);
		link = svg.selectAll("line.link").data(linkdatas).enter().append("line");
		node = svg.selectAll(".node").data(nodedatas).enter().append("g");

		addCheckBox("person", "per",fill.per);
		addCheckBox("localtion", "loc",fill.loc);
		addCheckBox("organization", "org",fill.org);

		checkBoxUI();

		link.attr("class", "link").attr("id", function(d) {
			return "l-" + d.source.type + ":" + d.source.id + "-" + d.target.type + ":" + d.target.id;
		});
		
		node.attr("id", function(d) {
			if(d.type === "loc"){
				return "loc" + d.id;
			}else if(d.type === "per"){
				return "per" + d.id;
			}else if(d.type === "org"){
				return "org" + d.id;
			}
			//return "n" + d.id;
		}).attr("class", "node").call(force.drag);

		nodeRects = node.append("rect");
		nodeTexts = node.append("text");

		initLinks();
		initNodes();

		var graphdiv = "#" + graphOptions.container;
		
		node.on("mouseover", function(d, i) {
			$(graphdiv).attr("title",nodesArray[i].uri);
			//d3.select(this).select("rect").style("fill", "orangered").style("stroke", "black");
			d3.select(this).select("rect").style("fill","#FF99CC");
			d3.select(this).select("text").style("fill", "#000000");
			link.style("stroke", function(l) {
				if (l.source === d) {
					d3.select("#n" + l.target.id + " rect").style("stroke", "orangered").style("fill-opacity", "0.6")
							.attr("rx", 0).attr("ry", 0);
					d3.select("#n" + l.target.id + " text").style("fill", "black");
					return "red";
				} else if (l.target === d) {
					d3.select("#n" + l.source.id + " rect").style("stroke", "orangered").style("fill-opacity", "0.6")
							.attr("rx", 0).attr("ry", 0);
					d3.select("#n" + l.source.id + " text").style("fill", "black");
					return "red";
				}
			});
		});
		
		node.on("mouseout", function() {
			initLinks();
			initNodes();
		});
		/*
		nodedatas.forEach(function(d) {
			d.visible = d.weight > weiArg ? 1 : 0;
		});
		*/
		force.on("tick", function() {
			link.attr("x1", function(d) {
				return cx(d.source.x, 1);
			}).attr("y1", function(d) {
				return cy(d.source.y, 1);
			}).attr("x2", function(d) {
				return cx(d.target.x, 1);
			}).attr("y2", function(d) {
				return cy(d.target.y, 1);
			});

			node.attr("transform", function(d) {
				return "translate(" + cx(d.x, d.visible) + "," + cy(d.y, d.visible) + ")";
			});
		});
	}
}  
})(jQuery);
