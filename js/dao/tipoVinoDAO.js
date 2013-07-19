/**
 * Creacion tabla 
 */
function createTableTipoVino(tx) {
     tx.executeSql("CREATE TABLE IF NOT EXISTS tipoVino ( "+
				"idTipoVino INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
				"tipoVino VARCHAR(50))");
    
}

/**
 * Funciones INSERT 
 */
function insertTipoVino(tipoVino){
	//alert("Dentro de insertTransactionTipoVino");
	db.transaction(function(tx){
	
		 var conditions = new Array();
		 if(tipoVino.tipoVino != null && tipoVino.tipoVino != ""){
			 conditions[0] = tipoVino.tipoVino;
		 }else {
			 conditions[0] = "";
		 }
		 
		
		// alert("Array conditions creado");
		 tx.executeSql("INSERT INTO tipoUva (tipoVino)VALUES (?)",
				 conditions);
		 //alert("Insert tipo vino realizado");
	
	}, errorInsert, successInsert);
	
}

/**
 * Funciones DELETE 
 */
function deleteTipoVino(tipoVino){
	//alert("Dentro de deleteTipoVino");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM tipoVino where idTipoVino = ?', tipoVino.idTipoVino, successDelete, errorDelete);
	}, errorSelect, successSelect);
	
}