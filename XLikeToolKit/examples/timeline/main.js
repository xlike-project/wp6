require.config({
　paths: {
    "jquery": "../../libs/jquery-1.8.2.min",
    "jquery-ui": "../../libs/jquery-ui-1.9.2.min",
    "d3": "../../libs/d3.v3.min",
    "json": "../../libs/json2",
    "underscore": "../../libs/underscore-1.5.2.min",
	"Timelinejs": "../../libs/timeline/js/timeline",
    "Timeline": "../../libs/timeline/js/storyjs-embed",
    "toolkit": "../../build/jquery.xlike-toolkit.min"
  }
});

/**
* Radar module
*/
require(["jquery", "jquery-ui", "d3", "json", "underscore", "Timelinejs","Timeline","toolkit"], 
  function() {
	var data = {
			"timeline":
			{
				"headline":"People Say",
				"type":"default",
				"text":"People say stuff",
				"startDate":"2012,1,26",
				"date": [
					{
						"startDate":"2012,1,26",
						"endDate":"2012,1,27",
						"headline":"Politicians Say",
						"text":"<p>In true political fashion, his character rattles off common jargon heard from people running for office.</p>",
						"asset":
						{
							"media":"http://e.hiphotos.baidu.com/pic/w%3D230/sign=6a385abb087b02080cc938e252d9f25f/8644ebf81a4c510fddc790046259252dd42aa5a8.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2012,1,10",
						"headline":"Nobody Says",
						"text":"<p>Have you ever heard someone say “can I burn a copy of your Nickelback CD?” or “my Bazooka gum still has flavor!” Nobody says that.</p>",
						"asset":
						{
							"media":"http://g.hiphotos.baidu.com/pic/w%3D230/sign=121a9a2731fa828bd1239ae0cd1f41cd/50da81cb39dbb6fdfc42fb040b24ab18972b37f2.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2012,1,26",
						"headline":"Chicagoans Say",
						"text":"",
						"asset":
						{
							"media":"http://f.hiphotos.baidu.com/pic/w%3D230/sign=4d95cdcc55e736d158138b0bab514ffc/cdbf6c81800a19d849a5071532fa828ba61e4678.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2011,12,12",
						"headline":"Girls Say",
						"text":"",
						"asset":
						{
							"media":"http://a.hiphotos.baidu.com/pic/w%3D230/sign=a9f88c4238dbb6fd255be2253925aba6/b8014a90f603738d5155349bb21bb051f819ec68.jpg",
							"credit":"",
							"caption":"Writers & Creators: Kyle Humphrey & Graydon Sheppard"
						}
					},
					{
						"startDate":"2012,1,4",
						"headline":"Broke People Say",
						"text":"",
						"asset":
						{
							"media":"http://a.hiphotos.baidu.com/pic/w%3D230/sign=a996c821a044ad342ebf8084e0a00c08/f11f3a292df5e0fea190e3cd5d6034a85fdf7275.jpg",
							"credit":"",
							"caption":""
						}
					},

					{
						"startDate":"2012,1,4",
						"headline":"Silicon Valley Says",
						"text":"",
						"asset":
						{
							"media":"http://e.hiphotos.baidu.com/pic/w%3D230/sign=30499f1da5c27d1ea5263cc72bd4adaf/0b55b319ebc4b745a7df9aafcefc1e178a82153b.jpg",
							"credit":"",
							"caption":"written, filmed, and edited by Kate Imbach & Tom Conrad"
						}
					},
					{
						"startDate":"2011,12,25",
						"headline":"Vegans Say",
						"text":"",
						"asset":
						{
							"media":"http://g.hiphotos.baidu.com/pic/w%3D230/sign=1f6136aa38dbb6fd255be2253925aba6/b8014a90f603738de7cc8e73b21bb051f919ecd9.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2012,1,23",
						"headline":"Graphic Designers Say",
						"text":"",
						"asset":
						{
							"media":"http://a.hiphotos.baidu.com/pic/w%3D230/sign=baad99104afbfbeddc59317c48f0f78e/e824b899a9014c088e04208a0b7b02087bf4f4e6.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2011,12,30",
						"headline":"Wookiees Say",
						"text":"",
						"asset":
						{
							"media":"http://c.hiphotos.baidu.com/pic/w%3D230/sign=323421a4aa18972ba33a07c9d6cc7b9d/3812b31bb051f819643a1efadbb44aed2e73e767.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2012,1,17",
						"headline":"People Say About People Say Videos",
						"text":"",
						"asset":
						{
							"media":"http://e.hiphotos.baidu.com/pic/w%3D230/sign=842aa2b5bba1cd1105b675238910c8b0/d01373f082025aafd8f9384efaedab64024f1a6f.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2012,1,20",
						"headline":"Social Media Pros Say",
						"text":"",
						"asset":
						{
							"media":"http://f.hiphotos.baidu.com/pic/w%3D230/sign=664584755bafa40f3cc6c9de9b65038c/29381f30e924b899bcb44a7f6f061d950b7bf6e8.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2012,1,11",
						"headline":"Old People Say About Computers",
						"text":"",
						"asset":
						{
							"media":"http://c.hiphotos.baidu.com/pic/w%3D230/sign=d31ec236a044ad342ebf8084e0a30c08/f11f3a292df5e0fedb18e9da5d6034a85fdf72ec.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2012,1,11",
						"headline":"College Freshmen Say",
						"text":"",
						"asset":
						{
							"media":"http://f.hiphotos.baidu.com/pic/w%3D230/sign=0a8cb45f71cf3bc7e800caefe101babd/43a7d933c895d143c0ceac7172f082025aaf0723.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2011,12,16",
						"headline":"Girls Say - Episode 2",
						"text":"",
						"asset":
						{
							"media":"http://c.hiphotos.baidu.com/pic/w%3D230/sign=eb6f227edc54564ee565e33a83df9cde/c2fdfc039245d6887604acc9a5c27d1ed21b245c.jpg",
							"credit":"",
							"caption":"Writers & Creators: Kyle Humphrey & Graydon Sheppard"
						}
					},
					{
						"startDate":"2011,12,24",
						"headline":"Girls Say - Episode 3 Featuring Juliette Lewis",
						"text":"",
						"asset":
						{
							"media":"http://e.hiphotos.baidu.com/pic/w%3D230/sign=19465d399358d109c4e3aeb1e158ccd0/9345d688d43f879460d07669d31b0ef41bd53a4d.jpg",
							"credit":"",
							"caption":"Writers & Creators: Kyle Humphrey & Graydon Sheppard"
						}
					},
					{
						"startDate":"2012,1,27",
						"headline":"Web Designers Say",
						"text":"",
						"asset":
						{
							"media":"http://f.hiphotos.baidu.com/pic/w%3D230/sign=d432b0b7b03533faf5b6942d98d2fdca/dcc451da81cb39db7b175eefd1160924aa1830b7.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2012,1,12",
						"headline":"Hipsters Say",
						"text":"No meme is complete without a bit of hipster-bashing.",
						"asset":
						{
							"media":"http://c.hiphotos.baidu.com/pic/w%3D230/sign=eb6f227edc54564ee565e33a83df9cde/c2fdfc039245d6887604acc9a5c27d1ed21b245c.jpg",
							"credit":"",
							"caption":"Written, Directed, Conceptualized and Performed by Carrie Valentine and Jessica Katz"
						}
					},
					{
						"startDate":"2012,1,6",
						"headline":"Cats Say",
						"text":"No meme is complete without cats. This had to happen, obviously.",
						"asset":
						{
							"media":"http://f.hiphotos.baidu.com/pic/w%3D230/sign=e101bc603b292df597c3ab168c305ce2/71cf3bc79f3df8dca4eff6decc11728b461028aa.jpg",
							"credit":"",
							"caption":""
						}
					},
					{
						"startDate":"2012,1,21",
						"headline":"Cyclists Say",
						"text":"",
						"asset":
						{
							"media":"http://a.hiphotos.baidu.com/pic/w%3D230/sign=baad99104afbfbeddc59317c48f0f78e/e824b899a9014c088e04208a0b7b02087bf4f4e6.jpg",
							"credit":"",
							"caption":"Video script, production, and editing by Allen Krughoff of Hardcastle Photography"
						}
					},
					{
						"startDate":"2011,12,30",
						"headline":"Yogis Say",
						"text":"",
						"asset":
						{
							"media":"http://d.hiphotos.baidu.com/pic/w%3D230/sign=b9e69df12c738bd4c421b532918b876c/4e4a20a4462309f7f3004f3e700e0cf3d7cad6ab.jpg",
							"credit":"",
							"caption":""
						}
					},




					{
						"startDate":"2012,1,18",
						"headline":"New Yorkers Say",
						"text":"",
						"asset":
						{
							"media":"http://b.hiphotos.baidu.com/pic/w%3D230/sign=36a52d971b4c510faec4e51950582528/4a36acaf2edda3cccd384b7f00e93901203f9295.jpg",
							"credit":"",
							"caption":"Directed and Edited by Matt Mayer, Produced by Seth Keim, Written by Eliot Glazer. Featuring Eliot and Ilana Glazer, who are siblings, not married."
						}
					}
				]
			}
		 };
	  
  
	var timelineOptions= {
         width: "100%",
         height: "100%",
         source: data,
		 container: "timeline"
    }

	//drawRadarChart(radarOptions);
    $("#timeline").timeline(timelineOptions);
  }
);