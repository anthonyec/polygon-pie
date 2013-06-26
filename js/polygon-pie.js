var canvas = document.getElementById("logo");
var ctx = canvas.getContext("2d");

var polygonOptions = {
						context: ctx,
						x: canvas.width/2,
						y: canvas.height/2,
						radius: 150,
						sides: 6,
						percentArray: [80, 60, 30, 80, 50, 20],

						lineWidth: 1,
						lineColor: '#ececec',
						segmentColors: ['#8ed6ff', '#cccccc', '#FF70A0', '#00FF40', '#D4B353', '#71F5EC']
					};

function drawPolygonPie ( options ){

	function trigFunctionX ( pointRatio ){
		return Math.cos(pointRatio*2*Math.PI);
	}

	function trigFunctionY ( pointRatio ){
		return Math.sin(pointRatio*2*Math.PI);
	}

	var context  = options.context;
	var centerX  = options.x;
	var centerY  = options.y;
	var radius  = options.radius;
	var sides  = options.sides;
	var percentArray  = options.percentArray;
	var lineWidth = options.lineWidth;
	var lineColor = options.lineColor;
	var segmentColors = options.segmentColors;
	
	context.beginPath();
	context.lineWidth = lineWidth;
	context.moveTo(centerX + radius,  centerY);

	for (var i=0; i<=sides; i++) {
		var pointRatio = i/sides;
		var xSteps = trigFunctionX(pointRatio);
		var ySteps = trigFunctionY(pointRatio);
		var pointX = centerX + xSteps * radius;
		var pointY = centerY + ySteps * radius;
		context.lineTo(pointX, pointY);
		context.strokeStyle = lineColor;
		context.stroke();
		
	}

	context.closePath();

	for (var i=0; i<=sides; i++) {
		var triRadius = (radius*(percentArray[i]/100));
		var pointCount = i;
		var pointRatio = pointCount/sides;
		var pointRatioPRev = (pointCount+1)/sides;

		var xSteps = trigFunctionX(pointRatio);
		var ySteps = trigFunctionY(pointRatio);

		var xStepsPrev = trigFunctionX(pointRatioPRev);
		var yStepsPrev = trigFunctionY(pointRatioPRev);

		var pointX = centerX + xSteps * triRadius;
		var pointY = centerY + ySteps * triRadius;

		var pointXPrev = centerX + xStepsPrev * triRadius;
		var pointYPrev = centerY + yStepsPrev * triRadius;

		context.beginPath();
		context.moveTo(pointX,  pointY);
		context.lineTo(centerX, centerY);
		context.lineTo(pointXPrev, pointYPrev);
		context.lineTo(pointX, pointY);
		context.closePath();
		context.fillStyle = segmentColors[i];
		context.fill();
	}

	for (var i=0; i<=sides; i++) {
		var pointRatio = i/sides;
		var xSteps = trigFunctionX(pointRatio);
		var ySteps = trigFunctionY(pointRatio);
		var pointX = centerX + xSteps * radius;
		var pointY = centerY + ySteps * radius;
		context.beginPath();
		context.moveTo(pointX,  pointY);
		context.lineTo(centerX, centerY);
		context.stroke();
		context.closePath();
	}
}

drawPolygonPie(polygonOptions);