/**
 * Creacion tabla 
 */
function createTableTipoUva(tx) {
     tx.executeSql("CREATE TABLE IF NOT EXISTS tipoUva ( "+
				"idTipoUva INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
				"tipoUva VARCHAR(50), " +
				"color VARCHAR(50), " +
				"sinonimos VARCHAR(50))");
    
}

/**
 * Funciones INSERT 
 */
function insertTipoUva(tipoUva){
//	alert("Dentro de insertTransactionTienda");
	db.transaction(function(tx){
	
		 var conditions = new Array();
		 if(tipoUva.tipoUva != null && tipoUva.tipoUva != ""){
			 conditions[0] = tipoUva.tipoUva;
		 }else {
			 conditions[0] = "";
		 }
		 
		 if(tipoUva.color != null && tipoUva.color != ""){
			 conditions[1] = tipoUva.color;
		 }else {
			 conditions[1] = "";
		 }
		 
		 if(tipoUva.sinonimos != null && tipoUva.sinonimos != ""){
			 conditions[2] = tipoUva.sinonimos;
		 }else {
			 conditions[2] = "";
		 }
		 tx.executeSql("INSERT INTO tipoUva (tipoUva,color, sinonimos)VALUES (?,?, ?)",
				 conditions);
	
	}, errorInsert, successInsert);
	
}

function inicializacionTipoUva() {
	
	db.transaction(function(tx){
	tx.executeSql("INSERT INTO tipoUva (tipoUva,color, sinonimos)VALUES ('Sirah','Tinta','Chirah');" +
				  "INSERT INTO tipoUva (tipoUva,color, sinonimos)VALUES ('Samso','Tinta','Cariñena');" +
				  "INSERT INTO tipoUva (tipoUva,color, sinonimos)VALUES ('Macabeu','Blanca','');"
				 );
	//alert("Inicializacion tipoUva realizado");
	
	}, errorInsert, successInsert);
	
}

/**
 * Funciones DELETE 
 */
function deleteTipoUva(tipoUva){
//	alert("Dentro de deleteTipoUva");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM tipoUva where idTipoUva = ?', tipoUva.idTipoUva, successDelete, errorDelete);
	}, errorSelect, successSelect);
	
}