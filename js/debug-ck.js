$(function(){$("#sLine").change(function(){pieOptions.lineWidth=this.value});for(var e=0;e<5;e++)$("#sPercent"+e).change(function(){pieOptions.percentArray[e]=this.value});$(".sPercent").each(function(e){$(this).change(function(){pieOptions.percentArray[e]=this.value})});$("#sSides").val(6);$("#sSides").change(function(){pieOptions.sides=this.value});$("input").change()});