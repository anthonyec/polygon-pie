var canvas = document.getElementById("logo");
var ctx = canvas.getContext("2d");

var pieOptions = {
	x: canvas.width/2,
	y: canvas.height/2,
	radius: 140,
	sides: 6,
	percents: [100, 100, 100, 100, 100, 100],

	lineWidth: 1,
	lineColor: '#fff',										///TOP going right
	segmentColors: ['#EA8541', '#F5BB1C', '#9BC858', '#8DCEEC', '#6C3283', '#DD131D'],
	backgroundColor: '#F5F5F5'
};

var pie = new PolygonPie(pieOptions);



var time = 0;
var introStart = { x : 210, y: 210, sides: 100 };
var introTarget = { x : 210, y: 210, sides: 6 };
var introTween = new TWEEN.Tween(introStart).to(introTarget, 2000).easing(TWEEN.Easing.Quintic.Out).start();

introTween.onUpdate(function(){
    // Ideally should be pie.x = position.x; at the moment it edits the pie options instead.
	pieOptions.sides = introStart.sides
});

function debug () {
	$(".sPercent").each(function( i ) {
		$(this).val(pieOptions.percents[i]);
	});

	$('#sLine').val(pieOptions.lineWidth);
	$('#sColor').val(pieOptions.lineColor);
	$('#sBackground').val(pieOptions.backgroundColor);
	$('#sSides').val(pieOptions.sides);
}

function loadingAnimation () {
	$('#logo').removeClass('logo-rotate');
	$('#logo').css('width', '400px');
	$('#logo').css('height', '400px');
	$('#logo').css('margin-left', '-200px');
	$('#logo').css('margin-top', '-200px');
}

function drawEllipse ( ctx, x, y, w, h ) {
	var kappa = .5522848,
		ox = (w / 2) * kappa, // control point offset horizontal
		oy = (h / 2) * kappa, // control point offset vertical
		xe = x + w,           // x-end
		ye = y + h,           // y-end
		xm = x + w / 2,       // x-middle
		ym = y + h / 2;       // y-middle

	ctx.beginPath();
	ctx.strokeStyle = '#F5F5F5';
	ctx.moveTo(x, ym);
	ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	ctx.fillStyle = '#F5F5F5';
	ctx.fill();
	ctx.closePath();
	ctx.stroke();
}

function render () {
	requestAnimationFrame(render);
	time += 0.03;
	ctx.clearRect(0, 0, 500, 500);
	pie.draw(ctx);
	TWEEN.update();

	debug();

	pieOptions.y = canvas.width/2 + Math.sin(time)*6;

	drawEllipse(ctx, canvas.width/2-pieOptions.radius/2-Math.sin(time)*6, canvas.height/2+pieOptions.radius+10, pieOptions.radius+Math.sin(time)*10, 8);
}


var requestAnimationFrameFunction =  window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(callback) {
                  window.setTimeout(callback, 10);
               };
 window.requestAnimationFrame = requestAnimationFrameFunction;

 render();