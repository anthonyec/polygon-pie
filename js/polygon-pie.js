var PolygonPie = function ( options ) {
	var defaultOptions = {
		x: 250,
		y: 250,
		radius: 150,
		sides: 6,
		percents: [10, 20, 30, 40, 50, 60],

		lineWidth: 2,
		lineColor: '#000000',
		segmentColors: ['#F2385A', '#F5A503', '#E9F1DF', '#56D9CD', '#3AA1BF', '#71F5EC']
	};

	if (options) {
		var optionObject = options;
	} else {
		var optionObject = defaultOptions;
	}

	function trigFunctionX ( pointRatio ){
		return Math.cos(pointRatio*2*Math.PI);
	}

	function trigFunctionY ( pointRatio ){
		return Math.sin(pointRatio*2*Math.PI);
	}                                        

	this.draw = function ( context ) {
		this.centerX = optionObject.x;
		this.centerY = optionObject.y;
		this.radius = optionObject.radius;
		this.sides = optionObject.sides;
		this.percents = optionObject.percents;

		this.lineWidth = optionObject.lineWidth;
		this.lineColor = optionObject.lineColor; 
		this.segmentColors = optionObject.segmentColors;   
		

		/* Triangle drawing */
		for (var i=0; i<=this.sides; i++) {
			var triRadius = (this.radius*(this.percents[i]/100));
			var pointCount = i;
			var pointRatio = pointCount/this.sides;
			var pointRatioPRev = (pointCount+1)/this.sides;

			var xSteps = trigFunctionX(pointRatio);
			var ySteps = trigFunctionY(pointRatio);

			var xStepsPrev = trigFunctionX(pointRatioPRev);
			var yStepsPrev = trigFunctionY(pointRatioPRev);

			var pointX = this.centerX + xSteps * triRadius;
			var pointY = this.centerY + ySteps * triRadius;

			var pointXPrev = this.centerX + xStepsPrev * triRadius;
			var pointYPrev = this.centerY + yStepsPrev * triRadius;

			context.beginPath();
			context.moveTo(pointX,  pointY);
			context.lineTo(this.centerX, this.centerY);
			context.lineTo(pointXPrev, pointYPrev);
			context.lineTo(pointX, pointY);
			context.closePath();
			context.fillStyle = this.segmentColors[i];
			context.fill();
		}

		if (this.lineWidth != 0 || this.lineWidth != false) {
			/* Star line drawing */
			for (var i=0; i<=this.sides; i++) {
				var pointRatio = i/this.sides;
				var xSteps = trigFunctionX(pointRatio);
				var ySteps = trigFunctionY(pointRatio);
				var pointX = this.centerX + xSteps * this.radius;
				var pointY = this.centerY + ySteps * this.radius;
				context.beginPath();
				context.moveTo(pointX,  pointY);
				context.lineTo(this.centerX, this.centerY);
				context.stroke();
				context.closePath();
			}

			context.beginPath();
			context.lineWidth = this.lineWidth;
			context.lineCap = 'round';
			context.moveTo(this.centerX + this.radius,  this.centerY);

			/* Outline drawing */
			for (var i=0; i<=this.sides; i++) {
				var pointRatio = i/this.sides;
				var xSteps = trigFunctionX(pointRatio);
				var ySteps = trigFunctionY(pointRatio);
				var pointX = this.centerX + xSteps * this.radius;
				var pointY = this.centerY + ySteps * this.radius;
				context.lineTo(pointX, pointY);
				context.strokeStyle = this.lineColor;
				context.stroke();
				
			}

			context.closePath();
		}
	}
}