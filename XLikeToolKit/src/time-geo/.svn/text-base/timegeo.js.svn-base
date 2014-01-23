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
               return reverse * -1; 
            }
        }
        if (a<b) {
            if(field === "date"){
               return reverse * 1; 
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
			var selectArray = dataArray[chart.getSelection()[0].row];
			var date = selectArray[0];
			var articlesum = selectArray[chart.getSelection()[0].column];

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
