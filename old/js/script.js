var canvas = document.getElementById("logo");
var ctx = canvas.getContext("2d");

var pieOptions = {
	x: canvas.width/2,
	y: canvas.height/2,
	radius: 250,
	sides: 6,
	percents: [100, 100, 100, 100, 100, 100],

	lineWidth: 0,
	lineColor: '#fff',										///TOP going right
	segmentColors: ['#FF8AB8', '#A1389D', '#E81333', '#63C5EC', '#3AD589', '#F9D01E']
};

var pie = new PolygonPie(pieOptions);









var animate = { x : 210, y: 210, sides: 100 };
var target = { x : 210, y: 210, sides: 6 };
var tween = new TWEEN.Tween(animate).to(target, 2000).easing(TWEEN.Easing.Quintic.Out).start();

tween.onUpdate(function(){
    // Ideally should be pie.x = position.x; at the moment it edits the pie options instead.
	pieOptions.sides = animate.sides
});

function debug () {
	$(".sPercent").each(function( i ) {
		$(this).val(pieOptions.percents[i]);
	});

	$('#sLine').val(pieOptions.lineWidth);
	$('#sColor').val(pieOptions.lineColor);
	$('#sSides').val(pieOptions.sides);
}

function animation1 () {
	$('#logo').removeClass('logo-rotate');
	$('#logo').css('width', '400px');
	$('#logo').css('height', '400px');
	$('#logo').css('margin-left', '-200px');
	$('#logo').css('margin-top', '-200px');
}

function animation2 () {
	$('#logo').addClass('logo-rotate');
	$('#logo').css('width', '200px');
	$('#logo').css('height', '200px');
	$('#logo').css('margin-left', '-100px');
	$('#logo').css('margin-top', '-100px');
}

function render () {
	ctx.clearRect(0, 0, 500, 500);
	pie.draw(ctx);

	debug();

	TWEEN.update();
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