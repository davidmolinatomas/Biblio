/**
 * Creacion tabla 
 */
function createTableVinoTipoUva(tx) {
     tx.executeSql("CREATE TABLE IF NOT EXISTS vinoTipoUva ( "+
				"idVino INTEGER NOT NULL, " +
				"idTipoUva INTEGER NOT NULL, " +
				"porcentaje INTEGER)");
    
}



/**
 * Funciones INSERT 
 */
function insertVinoTipoUva(vinoTipoUva){
	//alert("Dentro de insertTransactionVinoTienda");
	db.transaction(function(tx){
	
		 var conditions = new Array();
		 if(vinoTipoUva.idVino != null && vinoTipoUva.idVino != ""){
			 conditions[0] = vinoTipoUva.idVino;
		 }else {
			 conditions[0] = "";
		 }
		 
		 if(vinoTipoUva.idTipoUva != null && vinoTipoUva.idTipoUva != ""){
			 conditions[1] = vinoTipoUva.idTipoUva;
		 }else {
			 conditions[1] = "";
		 }
		 
		 if(vinoTipoUva.porcentaje != null && vinoTipoUva.porcentaje != ""){
			 conditions[2] = vinoTipoUva.porcentaje;
		 }else {
			 conditions[2] = "";
		 }
		 
		 tx.executeSql("INSERT INTO vinoTipoUva (idVino,idTipoUva,porcentaje)VALUES (?,?,?)",
				 conditions);
		 //alert("Insert vinoTipoUva realizado");
	
	}, errorInsert, successInsert);
	
}

/**
 * Funciones DELETE 
 */
function deleteVinoTipoUvaByIdVino(vinoTipoUva){
	//alert("Dentro de deleteVinoTienda");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM vinoTipoUva where idVino = ?', vinoTipoUva.idVino, successDelete, errorDelete);
	}, errorSelect, successSelect);
}

function deleteVinoTipoUvaByIdTipoUva(vinoTipoUva){
	//alert("Dentro de deleteVinoTienda");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM vinoTipoUva where idTipoUva = ?', vinoTipoUva.idTipoUva, successDelete, errorDelete);
	}, errorSelect, successSelect);
}