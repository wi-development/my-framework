function setText(ctx,left,top,height,width, text,color){


    if(color === undefined) { color = 'gray'; }
    if (color != 'blue'){
    //    return true;
    }
    if (window.testx.config.chartbackground === undefined){
        return true;
    }
    if (!(window.testx.config.chartbackground.text.display)){
        return true;
    }


    var textAlign = 'centerTop'; //centerTop,leftTop
    if (window.testx.config.chartbackground.text.align == 'left'){
        textAlign = 'leftTop';
    }




        //ctx.fillStyle = "rgba("+yellow[1]+",1)";
        ctx.fillStyle = color;
        //ctx.fillStyle = 'red';
        ctx.font = "12px Helvetica";
        //ctx.textAlign="center";


        var top = top+10;
        if (textAlign == 'centerTop'){
                var center = (width/2)+left;
                left = center;
        }
        if (textAlign == 'leftTop'){
                //var center = (width/2)+left;
                left = left+12;
        }



        var middle = (height/2)+top;
        var txt = [];

        txt[0] = text[0]+' '+text[1];
        var textWidth = ctx.measureText(txt).width;
        //var textHeight = ctx.measureText(txt).width
        if (textWidth > width){
            txt[0] = text[0];
            txt[1] = text[1];
        }



        for (var i=0;i<txt.length;++i){
            ctx.fillText(txt[i], left, (top+10)+(i*20) );

            //ctx.fillText(text[0], 100, (10+10)+(1*20) );

            //ctx.fillText(txt[0], 100, (top+10)+(1*20));
            //ctx.fillText(txt[i], left, (top)+(i*20));

            //console.info((top)+(i*20));
        }



        //ctx.fillText("width:"+textWidth+" == "+width+"", center, 100 );
        //return ctx;
}

function getVerzuim(that){

    //MEDISCH VERZUIM (orange links boven)
    //var vvConfig.beleid = false;
    var chart = that.chart;
    var ctx = chart.ctx;
    //var index = chart.config.data.lineAtIndex;
    var index = window.testx.config.target.crossIndex;
    //todo
    index[0] = parseFloat(index[0]);
    index[1] = parseFloat(index[1]);

    ctx.globalCompositeOperation = "destination-over";

    var xaxis = that.scales['x-axis-0'];
    var yaxis = that.scales['y-axis-0'];


//MEDISCH VERZUIM (oranje, links boven)
    var left = yaxis.right;
    var top = yaxis.getPixelForTick(0);
    var yValue = (index[1]) // (index[1] = 5%) geen ruimte voor blauw vlak, tegen rode horizontale lijn
    var xValue = (index[0]); // (index[0] = 1)geen ruimte voor blauw vlak, tegen rode verticale lijn
    //console.info('beleid 0 :'+vvConfig.beleid);
    //console.info('beleid 1 :'+window.testx.config.chartConfig.beleid);
    //window.testx.config.vvConfig.beleid
    if (window.testx.config.beleid) {
        yValue = (index[1] + 2) //ruimte voor blauw vlak 2% marge
        xValue = (index[0] + 0.2) //   ruimte voor blauw vlak 0.2 marge
    }
    var height = yaxis.getPixelForValue(yValue); //test
    height = (height - yaxis.getPixelForTick(0)); //remove marge top

    var width = (xaxis.getPixelForValue(xValue));
    width = (width - xaxis.getPixelForTick(0)); //minus marge left
    //ctx.fillStyle = "rgba(255, 165, 0, 0.3)";
    ctx.fillStyle = "rgba("+yellow[1]+","+yellow[2]+")";
    ctx.fillRect(left, top, width, height);

//text

//ctx.font = "20px Georgia";
//ctx.fillText("Hello World!", 10, 50,100);
    //ctx.fillStyle = 'green';
    txt = [];
    txt[0] = "Medisch";
    txt[1] = "verzuim";
    setText(ctx,left, top,height,width,txt,'green');
//end text

    //BELEID (blauw)
    if (window.testx.config.beleid) {
        top = height + yaxis.getPixelForTick(0);
        height = (yaxis.getPixelForTick(2) - yaxis.getPixelForTick(0)); //2 = 2% marge blauw vlak

        //vlak boven horizontale lijn
        ctx.fillStyle = "rgba(100,149,237,0.3)";
        ctx.fillStyle = "rgba("+lblue[1]+","+lblue[2]+")";


        ctx.fillRect(left, top, width, height);

        txt = [];
        txt[0] = "Norm";
        txt[1] = "";
        setText(ctx,left, top,height,width,txt);

        ctx.fillStyle = "rgba("+lblue[1]+","+lblue[2]+")";
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

    //ctx.fillStyle = "rgba(60,179,113,0.3)";
    ctx.fillStyle = "rgba("+green[1]+","+green[2]+")";


    ctx.fillRect(left, top, width, height);

    txt = [];
    txt[0] = "Gezond";
    txt[1] = "";
    setText(ctx,left, top,height,width,txt,'darkgreen');



    //VERZUIMCULTUUR (oranje, rechts onder)

    xValue = index[0];
    yValue = index[1];

    //vvConfig.beleid = false;
    if (window.testx.config.beleid) {
        xValue = (index[0] + 0.2);
        yValue = (index[1] + 2);
    }

    left = xaxis.getPixelForValue(xValue); //index[0]
    top = yaxis.getPixelForValue(yValue);

    width = xaxis.right - left;

    height = yaxis.getPixelForTick(yValue); //(index[1] = 5%)
    height = (height - yaxis.getPixelForTick(0)); //remove marge top

    //ctx.fillStyle = "rgba(255, 165, 0, 0.3)";

    ctx.fillStyle = "rgba("+yellow[1]+","+yellow[2]+")";
    ctx.fillRect(left, top, width, height);

    txt = [];
    txt[0] = "Verzuim cultuur";
    txt[1] = "";
    setText(ctx,left, top,height,width,txt,'green');

    //VERZUIMMANAGEMENT (rood, rechts boven)
    var yValue = (index[1]) // (index[1] = 5%) geen ruimte voor blauw vlak, tegen rode horizontale lijn
    var xValue = (index[0]); // (index[0] = 1)geen ruimte voor blauw vlak, tegen rode verticale lijn

    //vvConfig.beleid = false;
    if (window.testx.config.beleid) {
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
    //ctx.fillStyle = "rgba(255,69,0, 0.3)";
    ctx.fillStyle = "rgba("+pink[1]+","+pink[2]+")";
    ctx.fillRect(left, top, width, height);

    txt = [];
    txt[0] = "Verzuim";
    txt[1] = "management";
    setText(ctx,left, top,height,width,txt,'orangered');


}
