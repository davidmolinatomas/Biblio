/**
 * Creacion tabla 
 */
function createTableVinoTienda(tx) {
     tx.executeSql("CREATE TABLE IF NOT EXISTS vinoTienda ( "+
				"idTienda INTEGER, " +
				"idVino INTEGER NOT NULL, " +
				"precio VARCHAR(50), " +
				"fechaActualizacion VARCHAR(50))");
    
}


/**
 * Funciones INSERT 
 */
function insertVinoTienda(vinoTienda){
	//alert("Dentro de insertTransactionVinoTienda");
	db.transaction(function(tx){
	
		 var conditions = new Array();
		 if(vinoTienda.idTienda != null && vinoTienda.idTienda != ""){
			 conditions[0] = vinoTienda.idTienda;
		 }else {
			 conditions[0] = "";
		 }
		 
		 if(vinoTienda.idVino != null && vinoTienda.idVino != ""){
			 conditions[1] = vinoTienda.idVino;
		 }else {
			 conditions[1] = "";
		 }
		 
		 if(vinoTienda.precio != null && vinoTienda.precio != ""){
			 conditions[2] = vinoTienda.precio;
		 }else {
			 conditions[2] = "";
		 }
		 
		 if(vinoTienda.fechaActualizacion != null && vinoTienda.fechaActualizacion != ""){
			 conditions[3] = vinoTienda.fechaActualizacion;
		 }else {
			 conditions[3] = "";
		 }
		
		 tx.executeSql("INSERT INTO vinoTienda (idTienda, idVino,precio,fechaActualizacion)VALUES (?,?,?,?)",
				 conditions);
		// alert("Insert vinoTienda realizado");
	
	}, errorInsert, successInsert);
	
}


/**
 * Funciones DELETE 
 */
function deleteVinoTiendaByIdVino(vinoTienda){
	//alert("Dentro de deleteVinoTienda");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM vinoTienda where idVino = ?', vinoTienda.idVino, successDelete, errorDelete);
	}, errorSelect, successSelect);
}

function deleteVinoTiendaByIdTienda(vinoTienda){
	//alert("Dentro de deleteVinoTienda");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM vinoTienda where idTienda = ?', vinoTienda.idTienda, successDelete, errorDelete);
	}, errorSelect, successSelect);
}