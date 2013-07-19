/**
 * Creacion tabla 
 */
function createTableBodegaPersonal(tx) {
     tx.executeSql('CREATE TABLE IF NOT EXISTS  bodegaPersonal ( '+
				"idBodegaPersonal INTEGER PRIMARY KEY AUTOINCREMENT, " +
				"nombreBodega VARCHAR(50)) ");
    
}


/**
 * Funciones INSERT 
 */
function insertBodegaPersonal(bodegaPersonal){
	//alert("Dentro de insertTransactionVinoDAO");
	db.transaction(function(tx){
	
		 var conditions = new Array();
		 if(bodegaPersonal.nombreBodega != null && bodegaPersonal.nombreBodega != ""){
			 conditions[0] = bodegaPersonal.nombreBodega;
		 }else {
			 conditions[0] = "";
		 }
		 tx.executeSql("INSERT INTO bodegaPersonal (nombreBodega)VALUES (?)",
				 conditions);
		// alert("Insert bodega realitzado");
	
	}, errorInsert, successInsert);
	
	
}

/**
 * Funciones DELETE 
 */
function deleteBodegaPersonal(bodegaPersonal){
	//alert("Dentro de deleteBodegaPersonal");
	
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM bodegaPersonal where idBodegaPersonal = ?', bodegaPersonal.idBodegaPersonal, successDelete, errorDelete);
	}, errorSelect, successSelect);
	
}