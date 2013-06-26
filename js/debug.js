$(function(){

	$('#sLine').change(function(){
	    pieOptions.lineWidth = this.value;
	});

	for (var i=0; i<5; i++) {
		$('#sPercent'+i).change(function(){
	    	pieOptions.percentArray[i] = this.value;
		});
	}

	$(".sPercent").each(function( i ) {
		$(this).change(function(){
	    	pieOptions.percentArray[i] = this.value;
		});
	});

	$('#sSides').val(6);

	$('#sSides').change(function(){
	    pieOptions.sides = this.value;
	});
	
	$('input').change();
});