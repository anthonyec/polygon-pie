var canvas = document.getElementById("logo");
var ctx = canvas.getContext("2d");

var pieOptions = {
						context: ctx,
						x: canvas.width/2,
						y: canvas.height/2,
						radius: 150,
						sides: 6,
						percentArray: [80, 60, 30, 80, 50, 20],

						lineWidth: 1,
						lineColor: '#fff',
						segmentColors: ['#F2385A', '#F5A503', '#E9F1DF', '#56D9CD', '#3AA1BF', '#71F5EC']
					};

function PolygonPie ( options ){

	function trigFunctionX ( pointRatio ){
		return Math.cos(pointRatio*2*Math.PI);
	}

	function trigFunctionY ( pointRatio ){
		return Math.sin(pointRatio*2*Math.PI);
	}

	if (!options) {
		console.log("Will use some deault options one day")
	}
	

	

	this.draw = function() {
		this.options = options
		this.context  = options.context;
		this.centerX  = options.x;
		this.centerY  = options.y;
		this.radius  = options.radius;
		this.sides  = options.sides;
		this.percentArray  = options.percentArray;
		this.lineWidth = options.lineWidth;
		this.lineColor = options.lineColor;
		this.segmentColors = options.segmentColors;


		for (var i=0; i<=this.sides; i++) {
			var triRadius = (this.radius*(this.percentArray[i]/100));
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

			this.context.beginPath();
			this.context.moveTo(pointX,  pointY);
			this.context.lineTo(this.centerX, this.centerY);
			this.context.lineTo(pointXPrev, pointYPrev);
			this.context.lineTo(pointX, pointY);
			this.context.closePath();
			this.context.fillStyle = this.segmentColors[i];
			this.context.fill();
		}

		for (var i=0; i<=this.sides; i++) {
			var pointRatio = i/this.sides;
			var xSteps = trigFunctionX(pointRatio);
			var ySteps = trigFunctionY(pointRatio);
			var pointX = this.centerX + xSteps * this.radius;
			var pointY = this.centerY + ySteps * this.radius;
			this.context.beginPath();
			this.context.moveTo(pointX,  pointY);
			this.context.lineTo(this.centerX, this.centerY);
			this.context.stroke();
			this.context.closePath();
		}

		this.context.beginPath();
		this.context.lineWidth = this.lineWidth;
		this.context.moveTo(this.centerX + this.radius,  this.centerY);

		for (var i=0; i<=this.sides; i++) {
			var pointRatio = i/this.sides;
			var xSteps = trigFunctionX(pointRatio);
			var ySteps = trigFunctionY(pointRatio);
			var pointX = this.centerX + xSteps * this.radius;
			var pointY = this.centerY + ySteps * this.radius;
			this.context.lineTo(pointX, pointY);
			this.context.strokeStyle = this.lineColor;
			this.context.stroke();
			
		}

		this.context.closePath();
	}

	this.draw();
}

//PolygonPie(polygonOptions);

var pie = new PolygonPie(pieOptions);

console.log(pie.sides)

function render () {
	//console.log(pie.centerX);

	//pieOptions.sides += 1;

	ctx.clearRect(0, 0, 500, 500);
	pie.draw();
	
}

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

(function animloop(){
	requestAnimFrame(animloop);
	render();
})();




init();
			animate();

			function init() {

				var tween = new TWEEN.Tween( { x: 0, sides: 0 } )
					.to( { x: 100, sides:6 }, 1500 )
					.easing( TWEEN.Easing.Quintic.Out )
					.onUpdate( function () {
						for (var i=0; i<6; i++) {
							//pieOptions.percentArray[i] = this.x;
							pieOptions.sides = this.sides;
						}
					})
					.start();
			}

			function animate() {

				requestAnimationFrame( animate );
				TWEEN.update();

			}
