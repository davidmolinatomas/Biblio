
$(document).on('pagebeforeshow', '#product_list', function(){
	alert("8");
	LiteWinery.VinoManager.loadList($('#wineListContainer'));
});
