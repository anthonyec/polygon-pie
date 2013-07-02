var PolygonPie = function ( options ) {
	var defaultOptions = {
		x: 150,
		y: 150,
		radius: 140,
		sides: 6,

		background: { color:'#F5F5F5', lineColor:'#000000', lineWidth:3 },
		segments: { color:['#EA8541', '#F5BB1C', '#9BC858', '#8DCEEC', '#6C3283', '#DD131D'], percent: [100, 100, 100, 100, 100, 100], lineWidth: 1, lineColor: '#000000' },
		split: { color:'#F5F5F5', lineColor:'#000000', lineWidth:3 }
	};

	if (options) {
		var optionObject = options;
	} else {
		var optionObject = defaultOptions;
	}                                 

	function trigCos ( num, centerXY, size, sides, percent ) {
		return centerXY+size*Math.cos(num*2*Math.PI/sides)*percent;
	}

	function trigSin ( num, centerXY, size, sides, percent ) {
		return centerXY+size*Math.sin(num*2*Math.PI/sides)*percent;
	}

	var context;
	var backgroundPath = "";

	this.draw = function ( ctx ) {
		context = ctx;
		this.centerX = optionObject.x;
		this.centerY = optionObject.y;
		this.size = optionObject.radius;
		this.sides = optionObject.sides;
		this.percents = optionObject.segments.percent;

		this.segmentColors = optionObject.segments.color;
		this.segmentLineColor = optionObject.segments.lineColor;
		this.segmentLineWidth = optionObject.segments.lineWidth;

		this.splitLineColor = optionObject.split.lineColor;
		this.splitLineWidth = optionObject.split.lineWidth;

		this.backgroundColor = optionObject.background.color;
		this.backgroundLineColor = optionObject.background.lineColor;
		this.backgroundLineWidth = optionObject.background.lineWidth;

		for (var i=0; i<=this.sides; i+=1) {
			if (i != this.sides) {
				var percent = this.percents[i]/100;

				var firstHexX = trigCos(i, this.centerX, this.size, this.sides, 1);
				var firstHexY = trigSin(i, this.centerX, this.size, this.sides, 1);

				var secondHexX = this.centerX+this.size*Math.cos(i*2*Math.PI/this.sides);
				var secondHexY = this.centerY+this.size*Math.sin(i*2*Math.PI/this.sides);

				var firstPointX = this.centerX+this.size*Math.cos(i*2*Math.PI/this.sides)*percent;
				var firstPointY = this.centerY+this.size*Math.sin(i*2*Math.PI/this.sides)*percent;

				var secondPointX = this.centerX+this.size*Math.cos((i+1)*2*Math.PI/this.sides)*percent;
				var secondPointY = this.centerY+this.size*Math.sin((i+1)*2*Math.PI/this.sides)*percent;


				var segmentForeground = context.path("M "+this.centerX+" "+this.centerY+", L "+firstPointX+" "+firstPointY+", L "+secondPointX+" "+secondPointY+" Z");
				segmentForeground.attr({
										"stroke": this.segmentLineColor,
										"stroke-width": this.segmentLineWidth,
										fill: this.segmentColors[i]
										});


				var splitLines = context.path("M "+this.centerX+" "+this.centerY+", L "+firstHexX+" "+firstHexY+", L "+secondHexX+" "+secondHexY+" Z").toFront();
				splitLines.attr({
								"stroke": this.splitLineColor, 
								"stroke-width": this.splitLineWidth 
								});

				segmentForeground.id = "path"+i;

				backgroundPath += (i == 0 ? "M" : "L") + firstHexX + "," + firstHexY
			}
		}

		backgroundPath += "Z";

		var background = context.path(backgroundPath).toBack();
		background.attr({
						stroke: this.backgroundLineColor,
						"stroke-width": this.backgroundLineWidth,
						"fill": this.backgroundColor
						})
	}

	this.setPercent = function ( id, percent ) {
		var percent = percent/100;
		var path = context.getById("path"+id);

		var firstPointX = trigCos(id, this.centerX, this.size, this.sides, percent);
		var firstPointY = trigSin(id, this.centerX, this.size, this.sides, percent);

		var secondPointX = trigCos(id+1, this.centerX, this.size, this.sides, percent);
		var secondPointY = trigSin(id+1, this.centerX, this.size, this.sides, percent);

		path.attr({ "path": "M"+optionObject.x+" "+optionObject.y+", L"+firstPointX+" "+firstPointY+", L"+secondPointX+" "+secondPointY+" Z" });
	}
}