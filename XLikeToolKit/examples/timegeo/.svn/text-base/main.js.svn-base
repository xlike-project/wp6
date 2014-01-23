require.config({
　paths: {
    "jquery": "../../libs/jquery-1.8.2.min",
    "jquery-ui": "../../libs/jquery-ui-1.9.2.min",
    "d3": "../../libs/d3.v3.min",
    "json": "../../libs/json2",
    //"TimeGeo": "../../libs/TimeGeoChart",
    "toolkit": "../../build/jquery.xlike-toolkit.min"
  }
});

/**
* Radar module
*/
require(["jquery", "jquery-ui", "d3", "json", "toolkit"], 
  function() {
	var timegeodata = {
		"articles": [{
			"id": 634896,
			"url": "http://www.dailytimes.com.pk/default.asp?page=2013%255c12%255c10%255cstory_10-12-2013_pg7_12",
			"title": "Nai Gaj dam project's benefits and public grievances",
			"language": "eng",
			"date": "2013-12-10",
			"source": "www.dailytimes.com.pk",
			"country": "Pakistan",
			"city": "",
			"location": [30, 70]
		},
		{
			"id": 634784,
			"url": "http://www.al.com/opinion/index.ssf/2013/12/unemployment_is_high_because_w.html",
			"title": "Unemployment is high because we have more people than jobs (Your view)",
			"language": "eng",
			"date": "2013-12-10",
			"source": "www.al.com",
			"country": "United States",
			"city": "",
			"location": [38, -97]
		},
		{
			"id": 634653,
			"url": "http://www.wbng.com/news/video/Impact-Project-repairs-Marys-home--235114951.html",
			"title": "Impact Project repairs Mary's home",
			"language": "eng",
			"date": "2013-12-10",
			"source": "WBNG TV 12",
			"country": "USA",
			"city": "Binghamton",
			"location": [42.098679, -75.91127]
		},
		{
			"id": 634469,
			"url": "http://www.freep.com/article/20131209/NEWS05/312090132/1001/news",
			"title": "Fabric from a Wright Brothers plane finds home at the Henry Ford",
			"language": "eng",
			"date": "2013-12-11",
			"source": "Detroit Free Press",
			"country": "USA",
			"city": "Detroit",
			"location": [42.33168, -83.04792]
		},
		{
			"id": 634077,
			"url": "http://www.wbng.com/video/Impact-Project-repairs-Marys-home--235114951.html",
			"title": "Impact Project repairs Mary's home",
			"language": "eng",
			"date": "2013-12-11",
			"source": "WBNG TV 12",
			"country": "USA",
			"city": "Binghamton",
			"location": [42.098679, -75.91127]
		},
		{
			"id": 634014,
			"url": "http://www.kdlt.com/index.php?option=com_content&task=view&id=32046&Itemid=57",
			"title": "Water Restrictions Continue In Brandon",
			"language": "eng",
			"date": "2013-12-11",
			"source": "KDLT TV 5",
			"country": "USA",
			"city": "Sioux Falls",
			"location": [43.545349, -96.731277]
		},
		{
			"id": 633700,
			"url": "http://www.hanfordsentinel.com/news/national/statement-of-american-detained-in-north-korea/article_9a14e00f-9c2c-5ebb-943b-cbd74fe9df01.html",
			"title": "Statement of American detained in North Korea",
			"language": "eng",
			"date": "2013-12-11",
			"source": "Hanford Sentinel",
			"country": "USA",
			"city": "Hanford",
			"location": [36.327171, -119.645798]
		},
		{
			"id": 633635,
			"url": "http://www.nbc15.com/home/headlines/Madison-Water-Utility-reminds-customers-to-prepare-pipes-for-cold-weather-234772681.html",
			"title": "Madison Water Utility reminds customers to prepare pipes for cold weather",
			"language": "eng",
			"date": "2013-12-11",
			"source": "WMTV TV 15",
			"country": "USA",
			"city": "Madison",
			"location": [43.072948, -89.386688]
		},
		{
			"id": 633587,
			"url": "http://www.hoy.es/v/20131210/badajoz/obras-azud-granadilla-bajan-20131210.html?utm_source=hoy.es&utm_medium=rss&utm_content=ultima-rss&utm_campaign=traffic-rss",
			"title": "Las obras del azud de la Granadilla bajan el nivel del curso del r铆o",
			"language": "spa",
			"date": "2013-12-11",
			"source": "Hoy Extremadura",
			"country": "Spain",
			"city": "Badajoz",
			"location": [38.874828, -6.97262]
		},
		{
			"id": 633468,
			"url": "http://www.deccanherald.com/content/373705/sir-alec-man-saw-beyond.html",
			"title": "Sir Alec: The man who saw beyond",
			"language": "eng",
			"date": "2013-12-11",
			"source": "Deccan Herald",
			"country": "India",
			"city": "Bangalore",
			"location": [12.9558, 77.620979]
		},
		{
			"id": 633445,
			"url": "http://www.nst.com.my/nation/general/terengganu-to-get-free-wi-fi-1.427449?localLinksEnabled=false",
			"title": "Terengganu to get free Wi-Fi",
			"language": "eng",
			"date": "2013-12-11",
			"source": "New Straits Times",
			"country": "Malaysia",
			"city": "Kuala Lumpur",
			"location": [3.94515, 114.401657]
		},
		{
			"id": 633408,
			"url": "http://www.nst.com.my/nation/general/civil-servants-pitch-in-1.427477?localLinksEnabled=false",
			"title": "Civil servants pitch in",
			"language": "eng",
			"date": "2013-12-12",
			"source": "New Straits Times",
			"country": "Malaysia",
			"city": "Kuala Lumpur",
			"location": [3.94515, 114.401657]
		},
		{
			"id": 633397,
			"url": "http://www.nst.com.my/nation/general/disaster-fund-gets-rm75-300-boost-1.427639?localLinksEnabled=false",
			"title": "Disaster fund gets RM75,300 boost",
			"language": "eng",
			"date": "2013-12-15",
			"source": "New Straits Times",
			"country": "Malaysia",
			"city": "Kuala Lumpur",
			"location": [3.94515, 114.401657]
		},
		{
			"id": 633338,
			"url": "http://www.nst.com.my/nation/general/narrow-escape-for-aid-workers-1.427474?localLinksEnabled=false",
			"title": "Narrow escape for aid workers",
			"language": "eng",
			"date": "2013-12-18",
			"source": "New Straits Times",
			"country": "Malaysia",
			"city": "Kuala Lumpur",
			"location": [3.94515, 114.401657]
		},
		{
			"id": 633286,
			"url": "http://www.financeasia.com/News/367012%2Cassessing-catastrophe.aspx",
			"title": "Assessing catastrophe",
			"language": "eng",
			"date": "2013-12-18",
			"source": "FinanceAsia magazine",
			"country": "China",
			"city": "",
			"location": [36.894451, 104.165649]
		},
		{
			"id": 633228,
			"url": "http://www.nydailynews.com/new-york/son-retired-firefighter-leukemia-return-remission-article-1.1542655",
			"title": "Son of retired firefighter has leukemia return after remission",
			"language": "eng",
			"date": "2013-12-18",
			"source": "www.nydailynews.com",
			"country": "United States",
			"city": "",
			"location": [38, -97]
		},
		{
			"id": 633087,
			"url": "http://thehimalayantimes.com/rssReference.php?headline=Shares%2Bof%2BKist%2BBank%2Bstart%2Btrading%2Bon%2Bstock%2Bmarket&NewsID=399107",
			"title": "Shares of Kist Bank start trading on stock market",
			"language": "eng",
			"date": "2013-12-18",
			"source": "thehimalayantimes.com",
			"country": "Nepal",
			"city": "Kathmandu",
			"location": [27.702, 85.317497]
		},
		{
			"id": 632840,
			"url": "http://www.reviewjournal.com/news/american-detained-north-korea-confession-coerced",
			"title": "American detained: North Korea confession coerced | Las Vegas Review-Journal",
			"language": "eng",
			"date": "2013-12-18",
			"source": "www.reviewjournal.com",
			"country": null,
			"city": null,
			"location": null
		},
		{
			"id": 632700,
			"url": "http://www.nbcnews.com/id/53784830/ns/local_news-spokane_wa/",
			"title": "No School Monday Or Tuesday At Spokane Valley's Adams Elementary After Pipes Burst",
			"language": "eng",
			"date": "2013-12-18",
			"source": "www.nbcnews.com",
			"country": "United States",
			"city": "",
			"location": [38, -97]
		},
		{
			"id": 632620,
			"url": "http://www.theborneopost.com/2013/12/10/egyptian-physician-impressed-with-malaysian-spirit-of-volunteerism/",
			"title": "Egyptian physician impressed with Malaysian spirit of volunteerism",
			"language": "eng",
			"date": "2013-12-18",
			"source": "Borneo Post",
			"country": "Malaysia",
			"city": "Kuching",
			"location": [1.52019, 110.353661]
		},
		{
			"id": 632568,
			"url": "http://www.theborneopost.com/2013/12/10/siti-nurhaliza-does-her-bit-for-flood-victims/",
			"title": "Siti Nurhaliza does her bit for flood victims",
			"language": "eng",
			"date": "2013-12-20",
			"source": "Borneo Post",
			"country": "Malaysia",
			"city": "Kuching",
			"location": [1.52019, 110.353661]
		},
		{
			"id": 632076,
			"url": "http://www.kait8.com/story/24176193/a-busted-pipe-floods-local-church",
			"title": "A busted pipe floods local church",
			"language": "eng",
			"date": "2013-12-20",
			"source": "www.kait8.com",
			"country": null,
			"city": null,
			"location": null
		},
		{
			"id": 631972,
			"url": "http://wkzo.com/news/articles/2013/dec/09/google-bus-blocked-in-san-francisco-protest-vs-gentrification/",
			"title": "Google bus blocked in San Francisco protest vs gentrification",
			"language": "eng",
			"date": "2013-12-20",
			"source": "wkzo.com",
			"country": null,
			"city": null,
			"location": null
		},
		{
			"id": 631349,
			"url": "http://www.detroitnews.com/article/20131209/SPORTS0103/312090090/1128/rss16",
			"title": "Comerica Park hockey rink close to finished product",
			"language": "eng",
			"date": "2013-12-20",
			"source": "www.detroitnews.com",
			"country": "United States",
			"city": "",
			"location": [38, -97]
		},
		{
			"id": 631011,
			"url": "http://www.kirotv.com/ap/ap/crime/jury-hears-from-ex-cop-charged-in-deadly-shooting/ncF57/",
			"title": "Jury hears ex-cop charged in deadly La. shooting",
			"language": "eng",
			"date": "2013-12-25",
			"source": "KIRO TV 7",
			"country": "USA",
			"city": "Seattle",
			"location": [47.603561, -122.329437]
		},
		{
			"id": 630949,
			"url": "http://www.lep.co.uk/news/flooding-policy-is-backed-by-mp-1-6304083",
			"title": "Flooding policy is backed by MP",
			"language": "eng",
			"date": "2013-12-25",
			"source": "Lancashire Evening Post",
			"country": "United Kingdom",
			"city": "Preston",
			"location": [53.774281, -2.7079]
		},
		{
			"id": 630901,
			"url": "http://www.idahostatesman.com/2013/12/06/2906418/feral-hogs-uproot-sugar-cane-rice.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%253A%2BIdahostatesmancomBusiness%2B%2528IdahoStatesman.com%2BBusiness%2529",
			"title": "Feral hogs uproot sugar cane, rice fields, levees",
			"language": "eng",
			"date": "2013-12-25",
			"source": "Idaho Statesman",
			"country": "USA",
			"city": "Boise",
			"location": [43.606979, -116.193413]
		},
		{
			"id": 630817,
			"url": "http://english.vietnamnet.vn/fms/society/91073/social-headlines-december-10.html",
			"title": "Social Headlines December 10",
			"language": "eng",
			"date": "2013-12-25",
			"source": "english.vietnamnet.vn",
			"country": "Viet Nam",
			"city": "",
			"location": [16.1666666667, 107.833333333]
		},
		{
			"id": 630814,
			"url": "http://www.vancouversun.com/news/First%2BNations%2Bopen%2BHydro%2BSite%2Bhearings%2Bwith%2Bdrums%2Bsinging%2Bwith%2Bvideo/9264681/story.html",
			"title": "First Nations open BC Hydro's Site C dam hearings with drums, singing (with video)",
			"language": "eng",
			"date": "2013-12-25",
			"source": "www.vancouversun.com",
			"country": "Armenia",
			"city": "",
			"location": [40, 45]
		},
		{
			"id": 630693,
			"url": "http://www.globalsecurity.org/military/library/news/2013/12/mil-131209-irin01.htm",
			"title": "Analysis: How to get aid to remote Philippine typhoon survivors",
			"language": "eng",
			"date": "2013-12-25",
			"source": "www.globalsecurity.org",
			"country": null,
			"city": null,
			"location": null
		},
		{
			"id": 630640,
			"url": "http://www.globalsecurity.org/wmd/library/news/ukraine/2013/ukraine-131209-rianovosti02.htm",
			"title": "Police Move Into Central Kiev, Protesters Fear Crackdown",
			"language": "eng",
			"date": "2013-12-25",
			"source": "www.globalsecurity.org",
			"country": null,
			"city": null,
			"location": null
		},
		{
			"id": 630191,
			"url": "http://www.patriotledger.com/topstories/x348815683/Climate-change-talk-Wednesday-in-Cohasset?rssfeed=true&utm_source=dlvr.it&utm_medium=twitter",
			"title": "Climate change talk Wednesday in Cohasset",
			"language": "eng",
			"date": "2013-12-25",
			"source": "www.patriotledger.com",
			"country": "United States",
			"city": "",
			"location": [38, -97]
		},
		{
			"id": 630142,
			"url": "http://themoderatevoice.com/189459/remember-pearl-harbor-3/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%253A%2Bthemoderatevoice%2B%2528The%2BModerate%2BVoice%2529",
			"title": "Remember Pearl Harbor",
			"language": "eng",
			"date": "2013-12-26",
			"source": "Moderate Voice",
			"country": "USA",
			"city": "",
			"location": [37.167931, -95.845016]
		},
		{
			"id": 630135,
			"url": "http://themoderatevoice.com/189461/a-day-that-lives-in-infamy-and-me/?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%253A%2Bthemoderatevoice%2B%2528The%2BModerate%2BVoice%2529",
			"title": "A Day That Lives in Infamy and Me",
			"language": "eng",
			"date": "2013-12-27",
			"source": "Moderate Voice",
			"country": "USA",
			"city": "",
			"location": [37.167931, -95.845016]
		},
		{
			"id": 630037,
			"url": "http://www.newstimes.com/news/crime/article/Jury-hears-ex-cop-charged-in-deadly-La-shooting-5048322.php",
			"title": "Jury hears ex-cop charged in deadly La. shooting",
			"language": "eng",
			"date": "2013-12-27",
			"source": "Danbury News-Times",
			"country": "USA",
			"city": "Danbury",
			"location": [41.392681, -73.45359]
		},
		{
			"id": 629976,
			"url": "http://www.dailystar.co.uk/news/latest-news/354998/180MPH-wind-to-batter-Britain-foresees-worst-Christmas-on-record",
			"title": "180MPH wind to batter Britain as we face worst Christmas on record",
			"language": "eng",
			"date": "2013-12-27",
			"source": "www.dailystar.co.uk",
			"country": "United Kingdom",
			"city": "",
			"location": [54, -2]
		},
		{
			"id": 629952,
			"url": "http://news.yahoo.com/google-bus-blocked-san-francisco-protest-vs-gentrification-231608322--sector.html",
			"title": "Bay Area gentrification battle boils",
			"language": "eng",
			"date": "2013-12-30",
			"source": "Yahoo! News",
			"country": "USA",
			"city": "",
			"location": [37.167931, -95.845016]
		},
		{
			"id": 629924,
			"url": "http://www.khq.com/story/24176091/no-school-monday-or-tuesday-at-spokane-valleys-adams-elementary-after-pipes-burst",
			"title": "No School Monday Or Tuesday At Spokane Valley's Adams Elementary After Pipes Burst",
			"language": "eng",
			"date": "2013-12-30",
			"source": "KHQ TV 6",
			"country": "USA",
			"city": "Spokane",
			"location": [47.657261, -117.412277]
		},
		{
			"id": 629723,
			"url": "http://www.dailycamera.com/ci_24677346/flood-effects-play-out-boulder-countys-holiday-philanthropic?source=rss_emailed",
			"title": "Flood effects play out in Boulder County's holiday philanthropic efforts",
			"language": "eng",
			"date": "2013-12-30",
			"source": "Boulder Daily Camera",
			"country": "USA",
			"city": "Boulder",
			"location": [40.015739, -105.279243]
		},
		{
			"id": 629548,
			"url": "http://www.wbng.com/news/local/Impact-Project-repairs-Marys-home--235114951.html",
			"title": "Impact Project repairs Mary's home",
			"language": "eng",
			"date": "2013-12-30",
			"source": "WBNG TV 12",
			"country": "USA",
			"city": "Binghamton",
			"location": [42.098679, -75.91127]
		},
		{
			"id": 629346,
			"url": "http://io9.com/why-are-black-diamond-truffles-worth-900-per-pound-1479556628?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%253A%2Bio9%252Ffull%2B%2528io9%2529",
			"title": "Why are \"black diamond\" truffles worth $900 per pound?",
			"language": "eng",
			"date": "2013-12-30",
			"source": "io9.com",
			"country": "Hungary",
			"city": "",
			"location": [47, 20]
		},
		{
			"id": 629224,
			"url": "http://www.modbee.com/2013/12/09/3079463/statement-of-american-detained.html#storylink%3Drss",
			"title": "Statement of American detained in North Korea",
			"language": "eng",
			"date": "2013-12-30",
			"source": "Modesto Bee",
			"country": "USA",
			"city": "Modesto",
			"location": [37.638302, -120.999588]
		},
		{
			"id": 629193,
			"url": "http://whtc.com/news/articles/2013/dec/09/google-bus-blocked-in-san-francisco-protest-vs-gentrification/",
			"title": "Google bus blocked in San Francisco protest vs gentrification",
			"language": "eng",
			"date": "2013-12-30",
			"source": "whtc.com",
			"country": "United States",
			"city": "",
			"location": [38, -97]
		},
		{
			"id": 629122,
			"url": "http://wnmtradio.com/news/articles/2013/dec/09/google-bus-blocked-in-san-francisco-protest-vs-gentrification/",
			"title": "Google bus blocked in San Francisco protest vs gentrification",
			"language": "eng",
			"date": "2013-12-30",
			"source": "WMNT AM 650",
			"country": "USA",
			"city": "Hibbing",
			"location": [47.421051, -92.941742]
		},
		{
			"id": 628941,
			"url": "http://edition.cnn.com/2013/12/09/world/asia/north-korea-american-newman/index.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%253A%2Brss%252Fcnn_latest%2B%2528RSS%253A%2BMost%2BRecent%2529",
			"title": "For North Korea, the war isn't over, says freed U.S. vet",
			"language": "eng",
			"date": "2013-12-30",
			"source": "CNN Europe",
			"country": "United Kingdom",
			"city": "",
			"location": [54.314072, -2.23001]
		},
		{
			"id": 628720,
			"url": "http://www.reuters.com/article/2013/12/09/us-google-protest-idUSBRE9B818J20131209?feedType=RSS&feedName=domesticNews",
			"title": "Google bus blocked in San Francisco protest vs gentrification",
			"language": "eng",
			"date": "2013-12-30",
			"source": "Reuters Oddly Enough",
			"country": "United Kingdom",
			"city": "",
			"location": [54.314072, -2.23001]
		},
		{
			"id": 628677,
			"url": "http://au.news.yahoo.com/thewest/business/a/-/tech/20242503/google-bus-blocked-in-san-francisco-protest-vs-gentrification/",
			"title": "Google bus blocked in San Francisco protest vs gentrification (Reuters)",
			"language": "eng",
			"date": "2013-12-30",
			"source": "West Australian",
			"country": "Australia",
			"city": "Perth",
			"location": [ - 31.95302, 115.857239]
		},
		{
			"id": 628204,
			"url": "http://www.beaumontenterprise.com/news/crime/article/Jury-hears-ex-cop-charged-in-deadly-La-shooting-5048322.php",
			"title": "Jury hears ex-cop charged in deadly La. shooting",
			"language": "eng",
			"date": "2013-12-30",
			"source": "Mid County Chronicle",
			"country": "USA",
			"city": "Nederland",
			"location": [29.978331, -93.991898]
		},
		{
			"id": 628135,
			"url": "http://www.focus.lv/content/north-korea-war-isnt-over-says-freed-us-vet",
			"title": "For North Korea, war isn't over, says freed U.S. vet",
			"language": "eng",
			"date": "2013-12-30",
			"source": "www.focus.lv",
			"country": "Latvia",
			"city": "",
			"location": [57, 25]
		},
		{
			"id": 628107,
			"url": "http://globegazette.com/news/national/statement-of-american-detained-in-north-korea/article_58c1f6b9-a029-5a62-bf8b-d4b52fe3933c.html",
			"title": "Statement of American detained in North Korea",
			"language": "eng",
			"date": "2013-12-30",
			"source": "Britt News Tribune",
			"country": "USA",
			"city": "Osage",
			"location": [43.284088, -92.810287]
		}]
	};

	var timegeOptions = {
		data:timegeodata,
		mapOptions: {
			container:"map",
			zoom: 2,
			scrollwheel: true
		},
		timetrendOptions:{
			container: "time_chart",
			width: 900,
			height: 150,
			fontSize: 9,
			title: 'TimeTrend',
			hAxis: {
				title: '',
				logScale: true,
				slantedText: true
			},
			legend: {
				position: 'top',
				textStyle: {
					color: 'black',
					fontSize: 9
				}
			},
			lineWidth: 1,
				tooltip: {
					textStyle: {
						color: 'green'
					},
					showColorCode: true
				},
				vAxis: {
					gridlines: {
						count: 3
					}
				},
				chartArea:{left:55,top:8,right:10,width:'90%',height:'60%'}
			}
	   };
	//drawRadarChart(radarOptions);
     //$("#timegeo").timegeo();
	 
	 $("#timegeo").timegeo(timegeOptions);
  }
);