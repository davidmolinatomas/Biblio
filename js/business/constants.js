/**
 * Parámetros de la base de datos
 */
var Constants = {
	database: {
		database_name : 'liteWineryDB',
		database_version : '1.0',
		database_displayname : 'LiteWineryDB'.
		database_size = 65536,
		lastResultSelect : null
	}
};

var PARAM_IdVino = "idVino";

var TABLA_Vino = "vino";


var debug_database = true;
var debug_database_callback = false;

var debug_installer = true;
var debug_installer_callback = true;

var debug_vino = false;