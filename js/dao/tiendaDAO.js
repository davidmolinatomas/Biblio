/**
 * Creacion tabla 
 */
function createTableTienda(tx) {
     tx.executeSql("CREATE TABLE IF NOT EXISTS tienda ( "+
				"idTienda INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
				"nombreTienda VARCHAR(50), " +
				"direccion VARCHAR(50))");
    
}


/**
 * Funciones INSERT 
 */
function insertTienda(tienda){
//	alert("Dentro de insertTransactionTienda");
	db.transaction(function(tx){
	
		 var conditions = new Array();
		 if(tienda.nombreTienda != null && tienda.nombreTienda != ""){
			 conditions[0] = tienda.nombreTienda;
		 }else {
			 conditions[0] = "";
		 }
		 
		 if(tienda.direccion != null && tienda.direccion != ""){
			 conditions[1] = tienda.direccion;
		 }else {
			 conditions[1] = "";
		 }
		 
		 tx.executeSql("INSERT INTO tienda (nombreTienda,direccion)VALUES (?,?)",
				 conditions);
		// alert("Insert tienda realitzado");
	
	}, errorInsert, successInsert);
	
	
}

/**
 * Funciones DELETE 
 */
function deleteTienda(tienda){
	//alert("Dentro de deleteTienda");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM tienda where idTienda = ?', tienda.idTienda, successDelete, errorDelete);
	}, errorSelect, successSelect);
	
}
