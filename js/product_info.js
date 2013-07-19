
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

function goToEdition(){
	var params = '';
	params += PARAM_IdVino;
	params += '=';
	params += getURLParam(PARAM_IdVino);
	navigateToProductEdit(params);
}
/*
 * Funciones de renderizado
 * ============================================================================================================================0 
 */

function crearObjetoVinoNota(objetoNota){
	var vinoNota = new Object();
	
	vinoNota.idVino = idLastVino+1;
	vinoNota.nota = document.getElementById("inputNota").value;
	vinoNota.fecha = calcularFechaActual();
	//alert("vinoNota: ID "+vinoNota.idVino+" Nota: "+vinoNota.nota+" Fecha: "+vinoNota.fecha);
	return vinoNota;
}



/*
 * Funciones de eliminar
 * ============================================================================================================================0 
 */

function eliminarProducto(){
	
	LiteWinery.VinoManager.deleteVino(getURLParam(PARAM_IdVino),navigateToProductList());
	
}

/*
* Funcion select Notas
* ===========================================================================================================================================
*/
function selectNotasByIdVino(){
//	alert("dentro de  selectNotasByIdVino");
	db.transaction(selectNotaById,successSelecNota, errorSelectNota);
}

function selectNotaById(tx){
	//	alert("dentro de selectNotaById");
		var conditions = new Array();
		conditions[0]= parseInt(idVino, 10);
//		alert("conditions[0] idvino: "+conditions[0]);
		//tx.executeSql('SELECT * FROM vinoNota where idVino = ?', conditions, successSelecNota, errorSelectNota);
		tx.executeSql('SELECT * FROM vinoNota ', [], successSelecNota, errorSelectNota);
}


function successSelecNota(tx, results){
//	alert ("successSelecNota");
	var len = results.rows.length;
//	alert(len);
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
			//alert("Lite: "+LiteWinery.listaDeNotas[i].idNota);
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
//	alert (" errorSelectNota");
}

function refreshNotas(objectIdNota){
//	alert("refreshNotas");
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
	//alert("dentro de  selectTiendasAllByNombre");
	db.transaction(selectNotasDeCataById,successSelectNotasDeCata, errorSelectNotasDeCata);
}

function selectNotasDeCataById(tx){
	//alert("dentro de selectNotasDeCataById");
	var conditions = new Array();
	conditions[0]= idVino;
	tx.executeSql('SELECT * FROM notasDeCata where idVino = ?', conditions, successSelectNotasDeCata, errorSelectNotasDeCata);
}


function successSelectNotasDeCata(tx, results){
//alert("dentro de successSelectTienda");
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
			
			//alert("Lista de notas de cata: "+listaNotasDeCata[i].colorOpinion);
			
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
//alert (" errorSelectNotasDeCata");
}