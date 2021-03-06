/**
* EntityGraph plugin for jQuery
* @class EntityGraph
*/
var nodesArray = [];
var allJsonData = [];

(function ($) {

  /**
   * Default options for this plugin
   */
  var defaults = {

  };
  
   /**
  * Plugin main function.
  * @method EntityGraph
  * @param options {Object} setting parameters in an object.
  * @return {Object} jQuery object
  */
  $.fn.entitygraph = function (options) {
    var opts = $.extend({}, defaults, options || {});
    return this.each(function() {
      var $this = $(this);

      drawEntityGraphChart(opts);
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
  
  function drawEntityGraphChart(EGOptions){	
    insertCSS("../../libs/entitygraph/css/jquery-ui.css");
    insertCSS("../../libs/entitygraph/css/classify.css");
	allJsonData.push(seg1);
	var graphtojson = getResultGraphData();
		
	var maphtml = "<div class='div4' id='map'></div>";
	var optionshtml = "<div id='options' class='form-horizontal'>" + 
						"<div class='control-group' id='program'>" + 
						"<label id='programlabel' class='control-label' for='username' style='float: left;'>layout:</label>" + 
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
						"<label class='control-label' for='username' id='programlabel' style='float: left;'>Relation Filter:</label>" + 
						"<div class='controls' id='programdiv'><div id='slider2'></div></div>" + 
						"</div>" + 
						"</div>";
	var div = "#graph";
	$(div).html(maphtml + optionshtml);
	
	$("#map")
		.css("left","-2%")
		.css("width","36%")
		.css("border","1px dashed")
		.css("display","inline-block")
		.css("FILTER","alpha(opacity=0)")
		.css("background-color","white")
		.css("float","left");

	$("#options")
		.css("width","16%")
		.css("float","left")
		.css("padding-left","1em");
		
	$("#programdiv")
		.css("width","130px")
		.css("margin-left","160px")
		.css("margin-bottom","6px");
		
	vis(graphtojson, EGOptions.defrel, EGOptions.map.width, EGOptions.map.height);
  }
  
  var rootArray = [];

  function isExistRootNode(rootArray,nodename){
	var flag = false ;
	
	for(var i in rootArray){
		if(rootArray[i] === nodename){
			flag = true;
			break;
		}
	}
	
	return flag;
  }
  
    function getResultGraphData(){
	var demphasisNodesArray = [];
	var demphasisLinksArray = [];
			
	for(var ai = 0;ai < allJsonData.length;ai ++){
		var eventsModelseg = getDataFromJson(allJsonData[ai]);
		var tempNodesArray = eventsModelseg.nodesArray;
		var tempLinksArray = eventsModelseg.linksArray;
				
		demphasisNodesArray = demphasisNodesArray.concat(tempNodesArray);
		demphasisLinksArray = demphasisLinksArray.concat(tempLinksArray);
	}
			
	var resultNodesArray = demphasisArrayNodes(demphasisNodesArray);
	var resultLinksArray = demphasisArrayLinks(demphasisLinksArray);
			
	var eventsModelseg1 = new EventsEModel(resultNodesArray,resultLinksArray);
			
	var eventsModel = dataProcessing(eventsModelseg1);
	var graphdata = getGraphJsonStr(eventsModel);
			
	//var graphtojson = eval('(' + graphdata + ')');
	var graphtojson = JSON.parse(graphdata);
		
	return graphtojson;
  }
  
  function demphasisArrayNodes(dataArray){
	var resultArray = [];
	if(dataArray.length !== 0){
		resultArray.push(dataArray[0]);
		
		for(var i in dataArray){
			var flag = 0;
			for(var j in resultArray){
				if(dataArray[i].id === resultArray[j].id){
					break;
				}else {
					flag ++;
				}
			}
			if(flag === resultArray.length){
				resultArray[flag] = dataArray[i];
			}
		}
	}
	return resultArray;
  }

  function spliceNode(rootArray,nodename){
	var resultArray = [];
	for(var i in rootArray){
		if(rootArray[i] === nodename){
			resultArray = rootArray.splice(i,1);
			break;
		}
	}
	return resultArray;
  }

  function demphasisArrayLinks(dataArray){
	var resultArray = [];
	if(dataArray.length !== 0){
		resultArray[0] = dataArray[0];
		
		for(var i in dataArray){
			var flag = 0;
			for(var j in resultArray){
				if((dataArray[i].source === resultArray[j].source && dataArray[i].target === resultArray[j].target)||
						(dataArray[i].target === resultArray[j].source && dataArray[i].source === resultArray[j].target)){
						break;	
				}else {
					flag ++;
				}
			}
			if(flag === resultArray.length){
				resultArray[flag] = dataArray[i];
			}
		}
	}
	return resultArray;
  }

  function nodesIndex(name,type,id,uri,index){
	this.name = name;
	this.type = type;
	this.id = id;
	this.uri = uri;
	this.index = index;
  }

  function nodes(name,type,id,uri){
	this.name = name;
	this.type = type;
	this.id = id;
	this.uri = uri;
  }

  function links(source,target,value){
	this.source = source;
	this.target = target;
	this.value = value;
  }

  function EventsEModel(nodesArray,linksArray){
	this.nodesArray = nodesArray;
	this.linksArray = linksArray;
  }

  function getDataFromJson(data){
	var linksArray = [];
	var nodesArray = [];
	
	var type = "loc";
	
	var similarEvents = data.similarEvents;
	var betweenEventSimilarity = data.betweenEventSimilarity;
	
	var rootid = data.eventInfo.id;
	var rootype = type;
	var rootname = data.eventInfo.primaryStory.medoidArticle.title;
	var rooturi = data.eventInfo.primaryStory.uri;
	nodesArray.push(new nodes(rootname,rootype,rootid,rooturi));
	for(var i in similarEvents){
		var nodename = data.similarEvents[i].primaryStory.medoidArticle.title;
		var nodetype = type;
		var nodeid = data.similarEvents[i].id;
		var nodeuri = data.similarEvents[i].primaryStory.uri;
		
		linksArray.push(new links(rootid,nodeid,similarEvents[i].sim));
		nodesArray.push(new nodes(nodename,nodetype,nodeid,nodeuri));
	}
	
	for(var ii in betweenEventSimilarity){
		var sourceid = betweenEventSimilarity[ii].id1;
		var targetid = betweenEventSimilarity[ii].id2;
		var value = betweenEventSimilarity[ii].sim;
		
		if(value !== 0){
			linksArray.push(new links(sourceid,targetid,value));	
		}
	}
	
	return new EventsEModel(nodesArray,linksArray);
  }

  function getNodesIndex(nodesArray,nodesid){
	var index = 0;
	
	for(var i in nodesArray){
		if(nodesArray[i].id === nodesid){
			index = i;
			break;
		}
	}
	return index;
  }

  function dataProcessing(eventsEModel){
	var modelnodesArray = eventsEModel.nodesArray;
	var modelinksArray = eventsEModel.linksArray;
	
	var nodesArray = [];
	var linksArray = [];
	
	for(var i in modelnodesArray){
		var nodename = modelnodesArray[i].name;
		var nodetype = modelnodesArray[i].type;
		var nodeid = modelnodesArray[i].id;
		var uri = modelnodesArray[i].uri;
		nodesArray.push(new nodesIndex(nodename,nodetype,nodeid,uri,i));
	}
	
	for(var ii in modelinksArray){
		var sourceid = modelinksArray[ii].source;
		var targetid = modelinksArray[ii].target;
		var value = modelinksArray[ii].value;
		
		var sourceindex = getNodesIndex(modelnodesArray,sourceid);
		var targetindex = getNodesIndex(modelnodesArray,targetid);
		
		linksArray.push(new links(sourceindex,targetindex,value));
	}
	return new EventsEModel(nodesArray,linksArray);
  }

  function getGraphJsonStr(eventsEModel){
	var nodesArray = eventsEModel.nodesArray;
	var linksArray = eventsEModel.linksArray;
	
	var html = "";
	html += '{"nodes":[';

    for(var i = 0;i < nodesArray.length;i ++){
        if (i !== 0) {
            html += ',';
        }
        html += '{"name":"';
        html += nodesArray[i].name;
        html += '","type":"';
        html += nodesArray[i].type;
        html += '"}';
    }
    
    html += '],"links":[';
    for (var ii = 0; ii < linksArray.length; ii++) {
        if (ii !== 0) {
            html += ',';
        }
        html += '{"source":';
        html += (linksArray[ii].source);
        html += ',"target":';
        html += (linksArray[ii].target);
        html += ',"value":';
        html += linksArray[ii].value;
        html += '}';

    }
    html += ']}';
	
	return html;
  }

function vis(json,curelval,w, h) {
	var weiArg = 1, disArg1 = 1, disArg2 = 10, sizeArgT = 4, sizeArgE = 4, sizeArg = 4, relaArg = curelval;
	var nullnode = JSON.parse('{"id":"n999999","name":"null","type":"null","x":-100,"y":-100}');
	var nullnode2 = JSON.parse('{"id":"n888888","name":"null","type":"null","x":-100,"y":-100}');
	nodesArray = json.nodes;
	
	if(!isExistRootNode(rootArray,nodesArray[0].name)){
		rootArray.push(nodesArray[0].name);
	}
	
	function UI() {
		$("#rule").change(function() {
			if ($(this).val() === "a") {
				setArgs(0, 0, 4, 10, 1);
				$("#slider1").slider("value", 1);
				$("#slider2").slider("value", 0);
				$("#slider3").slider("value", 4);
				$("#slider4").slider("value", 10 * 10);
				$("#slider5").slider("value", 1 * 10);
			} else if ($(this).val() === "b") {
				setArgs(1, 20, 2, 0.1, 0.1);
				$("#slider1").slider("value", 1);
				$("#slider2").slider("value", 20);
				$("#slider3").slider("value", 2);
				$("#slider4").slider("value", 0.1 * 10);
				$("#slider5").slider("value", 0.1 * 10);
			} else if ($(this).val() === "c") {
				setArgs(3,50, 3, 13, 7);
				$("#slider1").slider("value", 3);
				$("#slider2").slider("value", 30);
				$("#slider3").slider("value", 3);
				$("#slider4").slider("value", 13 * 10);
				$("#slider5").slider("value", 7 * 10);
			} else if ($(this).val() === "d") {
				setArgs(6, 0, 3, 10, 3);
				$("#slider1").slider("value", 6);
				$("#slider2").slider("value", 50);
				$("#slider3").slider("value", 3);
				$("#slider4").slider("value", 10 * 10);
				$("#slider5").slider("value", 3 * 10);
			}
		});
		$("#slider1").slider({
			range : "max",
			min : 0,
			max : 10,
			value : weiArg,
			slide : function(event, ui) {
				setweight(ui.value);
			}
		});
		$("#slider2").slider({
			range : "max",
			min : 0,
			max : 100,
			value : relaArg,
			slide : function(event, ui) {
				setrelation(ui.value / 100);
			}
		});
		$("#slider3").slider({
			min : 0,
			max : 10,
			value : sizeArg,
			slide : function(event, ui) {
				setsize(ui.value);
			}
		});
		$("#slider4").slider({
			min : 1,
			max : 100,
			value : disArg2 * 10,
			slide : function(event, ui) {
				setdistance2(ui.value / 10);

			}
		});
		$("#slider5").slider({
			min : 1,
			max : 30,
			value : disArg1 * 10,
			slide : function(event, ui) {
				setdistance1(ui.value / 10);
			}
		});
	}             
	
	function addTopic(id) {
		linkdatas0.forEach(function(d, i) {
			if (nodedatas0[d.source].type === id || nodedatas0[d.target].type === id) {
				linkdatas[i] = clone(linkdatas0[i]);
			}
		});
	}
	function removeTopic(id) {
		linkdatas.forEach(function(d, i) {
			if (d.source.type === id) {
				d.source = nullnode;
			}
			
			if(d.target.type === id){
				d.target = nullnode;
			}
		});
	}

	UI();

	var force;
	var w1 = w, h1 = h;

	var nh0 = 9, nw0 = 14;
	var nh = nh0 * sizeArg, nw = nw0 * sizeArg;
	var tw = 12;

	var max = 0, min = 5;
	var log = d3.scale.log();
	var node, link, svg, nodeRects, nodeTexts;
	var nodedatas, nodedatas0, linkdatas, linkdatas0;
	var color = d3.scale.category10();
	var fill = [], fill2 = [];
	fill.loc = "#cccccc";
	fill.LOC = "#cccccc";
	var defaultrectfill = "#cccccc";
	var defaultextfill = "#666666";
	var mouseoverfill = "#ff4500";
	var clickfill = "#9933cc";

	initDatas(true);
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
			for ( var k in jsonObj) {
				buf[k] = clone(jsonObj[k]);
			}
			return buf;
		} else {
			return jsonObj;
		}
	}

	function initDatas(vis) {
		var linear = d3.scale.linear();
		linear.domain([ 0, 0.00005, 0.0001, 0.005, 0.1, 0.6, 1 ]);
		linear.range([ 0, 0.001, 0.3, 0.4, 0.5, 0.9, 1 ]);

		for ( var i in json.links) {
			json.links[i].value = linear(json.links[i].value);
		}
		for ( var ii in json.nodes) {
			json.nodes[ii].id = ii;
		}
		nodedatas = clone(json.nodes);
		linkdatas = clone(json.links);
		nodedatas0 = clone(json.nodes);
		linkdatas0 = clone(json.links);
		if (vis){
			initVis();
		}
	}
	function initVis() {
		for ( var i in linkdatas) {
			max = max > cdis(linkdatas[i].value) ? max : cdis(linkdatas[i].value);
		}
		force = d3.layout.force().charge(-300).friction(0.8).linkDistance(function(d) {
			return (cdis(d.value) / max) * (w1 / 2);
		}).linkStrength(0.5).size([ w1, h1 ]);

		force.nodes(nodedatas).links(linkdatas).start();

		svg = d3.select("#map").append("svg").attr("width", w1).attr("height", h1);
		link = svg.selectAll("line.link").data(linkdatas).enter().append("line");
		node = svg.selectAll(".node").data(nodedatas).enter().append("g");

		link.attr("class", "link").attr("id", function(d) {
			return "l" + d.id;
		});
		
		node.attr("id", function(d) {
			if(d.type === "loc"){
				return "loc" + d.id;
			}
		}).attr("class", "node").call(force.drag);

		nodeRects = node.append("rect");
		nodeTexts = node.append("text");

		initLinks();
		initNodes();

		node.on("mouseover", function(d, i) {
			document.getElementById("graph").setAttribute("title" ,nodesArray[i].name);
			if(d3.select(this).select("rect").style("fill").colorHex() === defaultrectfill){
				d3.select(this).select("rect").style("fill", mouseoverfill);
				d3.select(this).select("text").style("fill", "#FFF");
			}
			
			link.style("stroke", function(l) {
				if (l.source === d) {
					d3.select("#n" + l.target.id + " rect").style("stroke", mouseoverfill).style("fill-opacity", "0.6")
							.attr("rx", 0).attr("ry", 0);
					d3.select("#n" + l.target.id + " text").style("fill", "black");
					return "red";
				} else if (l.target === d) {
					d3.select("#n" + l.source.id + " rect").style("stroke", mouseoverfill).style("fill-opacity", "0.6")
							.attr("rx", 0).attr("ry", 0);
					d3.select("#n" + l.source.id + " text").style("fill", "black");
					return "red";
				}
			});
		});
		
		node.on("mouseout", function(d) {
			initLinks();
			if(d3.select(this).select("rect").style("fill").colorHex() !== clickfill){
				d3.select(this).select("rect").style("fill", defaultrectfill);
				d3.select(this).select("text").style("fill", defaultextfill);
			}
		});
		
		node.on("click",function(d,i){
			if(d3.select(this).select("rect").style("fill").colorHex() === mouseoverfill){
				if(!isExistRootNode(rootArray,d.name)){
					rootArray.push(d.name);
				}
			
				d3.select(this).select("rect").style("fill", clickfill);
				d3.select(this).select("text").style("fill", "#FFF");
			}else if(d3.select(this).select("rect").style("fill").colorHex() === clickfill){
                spliceNode(rootArray,d.name);
				
				d3.select(this).select("rect").style("fill", "#cccccc");
				d3.select(this).select("text").style("fill", defaultextfill);
			}
			
			$("#map").html("");
			
			allJsonData.push(seg2);
			var graphtojson = getResultGraphData(allJsonData);
			vis(graphtojson, relaArg, 688, 450);
			
			if(d3.select(this).select("rect").style("fill") !== clickfill){
				d3.select(this).select("rect").style("fill", defaultrectfill);
				d3.select(this).select("text").style("fill", defaultextfill);
			}
		});

		nodedatas.forEach(function(d) {
			d.visible = d.weight > weiArg ? 1 : 0;
		});
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
	function initLinks() {
		link.style("stroke-width", function(d) {
			return 6 / cdis(d.value);
		}).style("stroke", function(l) {
			return "";
		}).style("stroke-opacity", function(l) {
			if (l.source.weight > weiArg && l.target.weight > weiArg) {
				return 0.3;
			} else{
				return 0;
			}
		});
	}
	function initNodes() {
		//alert(nodesArray.length);
		nodeRects.attr("x", function(d) {
			return d.name.length > 3 ? -(nw + (d.name.substring(0, 8).length - 3) * tw) / 2.5 : -nw / 2.5;
		}).attr("y", function(d) {
			return d.type === "topic" ? nh / -2 : nh / 2.5 / -2;
		}).attr("width", function(d) {
			return d.name.length > 3 ? (d.name.substring(0, 10).length - 3) * tw : nw;
		}).attr("height", function(d) {
			return d.type === "topic" ? nh : nh / 2.5;
		}).attr("rx", function(d) {
			return d.type === "topic" ? nw / 3 : 8;
		}).attr("ry", function(d) {
			return d.type === "topic" ? nh / 2.5 : 8;
		}).style("fill", function(d) {
			var flag = 0;
			var fillcolor = fill[d.type];
			
			for(var i in rootArray){
				//alert("d.name :" + d.name + " ----- rootArray[" + i + "] :" + rootArray[i]);
				if(d.name === rootArray[i]){
					fillcolor = clickfill;
					break;
				}
			}
			return fillcolor;
		}).style("stroke", function(d) {
			return fill[d.type];
		}).style("fill-opacity", "0.9");

		nodeTexts.attr("dy", ".3em").style("text-anchor", "middle").style("fill", function(d) {
			var flag = 0;
			var fillcolor = defaultextfill;
			
			for(var i in rootArray){
				//alert("d.name :" + d.name + " ----- rootArray[" + i + "] :" + rootArray[i]);
				if(d.name === rootArray[i]){
					fillcolor = "#FFF";
					break;
				}
			}
			return fillcolor;
			
		}).style("font", "12px sans-serif").text(function(d) {
			return d.name.length > 10 ? d.name.substring(0, 10) + "..." : d.name;
		});
	}
	function cdis(dis) {
		// var dis = 3 - disArg1 * log(dis) / log(disArg2);
		var diss = min - disArg1 * log(dis) / log(disArg2);
		// alert(dis);
		return diss;
	}
	function cx(dx, visible) {
		if (visible === 0) {
			return -100;
		}
		dx = dx < nw / 2 ? nw - dx : dx; 
		dx = dx > w1 - nw / 2 ? w1 * 2 - dx - nw : dx; 
		return dx;
	}
	function cy(dy, visible) {
		if (visible === 0) {
			return -100;
		}
		dy = dy < nh / 2 ? nh - dy / 2 : dy; 
		dy = dy > h1 - nh / 2 ? h1 * 2 - dy - nh : dy;
		return dy;
	}
	function setArgs(wei, rela, size, dis2, dis) {
		sizeArg = size;
		sizerefresh();
		disArg1 = dis;
		disArg2 = dis2;
		disrefresh();
		weiArg = wei;
		refresh();
		relaArg = rela/100;
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
	function setweight(arg) {
		weiArg = arg;
		refresh();
	}
	function setrelation(arg) {
		relaArg = arg;
		refresh();
	}
	function sizerefresh() {
		nh = nh0 * sizeArg;
		nw = nw0 * sizeArg;
		initNodes();
	}
	function disrefresh() {
		var max = 0, max2 = 0;
		for ( var i in linkdatas) {
			max = max > cdis(linkdatas[i].value) ? max : cdis(linkdatas[i].value);
		}
		refresh();
		force.linkDistance(function(d) {
			max2 = max2 > ((cdis(d.value) / max) * (w1 / 2)) ? max2 : ((cdis(d.value) / max) * (w1 / 2));
			return ((cdis(d.value) / max) * (w1 / 2));
		});
	}
	function refresh() {
		linkdatas.forEach(function(d, i) {
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
		
		force.nodes(nodedatas).links(linkdatas).start();
		svg.selectAll("line.link").data(linkdatas).enter();
		initLinks();
		nodedatas.forEach(function(d) {
			d.visible = d.weight > weiArg ? 1 : 0;
		});
		force.on("tick", function() {
			link.attr("x1", function(d) {
				return cx(d.source.x, d.source.visible);
			}).attr("y1", function(d) {
				return cy(d.source.y, d.source.visible);
			}).attr("x2", function(d) {
				return cx(d.target.x, d.target.visible);
			}).attr("y2", function(d) {
				return cy(d.target.y, d.target.visible);
			});

			node.attr("transform", function(d) {
				return "translate(" + cx(d.x, d.visible) + "," + cy(d.y, d.visible) + ")";
			});
		});
	}
}

})(jQuery);

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

/**
* TimeGeo plugin for jQuery
* @class TimeGeo
*/
var timegeOptions = null;
(function ($) {
  /**
   * Default options for this plugin
   */
  var defaults = {

  };
   /**
  * Plugin main function.
  * @method TimeGeo
  * @param options {Object} setting parameters in an object.
  * @return {Object} jQuery object
  */
  $.fn.timegeo = function (options) {
    var opts = $.extend({}, defaults, options || {});
    return this.each(function() {
      var $this = $(this);
      //alert($this.attr("id"));
      //alert("3333");
      //createTimeGeo(opts);
      //alert("opts : "+opts.data.articles.length);
      //loadScript();
      timegeOptions = opts;
      TimeGeoCharts();
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
	
	function TimeGeoCharts(){
        insertCSS("../../libs/timegeo/css/style.css");
		initialize();
        createTimeGeo();
	}
    var icons = ["hot.png", "hot32.png", "hot48.png"],
	currentMarkers = [],
    visibleInfoWin = [],
	minDate = null,
	maxDate = null,
    Map = {
      map: null,
      geocoder: null
    };

  function update(articleList){
    drawMarkers(sortArticleByLocation(articleList), articleList.length);
  }
  
  function createTimeGeo(){
	//timegeOptions = opts;
	var articleList = timegeOptions.data.articles;
	update(articleList);
	var div = timegeOptions.timetrendOptions.container;

	drawChart(articleList,div);
  }

  function getLinkListHtml(articles) {
    var html = "<ul>";
    for(i = 0;i < articles.length;i ++) {
      var a = "<li><a target=_blank ";
      if(articles[i].related){
        a += "style='color:gray;' ";
      }
      a += "href='" + 
        articles[i].url + "'>" + 
       "&gt;&nbsp;" + articles[i].title + 
        " (<i>FROM: " + articles[i].source + "</i>)"+ 
        "</a></li>";
      html += a;
    }
    html += "</ul>";
    return html;
  }
  
  function closeAllInfoWin() {
    for(i = 0;i < visibleInfoWin.length;i ++){
      visibleInfoWin[i].close();
    }
    visibleInfoWin = [];
  }

  function sortArticleByLocation(articleList) {
    var locMap = [];
    for(i = 0;i < articleList.length;i ++) {
      var article = articleList[i];
      if(article == null || !article.country){
        continue;
      }
      var loc = article.country;
      if(article.city !== null && article.city !== ""){
        loc = article.city + "," + loc;
      }
      for(var j=0; j < locMap.length; j ++) {
        if(locMap[j].loc.toLowerCase() === loc.toLowerCase()) {
          locMap[j].articles.push(article);
          break;
        }
      }
      if(j > locMap.length - 1) {
        var newLoc = {};
        newLoc.loc = loc;
        newLoc.location = article.location;
        newLoc.articles = [].concat(article);
        locMap.push(newLoc);
      }
    }
    return locMap;
  }

  function createMarker(latlng, title, articles, scale) {
    //var unit = Math.floor(total / 3);
    //var scale = Math.floor(articles.length / unit) + 1;
    var iconFile = "../../libs/timegeo/images/" + icons[scale];
    var icon = new google.maps.MarkerImage(iconFile);
    var size = 16 * (scale + 1);
    icon.scaledSize = new google.maps.Size(size, size);
    icon.anchor = new google.maps.Point(size / 2, size / 2);
    var marker = new google.maps.Marker({
        icon: icon,
        map: Map.map,
        position: latlng,
        title: title + ", " + articles.length + " article(s)."
      });
    //marker.value = number;
    var myHtml = getLinkListHtml(articles);
    var infowindow = new google.maps.InfoWindow({
      content: myHtml
    });
    google.maps.event.addListener(marker,"click", function() {
      //var myHtml = "<b>#" + number + "</b><br/>" + message[number -1];
      //settingsHide();
      infowindow.open(Map.map, marker);
      visibleInfoWin.push(infowindow);
    });
    return marker;
  }

  function drawMarkers(locMap, total) {
    //remove all current markers from map
    if(currentMarkers) {
      for(i = 0 ;i < currentMarkers.length;i ++){
        currentMarkers[i].setMap(null);
      }	
      currentMarkers.length = 0;
    }
    
    //add new markers to map
    // commented because of google map api loading failure
    var getCount = function (d) {
      return d.articles.length;
    };
    var sizeScale = d3.scale.linear()
      .domain([d3.min(locMap, getCount), d3.max(locMap, getCount)])
      .rangeRound([0, 1, 2]);
    for (var i = 0; i < locMap.length; i++) {
      var marker = createMarker(
        new google.maps.LatLng(locMap[i].location[0], locMap[i].location[1]),
        locMap[i].loc, 
        locMap[i].articles,
        sizeScale(locMap[i].articles.length));
      currentMarkers.push(marker);
    }
  }

function initialize() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(40, 30),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: true
  };
  
  Map.map = new google.maps.Map(document.getElementById("map"), mapOptions);
  Map.geocoder = new google.maps.Geocoder();
  //drawMarkers(sortArticleByLocation(articles));
  google.maps.event.addListener(Map.map,"click", function() {
    closeAllInfoWin();
  });
}

/**
 * get the date map from the articleList
 */
function getTimelineDataMap(articleList){
	var timelinemap = {};
	for(var i = 0;i < articleList.length;i ++){
		var date = articleList[i].date;
		var count = 1;
		if(date in timelinemap){
			count = timelinemap[date] + 1;
		}
		timelinemap[date] = count;
	}
	return timelinemap;
}

function timelineModel(date,count){
	this.date = date;
	this.count = count;
}

function sort_by(field, reverse, primer){
	reverse = (reverse) ? -1 : 1; 
	return function(a,b){ 
        a = a[field]; 
        b = b[field]; 
        if (typeof(primer) !== 'undefined'){ 
           a = primer(a); 
           b = primer(b); 
        } 
        if (a>b) {
            if(field === "date"){
               return reverse * 1; 
            }
        }
        if (a<b) {
            if(field === "date"){
               return reverse * -1; 
            }
        }	
        return 0; 
    }; 
}

/**
 * change the map to Array
 */
function dataMapToArray(timelinemap){
	var tempArray = [];
	for(var key in timelinemap){
		console.log("timelinemap["+key+"]"+timelinemap[key]);  
		tempArray.push(new timelineModel(key,timelinemap[key]));
	}
	
	tempArray.sort(sort_by('date',false,String));
	
	var dataArray = [];
	var titleArray = [];
	titleArray[0] = "date";
	titleArray[1] = "count";
	dataArray.push(titleArray);
	
	for(var i in tempArray){
		var tempdataArray = [];
		tempdataArray[0] = tempArray[i].date;
		tempdataArray[1] = tempArray[i].count;
		dataArray.push(tempdataArray);
	}
	return dataArray;
}

function drawChart(articleList,div) {
	var timelinemap = getTimelineDataMap(articleList);
	var dataArray = dataMapToArray(timelinemap);
	var data = google.visualization.arrayToDataTable(dataArray);
	
	var options = timegeOptions.timetrendOptions;

	var chart = new google.visualization.AreaChart(document.getElementById(div));
	chart.draw(data, options);
	
	google.visualization.events.addListener(chart, 'select', function(){
		if(JSON.stringify(chart.getSelection()) !== "[]"){
			//alert(JSON.stringify(chart.getSelection()[0]));
			var selectArray = dataArray[chart.getSelection()[0].row + 1];
			var date = selectArray[0];
			
			var articlesum = selectArray[chart.getSelection()[0].column];

			//alert("date : " + date + " articlesum : " + articlesum);
			
			var dateArticlesArray = [];
			for(var ai in articleList){
				if(articleList[ai].date.indexOf(date) !== -1){
					dateArticlesArray.push(articleList[ai]);
				}
			}
			update(dateArticlesArray);
		}
	});
}

function loadScript() {
 script = document.createElement("script");
 script.type = "text/javascript";
 script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyAt_fSm9zCSNOzjitnPyLQlbVeoIvffWk8&sensor=false&language=en&callback=initialize";
 document.body.appendChild(script);
 // initialize();
  //update(timegeodata.articles);
}
//window.onload = loadScript;
})(jQuery);

/**
* Timeline plugin for jQuery
* @class Timeline
*/
(function ($) {

  /**
   * Default options for this plugin
   */
  var defaults = {

  };
   /**
  * Plugin main function.
  * @method timeline
  * @param options {Object} setting parameters in an object.
  * @return {Object} jQuery object
  */
  $.fn.timeline = function (options) {
    var opts = $.extend({}, defaults, options || {});
    return this.each(function() {
      var $this = $(this);
      //alert($this.attr("id"));

      drawTimelineChart(opts);
    });
  };
})(jQuery);
