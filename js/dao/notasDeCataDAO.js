/**
 * Creacion tabla 
 */
function createTableNotasDeCata(tx) {
     tx.executeSql("CREATE TABLE IF NOT EXISTS notasDeCata ( "+
				"idVino INTEGER NOT NULL, " +
				"colorOpinion VARCHAR(200), " +
				"colorPuntuacion VARCHAR(200), " +
				"aromaOpinion VARCHAR(200), " +
				"aromaPuntuacion VARCHAR(200), " +
				"gustoOpinion VARCHAR(200), " +
				"gustoPuntuacion VARCHAR(200), " +
				"globalOpinion VARCHAR(200), " +
				"globalPuntuacion VARCHAR(200))");
    
}

/**
 * Funciones INSERT 
 */
function insertNotasDeCata(notasDeCata){
	//alert("Dentro de insertTransactionVinoDAO");
	db.transaction(function(tx){
	
		 var conditions = new Array();
		 
		 if(notasDeCata.idVino != null && notasDeCata.idVino != ""){
			 conditions[0] = notasDeCata.idVino;
		 }else {
			 conditions[0] = "";
		 }
		 
		 if(notasDeCata.colorOpinion != null && notasDeCata.colorOpinion != ""){
			 conditions[1] = notasDeCata.colorOpinion;
		 }else {
			 conditions[1] = "";
		 }
		 
		 if(notasDeCata.colorPuntuacion != null && notasDeCata.colorPuntuacion != ""){
			 conditions[2] = notasDeCata.colorPuntuacion;
		 }else {
			 conditions[2] = "";
		 }
		 
		 if(notasDeCata.aromaOpinion != null && notasDeCata.aromaOpinion != ""){
			 conditions[3] = notasDeCata.aromaOpinion;
		 }else {
			 conditions[3] = "";
		 }
		 
		 if(notasDeCata.aromaPuntuacion != null && notasDeCata.aromaPuntuacion != ""){
			 conditions[4] = notasDeCata.aromaPuntuacion;
		 }else {
			 conditions[4] = "";
		 }
		 
		 if(notasDeCata.gustoOpinion != null && notasDeCata.gustoOpinion != ""){
			 conditions[5] = notasDeCata.gustoOpinion;
		 }else {
			 conditions[5] = "";
		 }
		 
		 if(notasDeCata.gustoPuntuacion != null && notasDeCata.gustoPuntuacion != ""){
			 conditions[6] = notasDeCata.gustoPuntuacion;
		 }else {
			 conditions[6] = "";
		 }
		 
		 if(notasDeCata.globalOpinion != null && notasDeCata.globalOpinion != ""){
			 conditions[7] = notasDeCata.globalOpinion;
		 }else {
			 conditions[7] = "";
		 }
		 
		 if(notasDeCata.globalPuntuacion != null && notasDeCata.globalPuntuacion != ""){
			 conditions[8] = notasDeCata.globalPuntuacion;
		 }else {
			 conditions[8] = "";
		 }
		// alert("Array conditions creado");
		 tx.executeSql("INSERT INTO notasDeCata (idVino, colorOpinion, colorPuntuacion,aromaOpinion,aromaPuntuacion, gustoOpinion,gustoPuntuacion,globalOpinion,globalPuntuacion )" +
		 		"VALUES (?,?,?,?,?,?,?,?,?)",
				 conditions);
		// alert("Insert bodega realitzado");
	
	}, errorInsert, successInsert);
	
	
}


/**
 * Funciones DELETE 
 */
function deleteNotasDeCata(notasDeCata){
	//alert("Dentro de deleteNotasDeCata");
	db.transaction(function(tx){
		tx.executeSql('DELETE FROM notasDeCata where idVino = ?', notasDeCata.idVino, successDelete, errorDelete);
	}, errorSelect, successSelect);
	
}