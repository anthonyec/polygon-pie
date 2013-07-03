var PolygonPieCanvas = function ( options ) {
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

			/* Draw Background Triangles */
			ctx.beginPath();
				ctx.moveTo (this.centerX, this.centerY); 
				ctx.lineTo (this.centerX+this.size*Math.cos(i*2*Math.PI/this.sides), 
		    				this.centerY+this.size*Math.sin(i*2*Math.PI/this.sides));
				ctx.lineTo (this.centerX+this.size*Math.cos((i-1)*2*Math.PI/this.sides), 
		    				this.centerY+this.size*Math.sin((i-1)*2*Math.PI/this.sides));

				ctx.fillStyle = this.backgroundColor;
			    ctx.fill();
			    ctx.strokeStyle = this.backgroundLineColor;
				ctx.lineWidth = this.backgroundLineWidth;

				if (this.backgroundLineWidth != 0 && this.backgroundLineWidth != undefined) {
					ctx.stroke();
				}
			ctx.closePath();


			/* Draw Foreground Triangles with percentages */ 
			/* For drawing to the preview line I use i-1 instead of i+1 otherwise it comes out rotated a bit compared to the svg one */
			var percent = this.percents[i-1]/100;

			ctx.beginPath();
				ctx.moveTo (this.centerX, this.centerY);  

			    ctx.lineTo (this.centerX+this.size*Math.cos(i*2*Math.PI/this.sides)*percent, 
			    			this.centerY+this.size*Math.sin(i*2*Math.PI/this.sides)*percent);

			    ctx.lineTo (this.centerX+this.size*Math.cos((i-1)*2*Math.PI/this.sides)*percent, 
			    			this.centerY+this.size*Math.sin((i-1)*2*Math.PI/this.sides)* percent);

			    ctx.lineTo (this.centerX, this.centerY);
			    ctx.fillStyle = this.segmentColors[i-1];
			    ctx.fill();
			    ctx.strokeStyle = this.segmentLineColor;
				ctx.lineWidth = this.segmentLineWidth;

				if (this.segmentLineWidth != 0 && this.segmentLineWidth != undefined) {
					ctx.stroke();
				}
		    ctx.closePath();
		}

		 /* Draw split */
		for (var i=0; i<=this.sides; i+=1) {
			ctx.beginPath();
				ctx.moveTo (this.centerX, this.centerY); 
				ctx.lineTo (this.centerX+this.size*Math.cos(i*2*Math.PI/this.sides), 
		    				this.centerY+this.size*Math.sin(i*2*Math.PI/this.sides));

				// ctx.lineTo (this.centerX+this.size*Math.cos((i-1)*2*Math.PI/this.sides), 
		  //   				this.centerY+this.size*Math.sin((i-1)*2*Math.PI/this.sides));

			    ctx.strokeStyle = this.splitLineColor;
				ctx.lineWidth = this.splitLineWidth;

				if (this.splitLineWidth != 0 && this.splitLineWidth != undefined) {
					ctx.stroke();
				}
			ctx.closePath();
		}
	}

	this.setPercent = function ( id, percent ) {
		optionObject.segments.percent[id] = percent;
		context.clearRect(optionObject.x-optionObject.radius, optionObject.y-optionObject.radius, optionObject.radius*2, optionObject.radius*2);
		this.draw(context);
	}
}