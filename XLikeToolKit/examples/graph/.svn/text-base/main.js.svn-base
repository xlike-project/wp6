require.config({
　paths: {
	"d3": "../../libs/d3.v3.min",
　　"jquery": "../../libs/jquery-1.8.2.min",
　　"jquery-ui": "../../libs/jquery-ui-1.9.2.min",
    "underscore": "../../libs/underscore-1.5.2.min",
    "toolkit": "../../build/jquery.xlike-toolkit.min"
　}
});

/**
* Graph module
*/
require(["d3", "jquery", "jquery-ui", "underscore", "toolkit"], 
  function() {
	var data = {
		concepts: [
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Microsoft",
				id: "23605",
				type: "pm_org",
				label: "Microsoft",
				label_eng: "Microsoft",
				label_deu: "Microsoft",
				label_spa: "Microsoft",
				label_zho: "Microsoft",
				label_slv: "Microsoft",
				score: 79
			},
			{
				uri: "pm_location:http://en.wikipedia.org/wiki/United_States",
				id: "233",
				type: "pm_location",
				label: "United States",
				label_eng: "United States",
				label_deu: "Vereinigte Staaten",
				label_spa: "Estados Unidos",
				label_zho: "United States",
				label_slv: "ZDA",
				score: 57
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Google",
				id: "21388",
				type: "pm_org",
				label: "Google",
				label_eng: "Google",
				label_deu: "Google",
				label_spa: "Google",
				label_zho: "Google",
				label_slv: "Google",
				score: 43
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Facebook",
				id: "19154",
				type: "pm_org",
				label: "Facebook",
				label_eng: "Facebook",
				label_deu: "Facebook",
				label_spa: "Facebook",
				label_zho: "Facebook",
				label_slv: "Facebook",
				score: 37
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Twitter",
				id: "18899",
				type: "pm_org",
				label: "Twitter",
				label_eng: "Twitter",
				label_deu: "Twitter",
				label_spa: "Twitter",
				label_zho: "Twitter",
				label_slv: "Twitter",
				score: 36
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Apple_Inc.",
				id: "21720",
				type: "pm_org",
				label: "Apple Inc.",
				label_eng: "Apple Inc.",
				label_deu: "Apple",
				label_spa: "Apple Inc.",
				label_zho: "Apple Inc.",
				label_slv: "Apple Inc.",
				score: 35
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Reuters",
				id: "23724",
				type: "pm_org",
				label: "Reuters",
				label_eng: "Reuters",
				label_deu: "Reuters",
				label_spa: "Reuters",
				label_zho: "Reuters",
				label_slv: "Reuters",
				score: 20
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Sony",
				id: "29044",
				type: "pm_org",
				label: "Sony",
				label_eng: "Sony",
				label_deu: "Sony",
				label_spa: "Sony",
				label_zho: "Sony",
				label_slv: "Sony",
				score: 18
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/The_Wall_Street_Journal",
				id: "20659",
				type: "pm_org",
				label: "The Wall Street Journal",
				label_eng: "The Wall Street Journal",
				label_deu: "The Wall Street Journal",
				label_spa: "The Wall Street Journal",
				label_zho: "The Wall Street Journal",
				label_slv: "The Wall Street Journal",
				score: 18
			},
			{
				uri: "pm_location:http://en.wikipedia.org/wiki/China",
				id: "47",
				type: "pm_location",
				label: "China",
				label_eng: "China",
				label_deu: "Volksrepublik China",
				label_spa: "Rep\xFAblica Popular China",
				label_zho: "People's Republic of China",
				label_slv: "Kitajska",
				score: 16
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Nokia",
				id: "23602",
				type: "pm_org",
				label: "Nokia",
				label_eng: "Nokia",
				label_deu: "Nokia",
				label_spa: "Nokia",
				label_zho: "Nokia",
				label_slv: "Nokia",
				score: 16
			},
			{
				uri: "pm_location:http://en.wikipedia.org/wiki/President_of_the_United_States",
				id: "19490",
				type: "pm_location",
				label: "President of the United States",
				label_eng: "President of the United States",
				label_deu: "President of the United States",
				label_spa: "Presidente de los Estados Unidos",
				label_zho: "President of the United States",
				label_slv: "President of the United States",
				score: 14
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/YouTube",
				id: "19115",
				type: "pm_org",
				label: "YouTube",
				label_eng: "YouTube",
				label_deu: "YouTube",
				label_spa: "YouTube",
				label_zho: "YouTube",
				label_slv: "YouTube",
				score: 14
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Amazon.com",
				id: "19666",
				type: "pm_org",
				label: "Amazon.com",
				label_eng: "Amazon.com",
				label_deu: "Amazon.com",
				label_spa: "Amazon.com",
				label_zho: "Amazon.com",
				label_slv: "Amazon.com",
				score: 13
			},
			{
				uri: "pm_location:http://en.wikipedia.org/wiki/United_Kingdom",
				id: "76",
				type: "pm_location",
				label: "United Kingdom",
				label_eng: "United Kingdom",
				label_deu: "Vereinigtes K\xF6nigreich",
				label_spa: "Reino Unido",
				label_zho: "United Kingdom",
				label_slv: "Velika Britanija",
				score: 12
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/The_New_York_Times",
				id: "21558",
				type: "pm_org",
				label: "The New York Times",
				label_eng: "The New York Times",
				label_deu: "The New York Times",
				label_spa: "The New York Times",
				label_zho: "The New York Times",
				label_slv: "The New York Times",
				score: 12
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Bluetooth",
				id: "26251",
				type: "pm_org",
				label: "Bluetooth",
				label_eng: "Bluetooth",
				label_deu: "Bluetooth",
				label_spa: "Bluetooth",
				label_zho: "Bluetooth",
				label_slv: "Bluetooth",
				score: 11
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Netflix",
				id: "21384",
				type: "pm_org",
				label: "Netflix",
				label_eng: "Netflix",
				label_deu: "Netflix",
				label_spa: "Netflix",
				label_zho: "Netflix",
				label_slv: "Netflix",
				score: 11
			},
			{
				uri: "pm_person:http://en.wikipedia.org/wiki/Romeo_Miller",
				id: "19413",
				type: "pm_person",
				label: "Romeo Miller",
				label_eng: "Romeo Miller",
				label_deu: "Romeo Miller",
				label_spa: "Romeo Miller",
				label_zho: "Romeo Miller",
				label_slv: "Romeo Miller",
				score: 10
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Electronic_Arts",
				id: "23086",
				type: "pm_org",
				label: "Electronic Arts",
				label_eng: "Electronic Arts",
				label_deu: "Electronic Arts",
				label_spa: "Electronic Arts",
				label_zho: "Electronic Arts",
				label_slv: "Electronic Arts",
				score: 10
			},
			{
				uri: "pm_person:http://en.wikipedia.org/wiki/Steve_Ballmer",
				id: "43186",
				type: "pm_person",
				label: "Steve Ballmer",
				label_eng: "Steve Ballmer",
				label_deu: "Steve Ballmer",
				label_spa: "Steve Ballmer",
				label_zho: "Steve Ballmer",
				label_slv: "Steve Ballmer",
				score: 9
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Paramount_Pictures",
				id: "32317",
				type: "pm_org",
				label: "Paramount Pictures",
				label_eng: "Paramount Pictures",
				label_deu: "Paramount Pictures",
				label_spa: "Paramount Pictures",
				label_zho: "Paramount Pictures",
				label_slv: "Paramount Pictures",
				score: 8
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Nintendo",
				id: "25934",
				type: "pm_org",
				label: "Nintendo",
				label_eng: "Nintendo",
				label_deu: "Nintendo",
				label_spa: "Nintendo",
				label_zho: "Nintendo",
				label_slv: "Nintendo",
				score: 8
			},
			{
				uri: "pm_org:http://en.wikipedia.org/wiki/Wall_Street",
				id: "22910",
				type: "pm_org",
				label: "Wall Street",
				label_eng: "Wall Street",
				label_deu: "Wall Street",
				label_spa: "Wall Street",
				label_zho: "Wall Street",
				label_slv: "Wall Street",
				score: 8
			},
			{
				uri: "pm_location:http://en.wikipedia.org/wiki/Canada",
				id: "37",
				type: "pm_location",
				label: "Canada",
				label_eng: "Canada",
				label_deu: "Kanada",
				label_spa: "Canad\xE1",
				label_zho: "Canada",
				label_slv: "Kanada",
				score: 8
			}
		],
		links: [
			{
				id1: 233,
				id2: 23605,
				score: 2605
			},
			{
				id1: 21388,
				id2: 18899,
				score: 1603
			},
			{
				id1: 233,
				id2: 19154,
				score: 1517
			},
			{
				id1: 18899,
				id2: 23086,
				score: 257
			},
			{
				id1: 21720,
				id2: 23605,
				score: 1447
			},
			{
				id1: 23724,
				id2: 25934,
				score: 156
			},
			{
				id1: 20659,
				id2: 29044,
				score: 260
			},
			{
				id1: 21720,
				id2: 47,
				score: 793
			},
			{
				id1: 23602,
				id2: 19115,
				score: 566
			},
			{
				id1: 19490,
				id2: 19666,
				score: 483
			},
			{
				id1: 47,
				id2: 21384,
				score: 298
			},
			{
				id1: 19490,
				id2: 21388,
				score: 942
			},
			{
				id1: 19666,
				id2: 76,
				score: 565
			},
			{
				id1: 19115,
				id2: 20659,
				score: 480
			},
			{
				id1: 21558,
				id2: 21720,
				score: 707
			},
			{
				id1: 26251,
				id2: 37,
				score: 411
			},
			{
				id1: 21384,
				id2: 19490,
				score: 572
			},
			{
				id1: 21384,
				id2: 21558,
				score: 286
			},
			{
				id1: 22910,
				id2: 22910,
				score: 159
			},
			{
				id1: 23086,
				id2: 19413,
				score: 415
			},
			{
				id1: 23086,
				id2: 23602,
				score: 277
			},
			{
				id1: 43186,
				id2: 23724,
				score: 330
			},
			{
				id1: 25934,
				id2: 26251,
				score: 142
			},
			{
				id1: 32317,
				id2: 43186,
				score: 58
			},
			{
				id1: 22910,
				id2: 32317,
				score: 83
			}
		]
	};

	var graphOptions = 
	{
		container : "graph",
		//color : ["#FF0033","#66CCCC","#CC3399","#333399","#FFFF00"],
		graph : {
			container: "map",
			title : "Relation Graph",
			gw : 630,
			gh: 450,
			data : data
		},
		settings : {
			container: "option",
			sw : 310,
			sh : 190,
			layout: "layout",
			eflabel : "Entity Filter",
			rflabel : "Relation Filter",
			wslabel : "Weights Setting",
			lclabe : "color"
		}
	};
	$("#graph").graph(graphOptions);
    //$("#graph").graph();
  }
);