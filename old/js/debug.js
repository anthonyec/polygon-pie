$(function(){

	$('#sLine').change(function(){
	    pieOptions.lineWidth = this.value;
	});

	$('#sColor').val('#ffffff');
	$("#sColor").each(function( i ) {
		$(this).change(function(){
	    	pieOptions.lineColor = this.value;
		});
	});

	$('#sBackground').change(function(){
	    pieOptions.backgroundColor = this.value;
	});

	$(".sPercent").each(function( i ) {
		$(this).change(function(){
	    	pieOptions.percents[i] = this.value;
		});
	});

	$(".sPercentColor").each(function( i ) {
		$(this).val(pieOptions.segmentColors[i]);

		$(this).change(function(){
	    	pieOptions.segmentColors[i] = this.value;
		});
	});

	$('#sSides').val(pieOptions.sides);
	$('#sSides').change(function(){
	    pieOptions.sides = this.value;
	});
	
	$('input').change();
});