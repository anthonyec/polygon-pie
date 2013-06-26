var canvas = document.getElementById("logo");
var ctx = canvas.getContext("2d");

function init() {

}

function trigFunctionX ( pointRatio ){
	return Math.cos(pointRatio*2*Math.PI);
}
function trigFunctionY ( pointRatio ){
	return Math.sin(pointRatio*2*Math.PI);
}

function createCircle ( context, centerX, centerY, radius, color ) {
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
	context.fillStyle = 'green';
	context.fill();
	context.lineWidth = 5;
	context.strokeStyle = color;
	context.stroke();
	context.closePath();
}

var segPercentArray = [10, 20, 30, 40, 50, 60];

for (var i=0; i<segPercentArray.length; i++) {
	segPercentArray[i] = Math.random()*100;
}

function drawCircle ( context, centerX, centerY, radius, sides, percent, segmentSelect, percentArray ){

	context.beginPath();
	context.lineWidth = 5;
	context.moveTo(centerX + radius,  centerY);

	for (var i=0; i<=sides; i++) {
		var pointRatio = i/sides;
		var xSteps = trigFunctionX(pointRatio);
		var ySteps = trigFunctionY(pointRatio);
		var pointX = centerX + xSteps * radius;
		var pointY = centerY + ySteps * radius;
		context.lineTo(pointX, pointY);
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

		//createCircle (context, pointX, pointY, 10, '#003300');
		context.beginPath();
		context.moveTo(pointX,  pointY);
		context.lineTo(centerX, centerY);
		context.lineTo(pointXPrev, pointYPrev);
		context.lineTo(pointX, pointY);
		context.closePath();
		context.fillStyle = '#8ED6FF';
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





var polygonOptions = {
						context: ctx,
						x: 150,
						y: 150,
						radius: 200,
						sides: 6,
						percentArray: [10, 20, 30, 40, 50, 60],

						lineWidth: 5
						};

///context, centerX, centerY, radius, sides, percent, segmentSelect, percentArray 

function drawPolygonPie ( options ){
	var context  = options.context;
	var centerX  = options.x;
	var centerY  = options.y;
	var radius  = options.radius;
	var sides  = options.sides;
	var percentArray  = options.percentArray;
	
	context.beginPath();
	context.lineWidth = options.lineWidth;
	context.moveTo(centerX + radius,  centerY);

	for (var i=0; i<=sides; i++) {
		var pointRatio = i/sides;
		var xSteps = trigFunctionX(pointRatio);
		var ySteps = trigFunctionY(pointRatio);
		var pointX = centerX + xSteps * radius;
		var pointY = centerY + ySteps * radius;
		context.lineTo(pointX, pointY);
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

		//createCircle (context, pointX, pointY, 10, '#003300');
		context.beginPath();
		context.moveTo(pointX,  pointY);
		context.lineTo(centerX, centerY);
		context.lineTo(pointXPrev, pointYPrev);
		context.lineTo(pointX, pointY);
		context.closePath();
		context.fillStyle = '#8ED6FF';
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

//drawCircle(ctx, 250, 250, 150, 6, 1, 1, segPercentArray);

drawPolygonPie(polygonOptions);

window.addEventListener('load', init, false);