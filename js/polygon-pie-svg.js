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

		/* Triangle drawing */
		for (var i=0; i<=this.sides; i++) {

			console.log('YE');

			$('.pie-debug').append('<polygon points="0 0, 100 0, 50 100" transform="rotate(0 0 0)"/>');
			$('.pie-chart').append('<p>Test</p>');

			// var triRadius = (this.radius*(this.percents[i]/100));
			// var pointCount = i;
			// var pointRatio = pointCount/this.sides;
			// var pointRatioPRev = (pointCount+1)/this.sides;

			// var xSteps = trigFunctionX(pointRatio);
			// var ySteps = trigFunctionY(pointRatio);

			// var xStepsPrev = trigFunctionX(pointRatioPRev);
			// var yStepsPrev = trigFunctionY(pointRatioPRev);

			// var pointX = this.centerX + xSteps * triRadius;
			// var pointY = this.centerY + ySteps * triRadius;

			// var pointXPrev = this.centerX + xStepsPrev * triRadius;
			// var pointYPrev = this.centerY + yStepsPrev * triRadius;

			// context.beginPath();
			// context.moveTo(pointX,  pointY);
			// context.lineTo(this.centerX, this.centerY);
			// context.lineTo(pointXPrev, pointYPrev);
			// context.lineTo(pointX, pointY);
			// context.closePath();
			// context.fillStyle = this.segmentColors[i];
			// context.fill();
		}
	}
}

var pieOptions = {
	x: 200,
	y: 200,
	radius: 250,
	sides: 6,
	percents: [100, 100, 100, 100, 100, 100]

};

var pie = new PolygonPie(pieOptions);
pie.draw('.pie-chart');