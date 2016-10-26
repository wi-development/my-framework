
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


    var vvConfig = {
        beleid: false,
        brancheAverage:{
            display:false,
            crossColor:'gray',
            crossIndex: [0.7,4],
            crossLineWidth:2,
            displayText:true,
            displayTextColor:'gray',
            displayTextValue: 'branchegemiddelde',
        },
        target:{
            display:true,
            crossColor:'red',
            crossIndex: [2,2],//to do
            crossLineWidth:4,
            displayText:true,
            displayTextColor:'red',
            displayTextValue: 'doelstelling'
        }
    }





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
        //target§
    	var dvp = document.getElementById('dvp').value;
    	var dmf = document.getElementById('dmf').value;

        //branchegemiddelde
        var bavp = document.getElementById('bavp').value;
        var baDisplayTextValue = document.getElementById('baDisplayTextValue').value;





    	var tonytest = true;



        //config = vvConfig.brancheAverage, vvConfig.target
    	function setCross(ctx, index, that, chart, pConfig) {
    		//return true;

    		//console.warn(ctx);
    		//console.warn(index);
    		//console.warn(that);
    		//console.warn(chart);

    		var qwe = true;
    		//console.info(that);
    		ctx.save();
    		ctx.beginPath;
    		if ((qwe) && (that.index != 114)) {
    			//originalLineDraw.apply(that, arguments);
    			//originalLineDraw.apply(that, arguments);
    			//console.info(originalLineDraw.counter);
    			//console.info(that.chart);
    			//originalLineDraw.apply(that, arguments);
    			//ctx.globalCompositeOperation="overlay";
    			//originalLineDraw.apply(that, arguments);
    			//ctx.globalCompositeOperation="destination-over";
    			//originalLineDraw.apply(that, arguments);
    			//ctx.globalCompositeOperation="source-over";
    			//originalLineDraw.apply(that, arguments);
    			//ctx.globalCompositeOperation="destination-over";
    			//console.warn(arguments);
    			originalLineDraw.apply(that, arguments);
    			//ctx.save();


    			var xaxis = chart.scales['x-axis-0'];
    			var yaxis = chart.scales['y-axis-0'];
    			var test = yaxis.getPixelForValue(index[1]);

    			//ctx.globalCompositeOperation="destination-over";
    			//ctx.save();
    			//ctx.beginPath();



                ctx.strokeStyle = pConfig.crossColor;
    			ctx.lineWidth = pConfig.crossLineWidth;
    			//horizontal line
    			//console.info(yaxis.right+' - '+xaxis.right+' - '+test);

    			//test = test + (((originalLineDraw.counter++)/100));
    			ctx.moveTo(yaxis.right, test);
    			ctx.lineTo(xaxis.right, test);

                if (pConfig.displayText){
                    ctx.fillStyle = pConfig.displayTextColor;
                    ctx.fillText(''+pConfig.displayTextValue+'', (xaxis.getPixelForValue(index[0])+10), test-20);
                }



                //ctx.save();

                ctx.moveTo(xaxis.getPixelForValue(index[0]), yaxis.getPixelForTick(0));
                ctx.lineTo(xaxis.getPixelForValue(index[0]), yaxis.bottom);

    			ctx.stroke();
    			//ctx.closePath();
    			ctx.restore();
    			//originalLineDraw.apply(that, arguments);
    			//originalLineDraw.apply(that, arguments);
    		}
    	}

    	function setCross1x(ctx, index, that, chart) {

    		//return true;
    		//console.warn(ctx);
    		//console.warn(index);
    		//console.warn(that);
    		//console.warn(chart);

    		var qwe = true;
    		//console.info(that);
    		ctx.save();
    		ctx.beginPath;

    		if ((qwe) && (that.index != 4)) {

    			//originalLineDraw.apply(that, arguments);
    			//originalLineDraw.apply(that, arguments);
    			//console.info(originalLineDraw.counter);
    			//console.info(that.chart);
    			//originalLineDraw.apply(that, arguments);
    			//ctx.globalCompositeOperation="overlay";
    			//originalLineDraw.apply(that, arguments);
    			//ctx.globalCompositeOperation="destination-over";
    			//originalLineDraw.apply(that, arguments);
    			//ctx.globalCompositeOperation="source-over";
    			//originalLineDraw.apply(that, arguments);
    			//ctx.globalCompositeOperation="destination-over";
    			console.warn(that);
    			originalLineDraw.apply(chart, arguments);
    			//ctx.save();


    			//var xaxis = chart.scales['x-axis-0'];
    			//var xaxis = that.scales['x-axis-0'];
    			//this.scales['x-axis-0']
    			console.warn('hier-->');
    			var yaxis = chart.scales['y-axis-0'];
    			console.info('hier:');
    			console.info(xaxis);
    			console.info(yaxis);

    			var test = yaxis.getPixelForValue(index[1]);



    			//ctx.globalCompositeOperation="destination-over";
    			//ctx.save();
    			//ctx.beginPath();

    			ctx.strokeStyle = 'red';
    			ctx.lineWidth = 5;
    			//horizontal line
    			//console.info(yaxis.right+' - '+xaxis.right+' - '+test);

    			//test = test + (((originalLineDraw.counter++)/100));
    			ctx.moveTo(yaxis.right, test);
    			ctx.lineTo(xaxis.right, test);
    			//ctx.save();

    			ctx.stroke();
    			//ctx.closePath();
    			ctx.restore();
    			//originalLineDraw.apply(that, arguments);
    			//originalLineDraw.apply(that, arguments);
    		}
    	}


    	var $progress = $('#animationProgress');
    	var originalLineDraw = Chart.controllers.line.prototype.draw;
    	var cnt = 0;
    	var tonntest = Chart.helpers.extend(Chart.controllers.line.prototype, {

    		draw: function() {

    			var chart = this.chart;
                //console.warn(chart);
    			var ctx = chart.chart.ctx;
    			var index = chart.config.data.lineAtIndex;
    			//console.info(chart.config.data.datasets.length);

    			//laatste dataset is used for cros
    			if (chart.config.data.datasets.length == (this.index + 1)) {
    				ctx.globalCompositeOperation = "source-over";
    				//originalLineDraw.apply(this, arguments);

    				//console.info(chart.config.data.datasets[this.index].label);
    				//console.info(chart);
    				//getVerzuim(chart);
    				//var that = chart;
    				//var chart = that.chart;
    				//var ctx = chart.ctx;
                    //console.info(chart);
                    //console.info(index);


                    //brancheAverage
                    if (vvConfig.target.display){
                        setCross(ctx, index, this, chart,vvConfig.target);
                    }
                    //brancheAverage
                    if (vvConfig.brancheAverage.display){
                        setCross(ctx, vvConfig.brancheAverage.crossIndex, this, chart,vvConfig.brancheAverage);
                    }



                    //

    				//ctx.fillStyle = "red";
    				//ctx.fillRect(60, 197, 650, 1);

    			} else {
    				ctx.globalCompositeOperation = "source-over";
    				originalLineDraw.apply(this, arguments);
    			}
    			//                console.info(cnt);
    			cnt++;
    			//console.info(chart.boxes);
    			//ctx.save();
    			//ctx.beginPath();

    			//ctx.globalAlpha = 0.1;
    			//ctx.fillStyle = "violet";
    			//ctx.fillRect(60, 20, 750, 340);
    			//ctx.restore();


    			/*ctx.globalCompositeOperation = "destination-over";
    			ctx.fillStyle = "olive";
    			ctx.fillRect(260, 20, 140, 340);
    			originalLineDraw.apply(this, arguments);

    			ctx.globalCompositeOperation = "destination-over";
    			ctx.fillStyle = "purple";
    			ctx.fillRect(400, 20, 140, 340);
    			originalLineDraw.apply(this, arguments);
                */
    			return true;
    			//console.info(this);
    			//setCross(ctx, index, this, chart);




    			//ctx.globalCompositeOperation="source-over";




    			return true;
    			if (index) {
    				console.info('index');


    				//vertical line
    				//ctx.globalCompositeOperation="source-over";
    				//originalLineDraw.apply(this, arguments);

    				ctx.save();
    				ctx.beginPath();
    				ctx.strokeStyle = 'red';
    				ctx.lineWidth = 5;

    				//verticale line;
    				ctx.moveTo(xaxis.getPixelForValue(index[0]), yaxis.getPixelForTick(0));
    				ctx.lineTo(xaxis.getPixelForValue(index[0]), yaxis.bottom);


    				var test = yaxis.getPixelForValue(index[1]);
    				//horizontal line
    				//ctx.moveTo(yaxis.right, test);
    				//ctx.lineTo(xaxis.right, test);

    				ctx.globalCompositeOperation = "source-over";
    				//ctx.closePath();
    				ctx.stroke();

    				//var test = yaxis.getPixelForValue(index[1]);


    				//horizontal line
    				//ctx.moveTo(yaxis.right, test);
    				//ctx.lineTo(xaxis.right, test);



    			}


    			//ctx.globalCompositeOperation="source-over";
    			return true;






    			var chart = this.chart;
    			var ctx = chart.chart.ctx;
    			var index = chart.config.data.lineAtIndex;

    			//ctx.save();
    			originalLineDraw.apply(this, arguments);
    			//ctx.globalCompositeOperation='overlay';

    			originalLineDraw.apply(this, arguments);
    			//ctx.globalCompositeOperation='overlay';

    			originalLineDraw.apply(this, arguments);
    			//ctx.globalCompositeOperation='overlay';
    			//
    			if (index) {
    				console.info(index);
    				//console.info(arguments[0]);
    				var xaxis = chart.scales['x-axis-0'];
    				var yaxis = chart.scales['y-axis-0'];
    				ctx.globalCompositeOperation = 'overlay';
    				ctx.save();

    				//ctx.beginPath();

    				//originalLineDraw.apply(this, arguments);
    				//ctx.globalCompositeOperation='overlay';




    				//ctx.lineWidth = 1;


    				//vertical line
    				originalLineDraw.apply(this, arguments);
    				ctx.moveTo(xaxis.getPixelForValue(index[0]), yaxis.getPixelForTick(0));
    				ctx.lineTo(xaxis.getPixelForValue(index[0]), yaxis.bottom);

    				ctx.strokeStyle = '#ff0000';
    				var test = yaxis.getPixelForValue(index[1]);


    				//horizontal line
    				ctx.moveTo(yaxis.right, test);
    				ctx.lineTo(xaxis.right, test);


    				//ctx.save();

    				ctx.globalCompositeOperation = 'overlay';



    				//MEDISCH VERZUIM (orange links boven)
    				//var vvConfig.beleid = false;

    				var left = yaxis.right;
    				var top = yaxis.getPixelForTick(0);
    				var yValue = (index[1]) // (index[1] = 5%) geen ruimte voor blauw vlak, tegen rode horizontale lijn
    				var xValue = (index[0]); // (index[0] = 1)geen ruimte voor blauw vlak, tegen rode verticale lijn
    				if (vvConfig.beleid) {
    					yValue = (index[1] + 2) //ruimte voor blauw vlak 2% marge
    					xValue = (index[0] + 0.2) //   ruimte voor blauw vlak 0.2 marge
    				}
    				var height = yaxis.getPixelForValue(yValue); //test
    				height = (height - yaxis.getPixelForTick(0)); //remove marge top

    				var width = (xaxis.getPixelForValue(xValue));
    				width = (width - xaxis.getPixelForTick(0)); //minus marge left
    				ctx.fillStyle = "rgba(255, 165, 0, 0.3)";
    				ctx.fillRect(left, top, width, height);

    				//BELEID (blauw)
    				if (vvConfig.beleid) {
    					top = height + yaxis.getPixelForTick(0);
    					height = (yaxis.getPixelForTick(2) - yaxis.getPixelForTick(0)); //2 = 2% marge blauw vlak

    					//vlak boven horizontale lijn
    					ctx.fillStyle = "rgba(100,149,237,0.3)";
    					ctx.fillRect(left, top, width, height);



    					//vlak rechts vertical lijn
    					top = yaxis.getPixelForValue(index[1]);
    					left = xaxis.getPixelForValue(index[0]);

    					xValue = (0.2); //0.2 marge;
    					var width = (xaxis.getPixelForValue(xValue));
    					width = (width - xaxis.getPixelForTick(0)); //minus marge left

    					height = yaxis.getPixelForTick(index[1]); //(index[1] = 5%)
    					height = (height - yaxis.getPixelForTick(0)); //remove marge top
    					ctx.fillRect(left, top, width, height);
    				}


    				//GEZOND (groen, links onder)
    				left = yaxis.right;
    				width = (xaxis.getPixelForValue(index[0]));
    				width = (width - xaxis.getPixelForTick(0)); //minus marge left

    				top = yaxis.getPixelForValue(index[1]);

    				height = yaxis.getPixelForTick(index[1]); //(index[1] = 5%)
    				height = (height - yaxis.getPixelForTick(0)); //remove marge top

    				ctx.fillStyle = "rgba(60,179,113,0.3)";
    				ctx.fillRect(left, top, width, height);


    				//VERZUIMCULTUUR (oranje, rechts onder)

    				xValue = index[0];
    				yValue = index[1];

    				//vvConfig.beleid = false;
    				if (vvConfig.beleid) {
    					xValue = (index[0] + 0.2);
    					yValue = (index[1] + 2);
    				}

    				left = xaxis.getPixelForValue(xValue); //index[0]
    				top = yaxis.getPixelForValue(yValue);

    				width = xaxis.right - left;

    				height = yaxis.getPixelForTick(yValue); //(index[1] = 5%)
    				height = (height - yaxis.getPixelForTick(0)); //remove marge top

    				ctx.fillStyle = "rgba(255, 165, 0, 0.3)";
    				ctx.fillRect(left, top, width, height);


    				//VERZUIMMANAGEMENT (rood, rechts boven)
    				var yValue = (index[1]) // (index[1] = 5%) geen ruimte voor blauw vlak, tegen rode horizontale lijn
    				var xValue = (index[0]); // (index[0] = 1)geen ruimte voor blauw vlak, tegen rode verticale lijn

    				//vvConfig.beleid = false;
    				if (vvConfig.beleid) {
    					yValue = (index[1] + 2) //ruimte voor blauw vlak 2% marge
    					xValue = (index[0] + 0.2) //   ruimte voor blauw vlak 0.2 marge
    						//console.info(xValue);
    				}

    				left = xaxis.getPixelForValue(xValue); //index[0]
    				top = yaxis.getPixelForTick(0);
    				width = xaxis.right - left;
    				var height = yaxis.getPixelForValue(yValue); //test
    				height = (height - yaxis.getPixelForTick(0)); //remove marge top

    				//ctx.save();
    				ctx.fillStyle = "rgba(255,69,0, 0.3)";
    				ctx.fillRect(left, top, width, height);




    				//if (originalLineDraw.counter == 0){

    				//}
    				//ctx.save();

    				//ctx.globalCompositeOperation='overlay';
    				//ctx.stroke();
    				ctx.globalCompositeOperation = 'overlay';
    				ctx.stroke();
    				ctx.restore();
    				ctx.save();
    				//ctx.stroke();
    				originalLineDraw.apply(this, arguments);
    				//ctx.save();
    				ctx.stroke();
    				//ctx.restore();


    				//ctx.stroke();
    				//ctx.restore();
    				//ctx.stroke();
    				//ctx.restore();


    				console.info(originalLineDraw.counter);
    				originalLineDraw.counter++;

    			}
    		}


    	});


//http://microbuilder.io/blog/2016/01/10/plotting-json-data-with-chart-js.html

    	var myData = {
        	datasets: [{
    			label: "Afdeling 1",
    			//backgroundColor: randomColor(),
    			backgroundColor: pink[0],
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
    			label: "Afdeling 4",
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


    	window.thisData = myData.datasets;
    	window.testx = new Vue({
    		el: '#app',
    		data: {
    			thisDataSet: thisData[0],
    			datazet: thisData,
    		},
    		methods: {
    			updateChart: function(event) {
    				window.myBar.update();
    			}
    		}
    	});




    	var config = {
    		type: 'line',

    		data: myData,

    		//pointHoverRadius:30,
    		options: {

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
                            console.info(data);
                            return "test";
                        },
                        label: function(tooltipItem,data){
                            console.info(data);
                            return "test";
                        }

                    }
        		},

    			responsive: true,

    			animation: {
    				easing: 'easeOutQuart',
    				duration: 1000,
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
    					return true;
    					var chart = this.chart;
    					var ctx = chart.ctx;

    					//ctx.globalCompositeOperation = "source-over";
    					//ctx.fillStyle = "orangered";
    					//ctx.fillRect(60, 20, 200, 340);


    					//console.info(originalLineDraw);
    					//originalLineDraw.apply(this.chart, [undefined]);
    					//console.warn([undefined]);
    					//console.info(arguments);

    					//window.myBar.update();
    					//var chart = this.chart;
    					//originalLineDraw.apply(chart);
    					/*
    					                            return true;
    					                            var chart = this.chart;

    					                            console.info(arguments);
    					                            originalLineDraw.apply(chart, arguments);
    					                            console.log(this.scales['x-axis-0']);
    					                            var ctx = chart.ctx;
    					                            //        console.info(ctx['x-axis-0']);

    					                                    //var chart = this.chart;
    					                        			//var ctx = chart.chart.ctx;
    					                        			var index = chart.config.data.lineAtIndex;
    					                                    //console.info(this);
    					                                    //setCross1(ctx, index, this, chart);
    					                            //window.setTimeout(function() {
    					                            //    $progress.attr({
    					                            //        value: 0
    					                            //    });
    					                            //}, 2000);
    					                            */
    				}
    			},
    			legend: {
    				position: 'right',
    				labels: {
    					//fontColor: '#FF0000',
    				},
    				onClick: function(event, legendItem) {
                        //return true;
    					window.testx.thisDataSet = testx.datazet[legendItem.datasetIndex];
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

    	window.myBar = new Chart(ctx, config);






    	//window.myBar.update();


    	//window.myBar.update();
    	var original = Chart.defaults.global.legend.onClick;


$('#baDisplayTextValue').keyup(function() {
    console.info('changetest key up');
    updateGoal();
});
    	$('#dvp, #dmf,#bavp, #bamf,#beleidCheckbox,#brancheAverageCheckbox').change(function() {
    		console.info('change');
            updateGoal();
    	});





        $('#loadData').click(function() {
            //var background = randomColor(0.5);
            //var cnt = config.data.datasets.length;
            loadData();
        });


        function loadData(){
        window.myDataAsJson = {"datasets":[{"label":"Afdeling 1","backgroundColor":"#ef59a1","pointStyle":"circle","data":[{"x":1.925,"y":8}],"pointRadius":15,"pointHoverRadius":15,"fill":false,"spanGaps":false,"borderWidth":1},{"xcccradius":12,"pointStyle":"circle","label":"Afdeling 2","backgroundColor":"#00baf2","data":[{"x":1.8,"y":5}],"pointRadius":15,"pointHoverRadius":15,"spanGaps":false,"fill":false,"borderWidth":1},{"label":"Afdeling 3","backgroundColor":"#1ab26b","data":[{"x":1.6,"y":2}],"spanGaps":false,"pointRadius":15,"pointHoverRadius":15,"fill":false,"borderWidth":1},{"backgroundColor":"yellow","borderColor":"yellow","label":"Afdeling 4","pointStyle":"circle","pointBackgroundColor":"yellow","pointBorderColor":"yellow","data":[{"x":1.4,"y":5,"r":1}],"fill":true,"borderWidth":1}],"lineAtIndex":[1.1,5]};
        window.testx.datazet = myDataAsJson.datasets;
        window.testx.thisDataSet = testx.datazet[0];
        window.myBar.data.datasets = myDataAsJson.datasets;
        //myData = myDataAsJson;
        //updateGoal();
        //window.myBar.destroy();
        window.myBar.update();
        }
/*

        var tonnytest = {
            wijnandset:[{
                    window.testx.datazet
            }]

        };
                console.info(tonnytest);

                console.info(JSON.stringify(tonnytest));
        */





    	$('#goalUpdate').click(function() {

    		updateGoal();
    		return true;
    		//dvp = document.getElementById('dvp').value;
    		//dmf = document.getElementById('dmf').value;

    		//  	  dz.x{{ datazet[0].data[0].x }}<br>
    		//	  dz.y{{ datazet[0].data[0].y }}<br>
    		//	  <bR>
    		//	  aX{{ activeDataSet.x }}<br>
    		//	  aY{{ activeDataSet.y }}<br>

    		dmf = parseFloat(document.getElementById('dmf').value);
    		dvp = parseFloat(document.getElementById('dvp').value);

    		myData.lineAtIndex[0] = dmf; //x as
    		myData.lineAtIndex[1] = dvp; //y as



    		window.myBar.update();
    		//var dmf = document.getElementById('dmf').value;
    		console.info(myData.lineAtIndex);
    		return true;
    		//testx.datasets[0].data[0].y
    		console.info(testx.datasets[0].data[0].y);
    		console.info(myData.lineAtIndex);
    		console.info(myData.datasets);
    		myData.lineAtIndex = [2, dmf];
    		//myData.lineAtIndex[1] = [dmf];

    		//myData.datasets[0].data = [85, 40, 6, 0, 80, 81, 56];
    		window.myBar.update();
    	});


        $('#addDataset').click(function() {
            //var background = randomColor(0.5);
            var cnt = config.data.datasets.length;
            /*var newDataset = {
                label: 'Afdeling ' + config.data.datasets.length,
                borderColor: background,
                backgroundColor: background,
                pointBorderColor: background,
                pointBackgroundColor: background,
                pointBorderWidth: 1,
                fill: false,
                data: [],
            };*/

            var randomColors = randomColorHover();
            //console.info(randomColors);
            color = randomColors[0];
            hoverColor = randomColors[1];

            console.info(color+' '+hoverColor);
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

            var lastSet  = config.data.datasets[config.data.datasets.length-1];

            //console.warn(config.data.datasets[config.data.datasets.length-1].label);


            for (var index = 0; index < (config.data.datasets.length); ++index) {
                //newDataset.data.push(randomScalingFactor());
            }



            //config.data.datasets[config.data.datasets.length] = lastSet;

            config.data.datasets[config.data.datasets.length-1] = newDataset;


            window.testx.thisDataSet = testx.datazet[config.data.datasets.length-1];

//            config.data.datasets[config.data.datasets.length] = lastSet;

            //console.warn(config.data.datasets[config.data.datasets.length-1]);

            //console.warn(config.data.datasets[config.data.datasets.length].label);

//            config.data.datasets.push(lastSet);
            window.testx.datazet.push(lastSet);

            //console.info(config.data.datasets);


            window.myBar.update();
        });

        $('#removeDataset').click(function(evt) {
//for (var i = 0; i < config.data.datasets.length;++i){
//        console.info(config.data.datasets[i]);
//}


//return true;
            if (testx.datazet.length == 1){
                alert('cross delete!!!');
                return false;
            }

console.warn('before:');
for (var i = 0; i < window.testx.datazet.length;++i){
    //console.info(window.testx.datazet[i].label);
    //console.info(window.testx.datazet[i]);
    console.info(window.testx.datazet[i]._meta[0].dataset._datasetIndex+' - '+window.testx.datazet[i].label);
}

var activeIndex = window.testx.thisDataSet._meta[0].dataset._datasetIndex;
//config.data.datasets.splice(activeIndex, 1);
console.info('delete: '+activeIndex+' -> '+ window.testx.thisDataSet.label +'');

//delete active dataset
config.data.datasets.splice(activeIndex, 1);

//select another dataset
var newActiveIndex = (activeIndex == 0 ? 0 : activeIndex-1);
window.testx.thisDataSet = testx.datazet[newActiveIndex];

console.info('newSelect: '+newActiveIndex+' -> '+ window.testx.thisDataSet.label +'');
//select another dataset


window.myBar.update();
return true;



window.testx.thisDataSet = testx.datazet[config.data.datasets.length-1];

console.warn('delete (active )index: '+ index+' - '+window.testx.thisDataSet.label);





console.warn('after:');
for (var i = 0; i < window.testx.datazet.length;++i){
    //console.info(window.testx.datazet[i].label);
    //console.info(window.testx.datazet[i]);
    console.info(window.testx.datazet[i]._meta[0].dataset._datasetIndex+' - '+window.testx.datazet[i].label);
}

return true;
            //var points = window.myBar.getDatasetAtEvent(evt);

        //console.warn(points[0]._datasetIndex);
        //window.testx.thisDataSet = testx.datazet[points[0]._datasetIndex];

        var index = window.testx.thisDataSet._meta[0].dataset._datasetIndex;
            console.warn(index);
            config.data.datasets.splice(index, 1);
            window.myBar.update();
        });


    	function updateGoal() {
            //target
    		dmf = parseFloat(document.getElementById('dmf').value);
    		dvp = parseFloat(document.getElementById('dvp').value);

            myData.lineAtIndex[0] = dmf; //x as
    		myData.lineAtIndex[1] = dvp; //y as

            //brancheAverage
            bamf = parseFloat(document.getElementById('bamf').value);
    		bavp = parseFloat(document.getElementById('bavp').value);
            vvConfig.brancheAverage.crossIndex[0] = bamf;
            vvConfig.brancheAverage.crossIndex[1] = bavp;

            baDisplayTextValue = (document.getElementById('baDisplayTextValue').value);
            vvConfig.brancheAverage.displayTextValue = baDisplayTextValue;







            console.info($('#beleidCheckbox').prop('checked'));
            vvConfig.beleid = $('#beleidCheckbox').prop('checked');


            console.info($('#brancheAverageCheckbox').prop('checked'));
            vvConfig.brancheAverage.display = $('#brancheAverageCheckbox').prop('checked');


    		console.info(myData.lineAtIndex);


    		window.myBar.update();

    	}

//to do vuejs
        document.getElementById('dmf').value = myData.lineAtIndex[0];
    	document.getElementById('dvp').value = myData.lineAtIndex[1];

        document.getElementById('bamf').value = vvConfig.brancheAverage.crossIndex[0];
        document.getElementById('bavp').value = vvConfig.brancheAverage.crossIndex[1];
        document.getElementById('baDisplayTextValue').value = vvConfig.brancheAverage.displayTextValue;


    	canvas.onclick = function(evt) {

//console.info(evt);

            var points = window.myBar.getDatasetAtEvent(evt);
            console.warn(points.length);
            //point clicked
            if (points.length == 1){
                window.testx.thisDataSet = testx.datazet[points[0]._datasetIndex];

            }
            //legend clicked?
            else{

            }
            //console.warn(points[0]._datasetIndex);
//var index = window.testx.thisDataSet._meta[0].dataset._datasetIndex;
//console.info(index);
            //window.testx.thisDataSet = testx.datazet[points[0]._datasetIndex];

        //    alert(chart.datasets[0].points.indexOf(points[0]));

        //console.info(window.myBar);
//    		var activePoints = window.myBar.getElementsAtEvent(evt);
//            alert(window.myBar.config.data.datasets[0]);
//            alert(chart.datasets[0].points.indexOf(activePoints[0]));
    	//	console.info(activePoints);
    		// => activePoints is an array of points on the canvas that are at the same position as the click event.
    	};




    }
