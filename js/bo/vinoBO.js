
/**
 * Include de las Constantes 
 */
//include("js/constants.js");

/**
 * Include de los DAOs
 */
include("js/dao/bodegaPersonalDAO.js");
include("js/dao/notasDeCataDAO.js");
include("js/dao/tiendaDAO.js");
include("js/dao/tipoUvaDAO.js");
include("js/dao/tipoVinoDAO.js");
include("js/dao/vinoBodegaPersonalDAO.js");

include("js/dao/vinoNotaDAO.js");
include("js/dao/vinoTiendaDAO.js");
include("js/dao/vinoTipoUvaDAO.js");

var db = null;

/**
 * Abrir base de datos
 */
function openDataBase(){
	//alert("Abriendo base de datos..");
	db = window.openDatabase(Constants.database.database_name, Constants.database.database_version, Constants.database.database_display, Constants.database.database_size);
	//alert("Base de datos abierta, retornando objeto db...");
	return db;
}

/**
 * Creacion tablas 
 */
function createTables(){
//	alert("Iniciando transaction create Tables");
	db.transaction(createTableVino, errorCB, successCB);
	db.transaction(createTableBodegaPersonal, errorCB, successCB);
	db.transaction(createTableNotasDeCata, errorCB, successCB);
	db.transaction(createTableTienda, errorCB, successCB);
	db.transaction(createTableTipoUva, errorCB, successCB);
	db.transaction(createTableTipoVino, errorCB, successCB);
	db.transaction(createTableVinoBodegaPersonal, errorCB, successCB);
	db.transaction(createTableVinoNota, errorCB, successCB);
	db.transaction(createTableVinoTienda, errorCB, successCB);
	db.transaction(createTableVinoTipoUva, errorCB, successCB);
//	alert("Creacion de todas las tablas correctamente");
}
function errorCB(err) {
   // alert("Error al crear tabla: "+err.code);
}


function successCB() {
//    alert("Tabla creada correctamente");
}


/**
 * Funciones callback insert
 */

function successInsert(tx, results){
//	alert ("Insersion correcta");
}

function errorInsert (){
	//alert ("Error al insertar datos en la base de datos");
}

/**
 * Funciones callback delete
 */


function deleteVinoById(idVino)
{
	deleteVino(idVino);
	deleteNotasDeCata(idVino);
	deleteVinoBodegaPersonalByIdVino(idVino);
	deleteVinoNotaByIdVino(idVino);
	deleteVinoTiendaByIdVino(idVino);
	deleteVinoTipoUvaByIdVino(idVino);
}



