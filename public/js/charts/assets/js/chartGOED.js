




/*
 cycle.js
 2016-05-01
 Public Domain.
 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html
 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.
 */

/*jslint eval, for */

/*property
 $ref, decycle, forEach, isArray, keys, length, push, retrocycle, stringify,
 test
 */

if (typeof JSON.decycle !== "function") {
	JSON.decycle = function decycle(object, replacer) {
		"use strict";

// Make a deep copy of an object or array, assuring that there is at most
// one instance of each object or array in the resulting structure. The
// duplicate references (which might be forming cycles) are replaced with
// an object of the form

//      {"$ref": PATH}

// where the PATH is a JSONPath string that locates the first occurance.

// So,

//      var a = [];
//      a[0] = a;
//      return JSON.stringify(JSON.decycle(a));

// produces the string '[{"$ref":"$"}]'.

// If a replacer function is provided, then it will be called for each value.
// A replacer function receives a value and returns a replacement value.

// JSONPath is used to locate the unique object. $ indicates the top level of
// the object or array. [NUMBER] or [STRING] indicates a child element or
// property.

		var objects = [];   // Keep a reference to each unique object or array
		var paths = [];     // Keep the path to each unique object or array

		return (function derez(value, path) {

// The derez function recurses through the object, producing the deep copy.

			var i;          // The loop counter
			var nu;         // The new object or array

// If a replacer function was provided, then call it to get a replacement value.

			if (replacer !== undefined) {
				value = replacer(value);
			}

// typeof null === "object", so go on if this value is really an object but not
// one of the weird builtin objects.

			if (
				typeof value === "object" && value !== null &&
				!(value instanceof Boolean) &&
				!(value instanceof Date) &&
				!(value instanceof Number) &&
				!(value instanceof RegExp) &&
				!(value instanceof String)
			) {

// If the value is an object or array, look to see if we have already
// encountered it. If so, return a {"$ref":PATH} object. This is a hard
// linear search that will get slower as the number of unique objects grows.
// Someday, this should be replaced with an ES6 WeakMap.

				i = objects.indexOf(value);
				if (i >= 0) {
					return {$ref: paths[i]};
				}

// Otherwise, accumulate the unique value and its path.

				objects.push(value);
				paths.push(path);

// If it is an array, replicate the array.

				if (Array.isArray(value)) {
					nu = [];
					value.forEach(function (element, i) {
						nu[i] = derez(element, path + "[" + i + "]");
					});
				} else {

// If it is an object, replicate the object.

					nu = {};
					Object.keys(value).forEach(function (name) {
						nu[name] = derez(
							value[name],
							path + "[" + JSON.stringify(name) + "]"
						);
					});
				}
				return nu;
			}
			return value;
		}(object, "$"));
	};
}


if (typeof JSON.retrocycle !== "function") {
	JSON.retrocycle = function retrocycle($) {
		"use strict";

// Restore an object that was reduced by decycle. Members whose values are
// objects of the form
//      {$ref: PATH}
// are replaced with references to the value found by the PATH. This will
// restore cycles. The object will be mutated.

// The eval function is used to locate the values described by a PATH. The
// root object is kept in a $ variable. A regular expression is used to
// assure that the PATH is extremely well formed. The regexp contains nested
// * quantifiers. That has been known to have extremely bad performance
// problems on some browsers for very long strings. A PATH is expected to be
// reasonably short. A PATH is allowed to belong to a very restricted subset of
// Goessner's JSONPath.

// So,
//      var s = '[{"$ref":"$"}]';
//      return JSON.retrocycle(JSON.parse(s));
// produces an array containing a single element which is the array itself.

		var px = /^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;

		(function rez(value) {

// The rez function walks recursively through the object looking for $ref
// properties. When it finds one that has a value that is a path, then it
// replaces the $ref object with a reference to the value that is found by
// the path.

			if (value && typeof value === "object") {
				if (Array.isArray(value)) {
					value.forEach(function (element, i) {
						if (typeof element === "object" && element !== null) {
							var path = element.$ref;
							if (typeof path === "string" && px.test(path)) {
								value[i] = eval(path);
							} else {
								rez(element);
							}
						}
					});
				} else {
					Object.keys(value).forEach(function (name) {
						var item = value[name];
						if (typeof item === "object" && item !== null) {
							var path = item.$ref;
							if (typeof path === "string" && px.test(path)) {
								value[name] = eval(path);
							} else {
								rez(item);
							}
						}
					});
				}
			}
		}($));
		return $;
	};
}



var DEFAULT_DATASET_SIZE = 7;

var addedCount = 0;

var randomMeldingsFrequentie = function() {
	return (Math.random() * 3).toFixed(1); //0 3
};

var randomVerzuimPercentage = function() {
	return (Math.random() * 11).toFixed(1); //0 11
};

var randomScalingFactor = function() {
	return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
};
var randomColorFactor = function() {
	return Math.floor((Math.random() * 255) + 50);
	//return Math.round(Math.random() * 255);
};
var randomColor = function(opacity) {
	if(opacity === undefined) { opacity = 1; }
	//return 'red';
	return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ','+opacity+')';
};
var randomColorHover = function(opacity) {
	if(opacity === undefined) { opacity = 1; }
	var rbg = [randomColorFactor(),randomColorFactor(),randomColorFactor()];
	return [
		'rgba(' + rbg[0] + ',' + rbg[1] + ',' + rbg[2] + ','+opacity+')',
		'rgba(' + rbg[0] + ',' + rbg[1] + ',' + rbg[2] + ',0.8)'

	];
};
/*        */

//verzuimvenster config


var newConfig = {
	beleid: false,
	brancheAverage:{
		display:false,
		crossColor:'gray',
		crossIndex: [0.7,4],
		crossLineWidth:2,
		displayText:true,
		displayTextColor:'gray',
		displayTextValue: 'init branchegemiddelde',
	},
	target:{
		display:true,
		crossColor:'red',
		crossIndex: [1,10],//to do
		crossLineWidth:4,
		displayText:true,
		displayTextColor:'red',
		displayTextValue: 'init doelstelling'
	}
}

var newChart = {chart:{
		name:'initName',
		label:'initLabel',
		description:'initName'
	},
	config: newConfig
}

//console.info(newChart);

var opacity = 0.3;
var pink0 = ['#e31b90','227,27,144','1'];
var pink = ['#ef59a1','239,89,161',opacity];
var pink2 = ['#ce479a','206,71,154','1'];


var dblue = ['#168ece','22,142,206',opacity];
var lblue = ['#00baf2','0,186,242',opacity];
var green = ['#1ab26b','26,178,107',opacity];
var yellow = ['#d4e15b','212,225,91','0.15'];
var purple = ['#be55a0','190,85,160',opacity];


window.onload = function() {

	function setCross(ctx, index, that, chart, pConfig) {
		ctx.save();
		ctx.beginPath;
		originalLineDraw.apply(that, arguments);

		var xaxis = chart.scales['x-axis-0'];
		var yaxis = chart.scales['y-axis-0'];
		var test = yaxis.getPixelForValue(index[1]);

		ctx.strokeStyle = pConfig.crossColor;
		ctx.lineWidth = pConfig.crossLineWidth;

		//horizontal line
		ctx.moveTo(yaxis.right, test);
		ctx.lineTo(xaxis.right, test);

		//text for line
		if (pConfig.displayText){
			ctx.fillStyle = pConfig.displayTextColor;
			ctx.fillText(''+pConfig.displayTextValue+'', (xaxis.getPixelForValue(index[0])+10), test-20);
		}
		//vertical line
		ctx.moveTo(xaxis.getPixelForValue(index[0]), yaxis.getPixelForTick(0));
		ctx.lineTo(xaxis.getPixelForValue(index[0]), yaxis.bottom);

		ctx.stroke();
		ctx.restore();
	}

	var $progress = $('#animationProgress');
	var originalLineDraw = Chart.controllers.line.prototype.draw;
	var cnt = 0;

	//teken de kruizen en apply to orginal data (de bollen dus)
	var drawCrossAndApplyToOriginalLineDraw = Chart.helpers.extend(Chart.controllers.line.prototype, {
		draw: function() {

			var chart = this.chart;
			var ctx = chart.chart.ctx;

			//laatste dataset is used for cross
			if (chart.config.data.datasets.length == (this.index + 1)) {
				ctx.globalCompositeOperation = "source-over";

				//doelstelling
				//console.info(window.testx.config.target.crossIndex);
				if (window.testx.config.target.display){
					setCross(ctx, window.testx.config.target.crossIndex, this, chart,window.testx.config.target);
				}
				//branche gemiddelde
				if (window.testx.config.brancheAverage.display){
					setCross(ctx, window.testx.config.brancheAverage.crossIndex, this, chart,window.testx.config.brancheAverage);
				}
			} else {
				//voeg orginele data toe (de bollen dus..)
				ctx.globalCompositeOperation = "source-over";
				originalLineDraw.apply(this, arguments);
			}
			cnt++;
			return true;
		}
	});




//TODO
	/*
	 Maximum call stack size exceeded

	 function saveChartData1(initData){
	 function replacer3(i, val) {
	 if ( i === '_meta' ) { // identity operator and index in quotes
	 //return 'TONNTMETA'; // attempt to remove from result
	 } else if ( i == 1 ) { // equality operator and numeric version of index
	 return val;
	 } else {
	 return val; // return unchanged
	 }
	 }
	 //window.testx.config.chartConfig.brancheAverage.crossIndex
	 //var dataAsObject = window.myBar.data;
	 var dataAsObject = initData;
	 var dataAsJson = ''+JSON.stringify(JSON.decycle(dataAsObject),replacer3)+'';
	 //console.warn(window.saveDataAsJson);
	 //var saveDataAsObject = JSON.parse(window.saveDataAsJson);
	 //console.warn(saveDataAsObject);

	 return dataAsJson;
	 }


	 var initData1 = saveChartData1(initData);
	 initData1 = JSON.parse(initData1);
	 console.info(initData1);

	 config:initData

	 watch:{
	 config: {
	 handler: function (val, oldVal) {
	 console.log('new: %s, old: %s', val, oldVal)
	 },
	 deep: true
	 }
	 },


	 */

	//http://microbuilder.io/blog/2016/01/10/plotting-json-data-with-chart-js.html
	var initData = {
		datasets: [{
			label: "Afdeling 1",
			backgroundColor: pink[0],//randomColor
			pointStyle: 'circle',
			//pointBackgroundColor: '#ff0',
			//pointHoverBackgroundColor: 'red',
			data: [{
				x: 0.8,
				y: 8
				//,r: 1
			}],
			pointRadius: 15,
			pointHoverRadius: 15,
			fill: false,
			spanGaps: false,
			borderWidth: 1
		}, {
			//backgroundColor: '#ff0',
			xcccradius: 12,
			//pointRadius: 50,
			//pointHoverRadius: 20,
			pointStyle: 'circle',
			//pointBackgroundColor: '#ff0',
			label: "Afdeling 2",
			backgroundColor: lblue[0],
			data: [{
				x: 1.8,
				y: 5
				//,r: 1
			}],
			pointRadius: 15,
			pointHoverRadius: 15,
			spanGaps: false,
			fill: false,
			borderWidth: 1
		}, {
			//backgroundColor: '#ff0',
			//borderColor: '#0000ff',
			label: "Afdeling 3",
			backgroundColor: green[0],
			//pointStyle: 'circle',
			//pointBackgroundColor: '#ff0',
			//pointBorderColor: '#0000ff',
			//radius
			//pointRadius: 20,
			//pointHoverRadius: 20,
			//pointRadius: 10,
			data: [{
				x: 1.6,
				y: 2
				//,r: 0
			}],
			spanGaps: false,
			pointRadius: 15,
			pointHoverRadius: 15,
			fill: false,
			borderWidth: 1
		}, {
			backgroundColor: 'yellow',
			borderColor: 'yellow',
			label: "dummy cross",
			pointStyle: 'circle',
			pointBackgroundColor: 'yellow',
			pointBorderColor: 'yellow',
			//pointRadius: 15,
			//pointHoverRadius: 10,
			data: [{
				x: 1.4,
				y: 5,
				r: 1
			}],
			//spanGaps: false,
			fill: true,
			borderWidth: 1
		}],
		lineAtIndex: [1.1, 5] //max 5,100
	}

	//var testChart = newChart;
	newChart.datasets = initData.datasets;
	newChart.thisDataset = initData.datasets[0];
	window.testx = new Vue({
		el: '#chartjs',
		data: newChart,
		watch:{
			'config.beleid': function (val, oldVal) {
				//console.log('new: %s, old: %s', val, oldVal)
				//console.info(this);
				///console.info(window.testx);
				this.updateChart();
			},
			'config.brancheAverage.display': function (val, oldVal) {
				//console.log('new: %s, old: %s', val, oldVal)
				this.updateChart();
			}
		},
		methods: {
			updateChart: function(event) {
				window.myBar.update();
			}
		}
	});

	var config = {
		type: 'line',

		data: initData,
		//wiResize:false,

		//pointHoverRadius:30,
		options: {

			//onResize:function(chart,size) {


			//if
			//console.info('test'+this);
			//alert('test');
			//$('#goalUpdate').trigger('click');
			//return true;
			//console.info(window.myBar);
			//console.warn(chart.draw());
			//chart.update();
			//},
			elements:{
				rectangle:{
					backgroundColor:'green',
				},
				point:{
					backgroundColor: 'red',
					hoverRadius:15,
					radius:15,
					pointHoverBackgroundColor:'blue',
				}
			},
			hover: {
				//enabled:false,
				mode: 'single',
				pointHoverBackgroundColor:'blue',
				animationDuration:1,
				/*onHover: function(e){
				 return false;
				 console.warn(e);
				 }*/
			},
			tooltips: {
				enabled:true,
				mode: 'single', //label
				callbacks:{
					title: function(tooltipItem,data){
						return data.datasets[tooltipItem[0].datasetIndex].label;
					},
					label: function(tooltipItem,data){
						//console.warn(data.datasets[tooltipItem.datasetIndex].data[0].y);
						//console.info(tooltipItem.datasetIndex);

						return data.datasets[tooltipItem.datasetIndex].data[0].y+'% '+data.datasets[tooltipItem.datasetIndex].data[0].x;
					}

				}
			},

			responsive: true,
			responsiveAnimationDuration:0,

			animation: {
				easing: 'easeOutQuart',
				duration: 500,
				onProgress: function(animation) {
					var chart = this.chart;
					var ctx = chart.ctx;
					//console.info(animation.animationObject.currentStep);
					getVerzuim(this);
					if (animation.animationObject.currentStep == 1) {
						//getVerzuim(this);
					}
					if (animation.animationObject.currentStep == animation.animationObject.numSteps) {

						//console.info('sdfafasd');
						//getVerzuim(this);

					}
					//console.info(animation.animationObject.currentStep);

					//console.warn(this.scales['x-axis-0']);
					//console.log(this.scales['x-axis-0']);
					//getVerzuim(this);
					//ctx.globalCompositeOperation = "destination-over";
					//ctx.fillStyle = "green";
					//ctx.fillRect(60, 20, 200, 340);
					$progress.attr({
						value: animation.animationObject.currentStep / animation.animationObject.numSteps,
					});
				},
				onComplete: function(animation) {
					//console.warn('complete');
					//console.info(this);
					//getVerzuim(this);
					//console.info('animation complete');
					//$('#goalUpdate').trigger('click');
					//console.info(window.myBar);
					//window.myBar.update();
					return true;
					var chart = this.chart;
					var ctx = chart.ctx;


				}
			},
			legend: {
				position: 'right',
				labels: {
					//fontColor: '#FF0000',
				},
				onClick: function(event, legendItem) {
					//return true;
					//windows.config.datasets
					//window.testx.thisDataset = testx.datazet[legendItem.datasetIndex];
					window.testx.thisDataset = window.testx.datasets[legendItem.datasetIndex];

					original.call(this, event, legendItem);
					return true;
				}
			},
			scales: {
				yAxes: [{
					reverse: false,
					scaleLabel: {
						display: true,
						labelString: 'Verzuimpercentage'
						//,fontColor: '#ff0000'
					},
					type: 'linear',
					gridLines: {
						offsetGridLines: false,
						//lineWidth:4
					},
					ticks: {
						max: 11,
						// Create scientific notation labels
						showLabelBackdrop: true,
						//min:0,
						beginAtZero: true,
						//backdropPaddingY:150,
						stepSize: 1,
						callback: function(value, index, values) {
							return value + '%';
							//return value.toExponential();
						}
					}
				}],
				xAxes: [{
					reverse: false,
					//stacked: true,
					scaleLabel: {
						display: true,
						labelString: 'Meldingsfrequentie'
					},
					type: 'linear', //logarithmic
					position: 'bottom',
					ticks: {
						max: 3,
						stepSize: 0.2,
						// Create scientific notation labels
						beginAtZero: true,
						callback: function(value, index, values) {
							return (value.toFixed(1));
							//return parseFloat(value);
							//return value.toExponential();
						}
					}
				}]
			}
		}
	};

	var ctx = document.getElementById("canvas").getContext("2d");
	var original = Chart.defaults.global.legend.onClick;

	window.myBar = new Chart(ctx, config);
























	$('#baDisplayTextValue').keyup(function() {
		console.info('changetest key up');
		updateGoal();
	});

	$('#dvp, #dmf,#bavp, #bamf,#beleidCheckbox,#brancheAverageCheckbox').change(function() {
		console.info('niet vuejs');
		updateGoal();
	});

	$('#loadData').click(function() {
		//var background = randomColor(0.5);
		//var cnt = config.data.datasets.length;
		loadData();
	});



	//$('#newData').click(function() {
		//alert('new data');
		//console.info(submitAjaxRequest);

	//});

	function loadData(){

		//window.myBar.update();




/*
		//chartjs
		window.testx.thisDataset = newChart.datasets[0];
		window.testx.chart	= newChart;
		window.testx.config	= newChart.config;
		window.testx.datasets = newChart.datasets;

		window.myBar.data.datasets = newChart.datasets;
		//window.myBar.data.config = chartAsObject.config.config; //chartAsObject.config = {config:'',datasets:''}

		window.myBar.update();

		return true;
*/


		var initData = {"datasets":[{"backgroundColor":"yellow","borderColor":"yellow","label":"afdelojg 1","pointStyle":"circle","pointBackgroundColor":"yellow","pointBorderColor":"yellow","data":[{"x":1.4,"y":5,"r":1}],"fill":true,"borderWidth":1},{"backgroundColor":"yellow","borderColor":"yellow","label":"dummy cross","pointStyle":"circle","pointBackgroundColor":"yellow","pointBorderColor":"yellow","data":[{"x":1.4,"y":5,"r":1}],"fill":true,"borderWidth":1}],"config":{"beleid":false,"brancheAverage":{"display":false,"crossColor":"gray","crossIndex":[0.7,4],"crossLineWidth":2,"displayText":true,"displayTextColor":"gray","displayTextValue":"init branchegemiddelde"},"target":{"display":true,"crossColor":"red","crossIndex":["1.6",6],"crossLineWidth":4,"displayText":true,"displayTextColor":"red","displayTextValue":"initxxx doelstelling"}}}







		//window.myBar.update();
		//return true;



		//window.myDataAsJson = {"datasets":[{"label":"Afdeling 1","backgroundColor":"#ef59a1","pointStyle":"circle","data":[{"x":1.925,"y":8}],"pointRadius":15,"pointHoverRadius":15,"fill":false,"spanGaps":false,"borderWidth":1},{"xcccradius":12,"pointStyle":"circle","label":"Afdeling 2","backgroundColor":"#00baf2","data":[{"x":1.8,"y":5}],"pointRadius":15,"pointHoverRadius":15,"spanGaps":false,"fill":false,"borderWidth":1},{"label":"Afdeling 3","backgroundColor":"#1ab26b","data":[{"x":1.6,"y":2}],"spanGaps":false,"pointRadius":15,"pointHoverRadius":15,"fill":false,"borderWidth":1},{"backgroundColor":"yellow","borderColor":"yellow","label":"Afdeling 4","pointStyle":"circle","pointBackgroundColor":"yellow","pointBorderColor":"yellow","data":[{"x":1.4,"y":5,"r":1}],"fill":true,"borderWidth":1}],"lineAtIndex":[2.1,8]};
		//sync data with vuejs

		//TODO  lineAtIndex
		//window.testx.datazet = myDataAsJson.datasets;
		//activate first data from dataset
		var chart = {"name":"loadName"}
		window.testx.chart = chart;
		window.testx.thisDataset = initData.datasets[0];
		window.testx.datasets = initData.datasets;
		window.testx.config = initData.config;
		//load data in charts object
		window.myBar.data.datasets = initData.datasets;

		//window.myBar.data.lineAtIndex = myDataAsJson.lineAtIndex;
		window.myBar.update();
	}



	$('#getData1,#getData2').click(function() {
		//var background = randomColor(0.5);
		//var cnt = config.data.datasets.length;
		//console.info(this);
		//console.info($(this).attr('value'));
		chartId = $(this).attr('value');
		getConfig(chartId);
	});

	$('#getData').click(function() {
		//var background = randomColor(0.5);
		//var cnt = config.data.datasets.length;
		//console.info(this);
		//console.info($(this).attr('value'));

		chartId = $('#chart_id').val();
		getConfig(chartId);
	});

	$('#getVerzuimvensters').click(function() {
		//chartId = $('#chart_id').val();
		var retval = getVerzuimvensters();
		console.info(retval);
	});





	window.loadChartData = function loadChartData(chart){
		//window.myDataAsJson = {"datasets":[{"label":"Afdeling 1","backgroundColor":"#ef59a1","pointStyle":"circle","data":[{"x":1.925,"y":8}],"pointRadius":15,"pointHoverRadius":15,"fill":false,"spanGaps":false,"borderWidth":1},{"xcccradius":12,"pointStyle":"circle","label":"Afdeling 2","backgroundColor":"#00baf2","data":[{"x":1.8,"y":5}],"pointRadius":15,"pointHoverRadius":15,"spanGaps":false,"fill":false,"borderWidth":1},{"label":"Afdeling 3","backgroundColor":"#1ab26b","data":[{"x":1.6,"y":2}],"spanGaps":false,"pointRadius":15,"pointHoverRadius":15,"fill":false,"borderWidth":1},{"backgroundColor":"yellow","borderColor":"yellow","label":"Afdeling 4","pointStyle":"circle","pointBackgroundColor":"yellow","pointBorderColor":"yellow","data":[{"x":1.4,"y":5,"r":1}],"fill":true,"borderWidth":1}],"lineAtIndex":[2.1,8]};
		if (chart === undefined){
			alert('congi undefined');
			return false;
		}

		//console.info(chart);

		//console.info(chart);

		//JSON.parse(chart.config);
		var chartAsObject = (chart);
		chartAsObject.config = JSON.parse(chart.config);

		//console.info(chartAsObject);
		//vuejs
		window.testx.thisDataset = chartAsObject.config.datasets[0];
		window.testx.chart	= chartAsObject;
		window.testx.config	= chartAsObject.config.config;
		window.testx.datasets = chartAsObject.config.datasets;


		//data: newChart,

		console.info(chartAsObject.config.datasets[0].label);
//HIER HIER HIER::
//		console.info(window.testx.config.target.crossIndex);

		//chartjs
		window.myBar.data.datasets = chartAsObject.config.datasets;
		//window.myBar.data.config = chartAsObject.config.config; //chartAsObject.config = {config:'',datasets:''}

		window.myBar.update();
		//console.warn('false');
	}


	$('#saveData').click(function() {
		saveData();
	});

	window.saveChartData = function saveChartData(){
		function replacer3(i, val) {
			if ( i === '_meta' ) { // identity operator and index in quotes
				//return 'TONNTMETA'; // attempt to remove from result
			} else if ( i == 1 ) { // equality operator and numeric version of index
				return val;
			} else {
				return val; // return unchanged
			}
		}

		var dataAsObject = window.testx.datasets; //all data
		var test = {"datasets":dataAsObject,"config":window.testx.config};

		var dataAsJson = ''+JSON.stringify(JSON.decycle(test),replacer3)+'';
		return dataAsJson;
	}


	//wrong name chart update
	$('#goalUpdate').click(function() {
		updateGoal();
	});

	$('#addDataset').click(function() {
		var cnt = config.data.datasets.length;
		console.info(cnt);
		var randomColors = randomColorHover();
		color = randomColors[0];
		hoverColor = randomColors[1];
		var newDataset = {
			label: 'afdeling ' + config.data.datasets.length,
			backgroundColor: color, //legendItem
			//backgroundColor: "#000",
			pointStyle: 'circle',
			pointBackgroundColor: color,
			pointHoverBackgroundColor: hoverColor,
			//radius: 12,
			data: [{
				x: randomMeldingsFrequentie(),
				y: randomVerzuimPercentage(),
				r: 1
			}],
			fill: false,
			//spanGaps: false,
			borderWidth: 1
		}

		//dummy for cross
		var lastSet = config.data.datasets[config.data.datasets.length-1];

		//for (var index = 0; index < (config.data.datasets.length); ++index) {
		//newDataset.data.push(randomScalingFactor());
		//}

		//synced met window.testx
		window.myBar.data.datasets[cnt-1] = newDataset;
		window.testx.thisDataset = window.myBar.data.datasets[cnt-1];

		//window.testx.thisDataset = newDataset;

		window.myBar.data.datasets.push(lastSet);

		//window.testx.datasets
		//window.testx.datasets.push(lastSet);

		window.myBar.update();
		return true;


		config.data.datasets[config.data.datasets.length-1] = newDataset;

		window.testx.datasets[config.data.datasets.length-1] = newDataset;

		//window.testx.thisDataset = testx.datazet[config.data.datasets.length-1];
		window.testx.thisDataset = window.testx.datasets[config.data.datasets.length-1];

		window.testx.datasets.push(lastSet);

		window.myBar.update();
	});

	$('#removeDataset').click(function(evt) {
		//for (var i = 0; i < config.data.datasets.length;++i){
		//        console.info(config.data.datasets[i]);
		//}

		if (window.testx.datasets.length == 1){
			alert('cross delete!!!');
			return false;
		}

		//for (var i = 0; i < window.testx.datazet.length;++i){
		//    console.info(window.testx.datazet[i]._meta[0].dataset._datasetIndex+' - '+window.testx.datazet[i].label);
		//}

		var activeIndex = window.testx.thisDataset._meta[0].dataset._datasetIndex;
		//config.data.datasets.splice(activeIndex, 1);
		//console.info('delete: '+activeIndex+' -> '+ window.testx.thisDataset.label +'');

		//delete active dataset
		config.data.datasets.splice(activeIndex, 1);

		//select another dataset
		var newActiveIndex = (activeIndex == 0 ? 0 : activeIndex-1);
		window.testx.thisDataset = window.testx.datasets[newActiveIndex];
		//console.info('newSelect: '+newActiveIndex+' -> '+ window.testx.thisDataset.label +'');

		window.myBar.update();
	});

	function updateGoal() {


		alert('weg');
		//mag ook:
		//vvConfig.brancheAverage.display = $('#brancheAverageCheckbox').prop('checked');
		//vvConfig.beleid = $('#beleidCheckbox').prop('checked');


		window.testx.config.chartConfig.beleid = $('#beleidCheckbox').prop('checked');
		window.testx.config.chartConfig.brancheAverage.display = $('#brancheAverageCheckbox').prop('checked');
		//brancheAverageCheckbox
		window.myBar.update();
		return true;
	}


	//canvas.onresize = function(evt){
	//	console.info('onResize');
	//}

	canvas.onclick = function(evt) {
		var points = window.myBar.getDatasetAtEvent(evt);
		//console.warn('test: '+points.length);

		//point clicked
		if (points.length == 1){
			window.testx.thisDataset = window.testx.datasets[points[0]._datasetIndex];
		}
		//legend clicked?
		else{

		}
	};

	$(window).bind('resize', function(e)
	{
		window.resizeEvt;
		$(window).resize(function()
		{
			clearTimeout(window.resizeEvt);
			window.resizeEvt = setTimeout(function()
			{
				//console.info('reize end');
				//console.warn(window.myBar.update());
				window.myBar.update();
				//;
				//code to do after window is resized
			}, 750);
		});
		return true;
	});


	//to do vuejs
	/*
	 document.getElementById('dmf').value = myData.lineAtIndex[0];
	 document.getElementById('dvp').value = myData.lineAtIndex[1];

	 document.getElementById('bamf').value = vvConfig.brancheAverage.crossIndex[0];
	 document.getElementById('bavp').value = vvConfig.brancheAverage.crossIndex[1];
	 document.getElementById('baDisplayTextValue').value = vvConfig.brancheAverage.displayTextValue;
	 */

}//end window.onload
