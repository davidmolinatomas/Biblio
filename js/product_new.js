function insertarProducto() {

	//insertarVariedadesUva();
	//insertarNotasDeCata();
	//insertarBodegaPersonal();
	//insertarTiendas();
	//instertarNotas();
	LiteWinery.VinoManager.insertVino(getObjetoVino(), insertVinoSucess);
}

function insertVinoSucess(idVino) {
	//alert('nuevo idVino: ' + idVino);
	navigateToProductList();
}

function getObjetoVino (){
	var vino = new Object();
	
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


