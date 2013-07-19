
$(document).on('pagebeforeshow', '#product_edit', function(){
	initProductEdit();
});

function initProductEdit() {
	LiteWinery.VinoManager.selectByIdVino(
			getURLParam(PARAM_IdVino),
			successSelectVinoEdit);
}

function successSelectVinoEdit(vinoAux){
//	document.getElementById('inputNombre').innerHTML = vino.nombre;
//	document.getElementById('inputTipoVino').innerHTML = vino.tipoVino;
//	document.getElementById('inputAnada').innerHTML = vino.anada;
//	document.getElementById('spanAlcohol').innerHTML = vino.alcohol;
//	document.getElementById('spanMaduracion').innerHTML = vino.maduracion;
//	document.getElementById('spanPaisOrigen').innerHTML = vino.paisOrigen;
//	document.getElementById('spanDOrigen').innerHTML = vino.dOrigen;
//	document.getElementById('spanBodega').innerHTML = vino.bodega;
	
	$('#inputNombre').val(vinoAux.nombre);
	$('#inputTipoVino').val(vinoAux.tipoVino);
	$('#inputAnada').val(vinoAux.anada);
	$('#inputAlcohol').val(vinoAux.alcohol);
	$('#inputMaduracion').val(vinoAux.maduracion);
	$('#inputPaisOrigen').val(vinoAux.paisOrigen);
	$('#inputdOrigen').val(vinoAux.dOrigen);
	$('#inputBodega').val(vinoAux.bodega);
	
}

function actualizarProductoEditado() {

	// insertarVariedadesUva();
	// insertarNotasDeCata();
	//insertarBodegaPersonal();
	//insertarTiendas();
	
	LiteWinery.VinoManager.updateVino(getObjetoVinoConId(),
			updateVinoSuccess);
//	if(LiteWinery.listaDeNotas.length !=0){
//		alert("dentro de insertasrproducto contorllenght listanotas");
//		for(var i=0; i<LiteWinery.listaDeNotas.length; i++){
//			LiteWinery.listaDeNotas[i].idVino = idLastVino+1;
//			insertVinoNota(LiteWinery.listaDeNotas[i]);
//			alert("dentro del for");
//		}
//		
//		insertVinoNota(crearObjetoVinoNota());
//	}
//	else{
//		alert("dentro del elese");
//		insertVinoNota(crearObjetoVinoNota());
//	}
//	
}

function getObjetoVinoConId () {
	var vino = new Object();
	
	vino.idVino = getURLParam(PARAM_IdVino);
	vino.nombre = document.getElementById("inputNombre").value;
	vino.tipoVino = document.getElementById("inputTipoVino").value;
	vino.anada = document.getElementById("inputAnada").value;
	vino.alcohol = document.getElementById("inputAlcohol").value;
	vino.maduracion	= document.getElementById("inputMaduracion").value;
	vino.paisOrigen	= document.getElementById("inputPaisOrigen").value;
	vino.dOrigen = document.getElementById("inputdOrigen").value;
	vino.bodega	= document.getElementById("inputBodega").value;
	
	return vino;
}


function updateVinoSuccess(vino){
	navigateToProductList();
}

function crearVinoEditado(){
	
var vino = new Object();
	
	vino.idVino = getURLParam(PARAM_IdVino);
	vino.nombre = document.getElementById("inputNombre").value;
	vino.tipoVino = document.getElementById("inputTipoVino").value;
	vino.anada = document.getElementById("inputAnada").value;
	vino.alcohol = document.getElementById("inputAlcohol").value;
	vino.maduracion	= document.getElementById("inputMaduracion").value;
	vino.paisOrigen	= document.getElementById("inputPaisOrigen").value;
	vino.dOrigen = document.getElementById("inputdOrigen").value;
	vino.bodega	= document.getElementById("inputBodega").value;
	
	return vino;
}


function goToProductInfo () {
	var params = '';
	params += PARAM_IdVino;
	params += '=';
	params += getURLParam(PARAM_IdVino);
	navigateToProductInfo(params);
	
}