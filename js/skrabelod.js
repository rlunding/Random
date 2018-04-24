var myCanvas = document.getElementById("myCanvas");
var ctx = myCanvas.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY,color){
    ctx.save();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX,endY);
    ctx.stroke();
    ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height,color){
    ctx.save();
    ctx.fillStyle=color;
    ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
    ctx.restore();
}

var Barchart = function(options){
    this.options = options;
    this.canvas = options.canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = options.colors;

    this.draw = function(){
        var maxValue = 0;
        for (var categ in this.options.data){
            maxValue = Math.max(maxValue,this.options.data[categ]);
        }
        var canvasActualHeight = this.canvas.height - this.options.padding * 2;
        var canvasActualWidth = this.canvas.width - this.options.padding * 2;

        //drawing the grid lines
        var gridValue = 0;
        while (gridValue <= maxValue){
            var gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
            drawLine(
                this.ctx,
                0,
                gridY,
                this.canvas.width,
                gridY,
                this.options.gridColor
            );

            //writing grid markers
            this.ctx.save();
            this.ctx.fillStyle = this.options.gridColor;
            this.ctx.textBaseline="bottom";
            this.ctx.font = "bold 10px Arial";
            this.ctx.fillText(gridValue, 10,gridY - 2);
            this.ctx.restore();

            gridValue+=this.options.gridScale;
        }

        //drawing the bars
        var barIndex = 0;
        var numberOfBars = Object.keys(this.options.data).length;
        var barSize = (canvasActualWidth)/numberOfBars;

        for (categ in this.options.data){
            var val = this.options.data[categ];
            var barHeight = Math.round( canvasActualHeight * val/maxValue) ;
            drawBar(
                this.ctx,
                this.options.padding + barIndex * barSize,
                this.canvas.height - barHeight - this.options.padding,
                barSize,
                barHeight,
                this.colors[barIndex%this.colors.length]
            );
            var textSize = ctx.measureText(categ);
            ctx.fillText(categ,
                this.options.padding + barIndex * barSize + barSize / 2 - textSize.width/2,
                this.canvas.height - barHeight - this.options.padding);

            barIndex++;
        }

        //drawing series name
        this.ctx.save();
        this.ctx.textBaseline="bottom";
        this.ctx.textAlign="center";
        this.ctx.fillStyle = "#000000";
        this.ctx.font = "bold 14px Arial";
        this.ctx.fillText(this.options.seriesName, this.canvas.width/2,this.canvas.height);
        this.ctx.restore();
    }
};

var mySmileys = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0
};


var myBarchart = new Barchart({
        canvas:myCanvas,
        seriesName:"Smileys",
        padding:20,
        gridScale:5,
        gridColor:"#555555",
        data: mySmileys,
        colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
);

function redrawBarChart() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.save();
    myBarchart.draw();
}

var prop = 0.5;

function lavSkrabelod() {
    var antal = 0;
    var elements = [
        "elem1", "elem2", "elem3",
        "elem4", "elem5", "elem6",
        "elem7", "elem8", "elem9"
    ];

    for (var i = 0; i < elements.length; i++) {
        var img = document.getElementById(elements[i]);
        if (Math.random() < prop) {
            img.src =  "img/smiley.jpg";
            antal = antal + 1;
        } else {
            img.src =  "img/white.jpg";
        }
    }
    document.getElementById("antal").innerHTML =  "Antal "+antal;
    mySmileys[antal] += 1;

    redrawBarChart();
}

function showVal(val) {
    document.getElementById("værdi").innerHTML = val;
    prop = val;
    for (var key in mySmileys) {
        mySmileys[key] = 0;
    }
    redrawBarChart();
}

$( document ).ready(function() {
    $("#prop").val("0.5").change();
    lavSkrabelod();
});