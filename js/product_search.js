
function selectVinoSearch(){
	LiteWinery.VinoManager.selectByPalabra(
			$('#searchinput_product_search').val().toString(),
			successSelectVinoSearch);
}


function successSelectVinoSearch(results){
	var html = '';
	var len = results.rows.length;
	html += '<ul data-role="listview" data-inset="true" id="listaVinosOrdenada" >';
	for (var i = 0; i < len; i++){
		html += '<li>';
		html += '	<a href="product_info.html?' + PARAM_IdVino +'=' + results.rows.item(i).idVino + '">';
		html += '		<img src="images/habla-del-silencio-2010.jpg" class="wine-list"> ';
		html += '		<span class="nombre-vino-anada">' + results.rows.item(i).nombre + '&nbsp;' + results.rows.item(i).anada + '</span><br>';
		html += '		<span class="tipo-vino">' + results.rows.item(i).tipoVino + '</span><br>';
		html += '		<span class="denominacion">' + results.rows.item(i).dOrigen + '</span>';
		html += '	</a>';
		html += '</li> ';
	}
	html += '</ul>';
	
	$("#wineSearchContainer").html(html);
	$("#wineSearchContainer").trigger('create');
}


