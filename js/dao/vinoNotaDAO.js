/**
 * Creacion tabla 
 */
function createTableVinoNota(tx) {
     tx.executeSql("CREATE TABLE IF NOT EXISTS vinoNota ( "+
				"idNota INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
				"idVino INTEGER, " +
				"nota VARCHAR(50), " +
				"fecha VARCHAR(50))");
    
}



/**
 * Funciones INSERT 
 */
function insertVinoNota(vinoNota){
	//alert("Dentro de insertTransactionVinoNota");
	db.transaction(function(tx){
	
		 var conditions = new Array();
		 if(vinoNota.idVino != null && vinoNota.idVino != ""){
			 conditions[0] = parseInt(vinoNota.idVino, 10);
		//	 alert("Dentro de inset vino nota conditions idvino: "+conditions[0]);
		 }else {
			 conditions[0] = "";
		 }
		 
		 if(vinoNota.nota != null && vinoNota.nota != ""){
			 conditions[1] = vinoNota.nota;
		 }else {
			 conditions[1] = "";
		 }
		 
		 if(vinoNota.fecha != null && vinoNota.fecha != ""){
			 conditions[2] = vinoNota.fecha;
		 }else {
			 conditions[2] = "";
		 }
		
		 tx.executeSql("INSERT INTO vinoNota (idVino,nota,fecha)VALUES (?,?,?)",
				 conditions);
		// alert("Insert vinoNota realizado");
	
	}, errorInsert, successInsert);
	
}

/**
 * Funciones DELETE 
 */
function deleteVinoNotaByIdVino(vinoNota){
	//alert("Dentro de deleteVinoNota");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM vinoNota where idVino = ?', vinoNota.idVino,  successDelete, errorDelete);
	},  errorDelete, successDelete);
}

function deleteVinoNotaByIdNota(vinoNota){
	//alert("Dentro de deleteVinoNota");
	var idNota = new Array();
	idNota[0]= parseInt(vinoNota, 10);
	//alert("idNota: "+idNota[0]);

	db.transaction(function(tx){
		//alert("Ejecutando query deleteVinoNota");
		tx.executeSql('DELETE FROM vinoNota where idNota = ?', idNota,  successDelete, errorDelete);
	},  errorDelete, successDelete);
	
	//alert("Query deletevino nota realizado");
}

function successDelete(tx, results){
//	alert ("successDelete");
}

function errorDelete (){
//	alert ("errorDelete");
}
