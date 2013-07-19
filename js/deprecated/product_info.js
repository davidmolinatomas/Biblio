
// Variables
var vinoAux = new Object();
var nombre="";

//var idLastVino;

//var listaDeNotas = new Array();

var listaNotasDeCata = new Array();

$(document).on('pagebeforeshow', '#product_info', function(){
	initialFunction();
	//renderProductHeader();
	//renderProductInfoContent();
	
});


function initialFunction() {
	LiteWinery.VinoManager.selectByIdVino(
			getURLParam(PARAM_IdVino),
			successSelectVinoInfo);
	/*
	
//   	alert("Abriendo base datos para cargar db");
   	openDataBase();
//  	alert("Obteniendo el idVino");
    idVino= getURLParam(PARAM_IdVino);
    selectAutoincrementalID(); // => LiteWinery.VinoManager.getNextIdVino();
   	selectVinoInfo();
   //	selectNotasDeCataByIdVino();
   //	selectVinoTipoUvaByIdVino();
   //	selectLugaresDeCompra();
   	selectNotasByIdVino(); 	 */
}

//function successSelectVinoInfo(tx, results){
function successSelectVinoInfo(vino){
	document.getElementById('spanNombre').innerHTML = vino.nombre;
	document.getElementById('spanTipoVino').innerHTML = vino.tipoVino;
	document.getElementById('spanAnada').innerHTML = vino.anada;
	document.getElementById('spanAlcohol').innerHTML = vino.alcohol;
	document.getElementById('spanMaduracion').innerHTML = vino.maduracion;
	document.getElementById('spanPaisOrigen').innerHTML = vino.paisOrigen;
	document.getElementById('spanDOrigen').innerHTML = vino.dOrigen;
	document.getElementById('spanBodega').innerHTML = vino.bodega;
	
	vinoAux.nombre = vino.nombre;
	vinoAux.tipoVino = vino.tipoVino;
	vinoAux.anada = vino.anada;
	vinoAux.alcohol = vino.alcohol;
	vinoAux.maduracion = vino.maduracion;
	vinoAux.paisOrigen = vino.paisOrigen;
	vinoAux.dOrigen = vino.dOrigen;
	vinoAux.bodega = vino.bodega;
}

/*
* Get autoincrement id
*========================================================================================================
*/
function selectAutoincrementalID(){
	db.transaction(selectAutoincremental,successAutoincremental, errorAutoincremental);
}

function selectAutoincremental(tx){
	alert ("selectAutoincremental");
	tx.executeSql('SELECT seq FROM sqlite_sequence WHERE name = "vino"', [], successAutoincremental, errorAutoincremental);
}

function successAutoincremental(tx, results){
	alert("successAutoincremental");
	var len = results.rows.length;
	alert ("Numero vinos: "+len);
	var maximoId = new Array();
	for(var i =0; i<len; i++){
		maximoId[i]= results.rows.item(i).seq;
	}
	
	idLastVino = maximo(maximoId);
	
	alert ("idLastVino: "+idLastVino);
}


function errorAutoincremental (){
//alert ("Error errorSelectVinoInfo");
}

function maximo(arrayCandidatos){
	alert("Dentro de maximo");
	alert("arrayCandidatos: "+arrayCandidatos);
	var aux = 0;
	for(var i =0; i< arrayCandidatos.length; i++){
		if(aux < arrayCandidatos[i]){
			aux = arrayCandidatos[i];
		}
	}
	return aux;
}
/*
 * Funciones de renderizado
 * ============================================================================================================================0 
 */
function renderProductInfoContent(){
//	alert("renderProductInfoPage ");
	var html = '';
	
	html += '<ul data-role="listview" data-inset="true">';
	html += '<li class="title">General</li>';		
	html += '<li class="withoutimage"><span class="name">Nombre</span><br>';
	html += '<span class="comment2" id="spanNombre"></span></li>';
	html += '<li class="withoutimage"><span class="name">Añada</span><br>';
	html += '<span class="comment2" id = "spanAnada"></span></li>';
	html += '<li class="withoutimage"><span class="name">Tipo</span><br>';
	html += '<span class="comment2" id= "spanTipoVino"></span></li>';
	
	html += '<li class="withoutimage"><span class="name">Alcohol</span><br>';
	html += '<span class="comment2" id= "spanAlcohol"></span><span class="comment2" id= "spanAlcohol"> %</span></li>';
	html += '<li class="withoutimage"><span class="name">Bodega</span><br>';
	html += '<span class="comment2" id= "spanBodega"></span></li>';
	html += '<li class="withoutimage"><span class="name">Denominación de origen</span><br>';
	html += '<span class="comment2" id= "spanDOrigen"></span></li>';
	html += '<li class="withoutimage"><span class="name">País de origen</span><br>';
	html += '<span class="comment2" id ="spanPaisOrigen"></span></li>';
	html += '<li class="withoutimage" style="height:60px!important"><span class="name">Maduración</span><br>';
	html += '<span class="comment2" id= "spanMaduracion" style="white-space:normal;"></span></li>';
	
	html += '<li class="withoutimage" style="height:75px!important" id="listaVariedadUvas">';
	html += '<span class="name">Variedades de uva</span><span class="comment" id="spanVariedadUva0"></span><span class="comment" id="spanPorcentaje0"></span><br/></li>';
	html += '</ul>';
	
	// Notas de Cata
	
//	html += '<ul data-role="listview" data-theme="d" data-divider-theme="d" class="ui-listview">';
//	html += '<li data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-d ui-li-has-count">Friday, October 8, 2010 <span class="ui-li-count ui-btn-up-c ui-btn-corner-all">2</span></li>';
//	html += '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r" data-iconpos="right" ';
//	html += 'data-theme="d" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d">';
//	html += '<div class="ui-btn-inner ui-li">';
//	html += '<div class="ui-btn-text">';
//	html += '<a href="index.html" class="ui-link-inherit">';
//	html += '<p class="ui-li-aside ui-li-desc"><strong>6:24</strong>PM</p>';
//	html += '<h3 class="ui-li-heading">Stephen Weber</h3>';
//	html += '<p class="ui-li-desc"><strong>You've been invited to a meeting at Filament Group in Boston, MA</strong></p>';
//	html += '<p class="ui-li-desc">Hey Stephen, if you're available at 10am tomorrow, we've got a meeting with the jQuery team.</p></a></div>';
//	html += '<span class="ui-icon ui-icon-arrow-r ui-icon-shadow">&nbsp;</span></li></ul>';	
	
	// Cabecera collapsible list Notas

	
	html += '<div data-role="collapsible-set" data-theme="a" data-content-theme="d">';
	html += '<div id="divCollapsibleNotas" data-role="collapsible">';
	html += '<h2 id="h2CollapsibleNotas" data-icon="arrow-d">Tiendas</h2>';
	html += '<span id= "spanCollapsibleNotas"></span>';
//	html += '<ul id="ulCollapsibleNotas" data-role="listview" data-split-icon="minus" data-split-theme="d" data-divider-theme="d">';
//	html += '<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-li-count">248</span></li>';
//	html += '<li data-role="fieldcontain">';
//	html += '<a href="index.html">';
//	html += '<h3>Nota: </h3>';
//	html += '<p><strong></strong></p>';
//	html += '<p></p>';
//	html += '<p class="ui-li-aside"><strong>6:24</strong>PM</p>';
//	html += '</a>';
//	html += '<a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Pur</a>';
//	html += '</li>';	
//	html += '<li><a href="index.html">';		
//	html += '<h3>Agregar nuevo</h3>';			
//	html += '</a>';				
//	html += '</li>';					
//	html += '</ul>';						
	html += '</div>';							
	html += '</div>';							
	
	$('#product_info_container').html(html);
	$('#product_info_container').trigger('create');
	
}

function renderProductHeader(){
//	alert("renderProductHeader");
	var html2 = '';
	html2 +='<h3>LiteWinery</h3><div data-role="navbar" data-iconpos="top" >';
	html2 += '<ul><li><a  href="index.html" data-theme="" data-icon="home">Home</a></li>';
	html2 += '<li><a href="product_search.html" data-transition="fade" data-theme="" data-icon="search">Search</a></li>';
	html2 += '<li><a onclick="editProduct_Info();" data-transition="fade" data-theme="" data-icon="edit">Edit</a></li>';
	html2 += '<li><a href="index.html" onclick="deleteVino(getURLParams());" data-transition="fade" data-theme="" data-icon="minus">Delete</a></li></ul>';
	html2 += '</div>';
	$('#product_info_navigationBar').html(html2);
	$('#product_info_navigationBar').trigger('create');
}

function editProduct_Info(){
	renderProductInfoNavBar();
	renderProductInfoContentEditionMode();
}

function renderProductInfoNavBar(){
//	alert("renderProductInfoNavBar");
	var html2 = '';
	
	html2 +='<h3>LiteWinery</h3><div data-role="navbar" data-iconpos="top" >';
	html2 += '<ul><li><a  href="index.html" data-theme="" data-icon="home">Home</a></li>';
	html2 += '<li><a href="product_search.html" data-transition="fade" data-theme="" data-icon="search">Search</a></li>';
	html2 += '<li><a href="index.html" onclick="insertarProductoEditado();"  data-transition="fade" data-theme="" data-icon="plus" >Save</a></li>';
	html2 += '<li><a href="index.html" onclick="deleteVino(getURLParams());" data-transition="fade" data-theme="" data-icon="minus">Delete</a></li></ul>';
	html2 += '</div>';
	
	$('#product_info_navigationBar').html(html2);
	$('#product_info_navigationBar').trigger('create');
	
}



function renderProductInfoContentEditionMode(){
//	alert("renderProductInfoPage ");
	
	var html = '';
	
	html += '<ul data-role="listview" data-inset="true">';
	html += '<li class="title">General</li>';		
	html += '<li class="withoutimage"><span class="name">Nombre</span><br>';
	html += '<span class="comment2" id="spanNombre"><input type="text" id="inputNombre"></span></li>';
	html += '<li class="withoutimage"><span class="name">Añada</span><br>';
	html += '<span class="comment2" id = "spanAnada"><input type="text" id="inputAnada"></span></li>';
	html += '<li class="withoutimage"><span class="name">Tipo</span><br>';
	html += '<span class="comment2" id= "spanTipoVino"><input type="text" id="inputTipoVino"></span></li>';
	
	html += '<li class="withoutimage"><span class="name">Alcohol</span>';
	html += '<div class="ui-grid-c"><div class="ui-block-a"><span  class="comment2" id= "spanAlcohol"><input class="inputNuevoProducto" id="inputAlcohol" type="text"></span></div>';
	html += '<div class="ui-block-b" id=divPercentaje><span class="comment2" >%</span></div></div></li>';
	
	html += '<li class="withoutimage"><span class="name">Bodega</span><br>';
	html += '<span class="comment2" id= "spanBodega"><input type="text" id="inputBodega"></span></li>';
	html += '<li class="withoutimage"><span class="name">Denominación de origen</span><br>';
	html += '<span class="comment2" id= "spanDOrigen"><input type="text" id="inputdOrigen"></span></li>';
	html += '<li class="withoutimage"><span class="name">País de origen</span><br>';
	html += '<span class="comment2" id ="spanPaisOrigen"><input type="text" id="inputPaisOrigen"></span></li>';
	html += '<li class="withoutimage" style="height:60px!important"><span class="name">Maduración</span><br>';
	html += '<span class="comment2" id= "spanMaduracion" style="white-space:normal;"><input type="text" id="inputMaduracion"></span></li>';
	// Variedades Uvas
	html += '<li class="withoutimage" style="height:75px!important" id="listaVariedadUvas">';
	html += '<span class="name">Variedades de uva</span><span class="comment" id="spanVariedadUva0"></span><span class="comment" id="spanPorcentaje0"></span><br/></li>';
	html += '</ul>';
	
	html += '<ul id="listaNotas" data-role="listview" data-inset="true">';
	html += '<li class="title">Notas</li>';
	html += '<li class="withoutimage"></span><span class="comment" id="spanNota"><input type="text" id="inputNota"></span></li></ul>';
	//self.i_container.append(html);
	$('#product_info_container').html(html);
	$('#product_info_container').trigger('create');
	
//	alert(" Fin renderizado");
	
//	$('#inputNombre').val(vinoAux.nombre);
	fillContentEditionMode();
}


function fillContentEditionMode(){
//	alert("fillContentEditionMode");
	
	$('#inputNombre').val(vinoAux.nombre);
	$('#inputTipoVino').val(vinoAux.tipoVino);
	$('#inputAnada').val(vinoAux.anada);
	$('#inputAlcohol').val(vinoAux.alcohol);
	$('#inputMaduracion').val(vinoAux.maduracion);
	$('#inputPaisOrigen').val(vinoAux.paisOrigen);
	$('#inputdOrigen').val(vinoAux.dOrigen);
	$('#inputBodega').val(vinoAux.bodega);
}

function crearObjetoVinoProductInfo (){
//	alert("crearObjetoVinoProductInfo");
	var vino = new Object();
	vino.nombre = document.getElementById("spanNombre").value;
	vino.tipoVino = document.getElementById("spanTipoVino").value;
	vino.anada = document.getElementById("spanAnada").value;			
	vino.alcohol = document.getElementById("spanAlcohol").value;			
	vino.maduracion	= document.getElementById("spanMaduracion").value;	
	vino.paisOrigen	= document.getElementById("spanPaisOrigen").value;		
	vino.dOrigen = document.getElementById("spanDOrigen").value;			
	vino.bodega	= document.getElementById("spanBodega").value;		
	return vino;
}

function insertarProductoEditado() {

	// insertarVariedadesUva();
	// insertarNotasDeCata();
	//insertarBodegaPersonal();
	//insertarTiendas();
	
	insertVino(crearObjetoVino());
	
	if(LiteWinery.listaDeNotas.length !=0){
		alert("dentro de insertasrproducto contorllenght listanotas");
		for(var i=0; i<LiteWinery.listaDeNotas.length; i++){
			LiteWinery.listaDeNotas[i].idVino = idLastVino+1;
			insertVinoNota(LiteWinery.listaDeNotas[i]);
			alert("dentro del for");
		}
		
		insertVinoNota(crearObjetoVinoNota());
	}
	else{
		alert("dentro del elese");
		insertVinoNota(crearObjetoVinoNota());
	}
	
}


function crearObjetoVinoNota(objetoNota){
	var vinoNota = new Object();
	
	vinoNota.idVino = idLastVino+1;
	vinoNota.nota = document.getElementById("inputNota").value;
	vinoNota.fecha = calcularFechaActual();
	alert("vinoNota: ID "+vinoNota.idVino+" Nota: "+vinoNota.nota+" Fecha: "+vinoNota.fecha);
	return vinoNota;
}

/*
* Funcion select Notas
* ===========================================================================================================================================
*/
function selectNotasByIdVino(){
	alert("dentro de  selectNotasByIdVino");
	db.transaction(selectNotaById,successSelecNota, errorSelectNota);
}

function selectNotaById(tx){
		alert("dentro de selectNotaById");
		var conditions = new Array();
		conditions[0]= parseInt(idVino, 10);
		alert("conditions[0] idvino: "+conditions[0]);
		//tx.executeSql('SELECT * FROM vinoNota where idVino = ?', conditions, successSelecNota, errorSelectNota);
		tx.executeSql('SELECT * FROM vinoNota ', [], successSelecNota, errorSelectNota);
}


function successSelecNota(tx, results){
	alert ("successSelecNota");
	var len = results.rows.length;
	alert(len);
	if(len!= 0){
		for(var i=0; i<len; i++){
			
			LiteWinery.listaDeNotas[i] = new Object();
			LiteWinery.listaDeNotas[i].fecha = results.rows.item(i).fecha;
			LiteWinery.listaDeNotas[i].nota = results.rows.item(i).nota;
			LiteWinery.listaDeNotas[i].idNota = results.rows.item(i).idNota;
			LiteWinery.listaDeNotas[i].idVino = results.rows.item(i).idVino;
		}
		
	}
	if(LiteWinery.listaDeNotas.length !=0){
		var html = '';
		
		html += '<ul id="ulCollapsibleNotas" data-role="listview" data-split-icon="minus" data-split-theme="d" data-divider-theme="d">';
		for(var i=0; i<LiteWinery.listaDeNotas.length; i++){
				
			html += '<li data-role="list-divider">'+LiteWinery.listaDeNotas[i].fecha+'</li>';
			html += '<li data-role="fieldcontain">';
			html += '<a href="index.html">';
		//	html += '<h3>Nota: </h3>';
			html += '<p><strong>'+LiteWinery.listaDeNotas[i].nota+'</strong></p>';
		//	html += '<p></p>';
			html += '<p class="ui-li-aside"><strong>6:24</strong></p>';
			html += '</a>';
			html += '<a id="linkDeleteNota'+i+'"  onclick="refreshNotas('+LiteWinery.listaDeNotas[i].idNota+');" data-rel="popup" data-position-to="window" data-transition="pop">Delete</a>';
			html += '</li>';	
			alert("Lite: "+LiteWinery.listaDeNotas[i].idNota);
		}
		
		html += '<li><a href="index.html" onclick="addNota()">';		
		html += '<h3>Agregar nuevo</h3>';			
		html += '</a>';				
		html += '</li>';
		html += '</ul>';
		
		$('#spanCollapsibleNotas').html(html);
		$('#spanCollapsibleNotas').trigger('create');
	}
	
}

function addNota(){
	
	
}
function errorSelectNota (){
	alert (" errorSelectNota");
}

function refreshNotas(objectIdNota){
	alert("refreshNotas");
	deleteVinoNotaByIdNota(objectIdNota);
	refreshPage();
	
}

function refreshPage(page){
    // Page refresh
    page.trigger('pagecreate');
    page.listview('refresh');
}
//function refreshPage()
//{
//    jQuery.mobile.changePage(window.location.href, {
//        allowSamePageTransition: true,
//        transition: 'none',
//        reloadPage: true
//    });
//}
/*
* Funcion select Notas
* ===========================================================================================================================================
*/

function selectNotasDeCataByIdVino(){
	alert("dentro de  selectTiendasAllByNombre");
	db.transaction(selectNotasDeCataById,successSelectNotasDeCata, errorSelectNotasDeCata);
}

function selectNotasDeCataById(tx){
	alert("dentro de selectNotasDeCataById");
	var conditions = new Array();
	conditions[0]= idVino;
	tx.executeSql('SELECT * FROM notasDeCata where idVino = ?', conditions, successSelectNotasDeCata, errorSelectNotasDeCata);
}


function successSelectNotasDeCata(tx, results){
alert("dentro de successSelectTienda");
	if(result!=null)
	{
		
		for(var i=0; i<results.rows.length; i++){
		
			listaNotasDeCata[i] = new Object();
			listaNotasDeCata[i].idVino = results.rows.item(i).idVino;
			listaNotasDeCata[i].colorOpinion = results.rows.item(i).colorOpinion;
			listaNotasDeCata[i].colorPuntuacion = results.rows.item(i).colorPuntuacion;
			listaNotasDeCata[i].aromaOpinion = results.rows.item(i).aromaOpinion;
			listaNotasDeCata[i].aromaPuntuacion = results.rows.item(i).aromaPuntuacion;
			listaNotasDeCata[i].gustoOpinion = results.rows.item(i).gustoOpinion;
			listaNotasDeCata[i].gustoPuntuacion = results.rows.item(i).gustoPuntuacion;
			listaNotasDeCata[i].globalOpinion = results.rows.item(i).globalOpinion;
			listaNotasDeCata[i].globalPuntuacion = results.rows.item(i).globalPuntuacion;
			
			alert("Lista de notas de cata: "+listaNotasDeCata[i].colorOpinion);
			
		}
	
	} 
	
	if(listaNotasDeCata.length !=0){
		var html = '';
		html += '<ul data-role="listview" data-theme="" data-divider-theme="" class="ui-listview">';
		for(var i=0; i<listaDeNotas.length; i++){
			
			html += '<li id="listaNotaDeCata'+i+'" data-role="list-divider" role="heading" class="ui-li ui-li-divider ui-bar-d ui-li-has-count">'+listaDeNotas[i].fecha+'</li>';
			html += '<li data-corners="false" data-shadow="false" data-iconshadow="true" data-wrapperels="div" data-icon="arrow-r"';
			html += 'data-iconpos="right" data-theme="" class="ui-btn ui-btn-icon-right ui-li-has-arrow ui-li ui-btn-up-d">';
			html += '<div class="ui-btn-inner ui-li"><div class="ui-btn-text">';
			html += '<a class="ui-link-inherit"><p id="listaNotaNota'+i+'" class="ui-li-desc"><strong>'+listaDeNotas[i].nota+'</strong></p>';
			html += '</a></div></div></li>';
		}
		
		
		html += '</ul></div>';
		$('#divCollapsibleNotas').trigger('destroy');
		$('#divCollapsibleNotas').html(html);
		$('#divCollapsibleNotas').trigger('create');
	}

}


function errorSelectNotasDeCata (){
alert (" errorSelectNotasDeCata");
}