/**
 * Creacion tabla 
 */
function createTableVinoBodegaPersonal(tx) {
     tx.executeSql("CREATE TABLE IF NOT EXISTS vinoBodegaPersonal ( "+
				"idVino INTEGER NOT NULL, " +
				"idBodegaPersonal INTEGER NOT NULL, " +
				"cantidad INTEGER )");
    
}

function errorCB(err) {
  //  alert("Error procesando SQL: "+err.code);
}


/**
 * Funciones INSERT 
 */
function insertVinoBodegaPersonal(vinoBodegaPersonal){
	//alert("Dentro de insertTransactionVinoBodegaPersonal");
	db.transaction(function(tx){
	
		 var conditions = new Array();
		 if(vinoBodegaPersonal.idVino != null && vinoBodegaPersonal.idVino != ""){
			 conditions[0] = vinoBodegaPersonal.idVino;
		 }else {
			 conditions[0] = "";
		 }
		 
		 if(vinoBodegaPersonal.idBodegaPersonal != null && vinoBodegaPersonal.idBodegaPersonal != ""){
			 conditions[1] = vinoBodegaPersonal.idBodegaPersonal;
		 }else {
			 conditions[1] = "";
		 }
		 
		 if(vinoBodegaPersonal.cantidad != null && vinoBodegaPersonal.cantidad != ""){
			 conditions[2] = vinoBodegaPersonal.cantidad;
		 }else {
			 conditions[2] = "";
		 }
		
		 tx.executeSql("INSERT INTO vinoBodegaPersonal (idVino,idBodegaPersonal,cantidad)VALUES (?,?,?)",
				 conditions);
		// alert("Insert vinoBodegaPersona realizado");
	
	}, errorInsert, successInsert);
	
}

/**
 * Funciones DELETE 
 */
function deleteVinoBodegaPersonalByIdVino(vinoBodegaPersonal){
	//alert("Dentro de deleteTipoVino");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM vinoBodegaPersonal where idVino = ?', vinoBodegaPersonal.idVino, successDelete, errorDelete);
	}, errorSelect, successSelect);
}

function deleteVinoBodegaPersonalByIdBodegaPersonal(vinoBodegaPersonal){
	//alert("Dentro de deleteTipoVino");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM vinoBodegaPersonal where idBodegaPersonal = ?', vinoBodegaPersonal.idBodegaPersonal, successDelete, errorDelete);
	}, errorSelect, successSelect);
}