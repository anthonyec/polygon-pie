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

	this.draw = function ( context ) {
		
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