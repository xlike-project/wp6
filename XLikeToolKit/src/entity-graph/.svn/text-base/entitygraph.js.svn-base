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
