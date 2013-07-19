
function DatabaseData() {
	var offset = null;
	var query = null;
	var queryType = 'none'; // 'insert', 'select', 'update', 'delete'
	var parameters = null;
	var successCallback = null;
	var errorCallback = null;
}

function DatabaseObject() {
	var self = this;
	
	var i_database = null;
	var i_queries = null;
	var i_data = null;
	
	
	
	/* **************************************************************************
	 * Constructor
	 * **************************************************************************/
	
	/* ************************************************************************ */
	this.init = function () {
		this.self = this;
		this.i_currentOffset = 0;
		this.i_data = new Array();
		this._defineQueries();
		//this.openDataBase();
	};
	
	/* ************************************************************************ */
	this._defineQueries = function () {
		self.i_queries = {};
		self.i_queries.nextId = "SELECT seq FROM sqlite_sequence WHERE name = ?";
	};
	
	/* ************************************************************************ */
	this._getData = function (offset) {
		
		if (offset === undefined || offset == null) {
			var newOffset = self.i_currentOffset++;
			
			this.i_data[newOffset] = new DatabaseData();
			
			if (self.i_currentOffset > 1000) {
				self.i_currentOffset = 0;
			}
			
			this.i_data[newOffset].offset = newOffset;
			
			if (debug_database === true) {
				alert("Nuevo offset creado: " + newOffset);
			}
			
			return this.i_data[newOffset];
		}
		else {
			return this.i_data[offset];
		}
	};
	
	/* ************************************************************************ */
	this.openDataBase = function () {
		
		if (debug_database === true) {
			alert("Abriendo base de datos");
		}
		
		if ( self.i_database == null ) {
			self.i_database = window.openDatabase(Constants.database.database_name,	Constants.database.database_version,Constants.database.database_display,Constants.database.database_size);
			alert(self.i_database);
			if (debug_database === true) {
				alert("Se ha abierto la base de datos");
			}
			alert("creo la table vinos");
			self.i_database.transaction(function(tx){
				tx.executeSql("CREATE TABLE IF NOT EXISTS vino (idVino,nombre,tipoVino,anada,alcohol,maduracion,paisOrigen,dOrigen,bodega)");
			},insertSuccess,insertError);
			alert("tabla creada");
		}
		else {
			if (debug_database === true) {
				alert("La base de datos ya estaba abierta y no se ha realizado la operación");
			}
		}
	};
	
	function insertSuccess(tx){
		alert("todo bien");
	}
	function insertError(tx){
		alert("todo mal");
	}
	/* ************************************************************************ */
	this.transaction = function (functionCallback, errorCallback) {
		/*var data = self._getData();
		data.query = successCallback;
		data.queryType = "TRANSACTION";
		data.parameters = [];
		data.successCallback = successCallback;
		data.errorCallback = errorCallback;*/
		
		if (debug_database === true) {
			alert("Iniciando ejecución de transaccion");
		}
		
	self.i_database.transaction(
				eval("(function(tx, results){functionCallback(tx, results);})"),
				eval("(function(err){errorCallback(err);})"));
	};
	
	/* **************************************************************************
	 * Incrementales
	 * **************************************************************************/
	
	/* ************************************************************************ */
	/*this.getNextId = function (nombreTabla, successCallback, errorCallback) {
		var data = self._getData();
		data.query = self.i_queries.nextId;
		data.queryType = 'select';
		data.parameters = new Array(nombreTabla);
		data.successCallback = successCallback;
		data.errorCallback = errorCallback;
		
		if (debug_database === true) {
			alert("Iniciando ejecución de SELECT NextId");
		}
		
		self.i_database.transaction(
				eval("(function(tx){self._getNextIdSelect(tx, " + data.offset.toString() + ");})"),
				eval("(function(err){self._errorCallback(err, " + data.offset.toString() + ");})"));
	};*/
	
	/* ************************************************************************ */
	/*this._getNextIdSelect = function (tx, offset) {
		if (debug_database === true) {
			alert("Ejecutando SELECT NextId");
		}
		
		var data = self._getData(offset);
		
		tx.executeSql(
				data.query,
				data.parameters,
				eval("(function(tx, results){self._getNextIdSuccess(tx, results, " + data.offset.toString() + ");})"),
				eval("(function(err){self._errorCallback(err, " + data.offset.toString() + ");})")
		);
	};*/
	
	/* ************************************************************************ */
	/*this._getNextIdSuccess = function (tx, results, offset) {
		var data = self._getData(offset);
		
		if ( ! (data.successCallback === undefined || data.successCallback == null ) ) {
			
			if (typeof(data.successCallback === 'function')) {
				data.successCallback(results.rows.item(0).seq);
			}
			else if (typeof(data.successCallback === 'string')) {
				alert(data.successCallback);
			}
		}
		
	};*/
	
	
	
	/* **************************************************************************
	 * Funciones SELECT
	 * **************************************************************************/
	
	/* ************************************************************************ */
/*	this.select = function (query, parameters, successCallback, errorCallback) {
		var data = self._getData();
		data.query = query;
		data.queryType = 'select';
		data.parameters = parameters;
		data.successCallback = successCallback;
		data.errorCallback = errorCallback;
		
		if (debug_database === true) {
			alert("Iniciando ejecución de SELECT");
		}
		
		self.i_database.transaction(
				eval("(function(tx){self._selectQuery(tx, " + data.offset.toString() + ");})"),
				eval("(function(err){self._errorCallback(err, " + data.offset.toString() + ");})"));
	};*/
	
	/* ************************************************************************ */
/*	this._selectQuery = function (tx, offset) {
		if (debug_database === true) {
			alert("Ejecutando SELECT");
		}
		
		var data = self._getData(offset);
		
		tx.executeSql(
				data.query,
				data.parameters,
				eval("(function(tx, results){self._successCallback(tx, results, " + data.offset.toString() + ");})"),
				eval("(function(err){self._errorCallback(err, " + data.offset.toString() + ");})")
		);
	};*/
	
	
	
	/* **************************************************************************
	 * Funciones CRUD
	 * **************************************************************************/
	
	/* ************************************************************************ */
	this.select = function (query, parameters, successCallback, errorCallback) {
		self.query(query, parameters, successCallback, errorCallback);
	};
	
	this.insert = function (query, parameters, successCallback, errorCallback) {
		self.query(query, parameters, successCallback, errorCallback);
	};
	
	this.remove = function (query, parameters, successCallback, errorCallback) {
		self.query(query, parameters, successCallback, errorCallback);
	};
	
	this.update = function (query, parameters, successCallback, errorCallback) {
		self.query(query, parameters, successCallback, errorCallback);
	};
	
	
	
	/* **************************************************************************
	 * Funciones Query
	 * **************************************************************************/
	
	/* ************************************************************************ */
	this.query = function (query, parameters, successCallback, errorCallback) {
		var data = self._getData();
		data.query = query;
		data.queryType = query.split(" ").shift();
		data.parameters = parameters;
		data.successCallback = successCallback;
		data.errorCallback = errorCallback;
		
		if (debug_database === true) {
			alert("Iniciando ejecución de " + data.queryType);
		}
		
		self.i_database.transaction(
				eval("(function(tx){self._queryExec(tx, " + data.offset.toString() + ");})"),
				eval("(function(err){self._errorCallback(err, " + data.offset.toString() + ");})"));
	};
	
	/* ************************************************************************ */
	this._queryExec = function (tx, offset) {
		var data = self._getData(offset);
		
		if (debug_database === true) {
			alert("Ejecutando " + data.queryType);
		}
		
		tx.executeSql(
				data.query,
				data.parameters,
				eval("(function(tx, results){self._successCallback(tx, results, " + data.offset.toString() + ");})"),
				eval("(function(err){self._errorCallback(err, " + data.offset.toString() + ");})")
		);
	};
	
	
	
	/* **************************************************************************
	 * Funciones de soporte callback
	 * **************************************************************************/
	
	/* ************************************************************************ */
	this._errorCallback = function (err, offset) {
		if (debug_database === true && debug_database_callback === true) {
			alert("Resultado de SELECT: ERROR");
		}
		
		var data = self._getData(offset);
		
		if ( ! (data.errorCallback === undefined || data.errorCallback == null ) ) {
			
			if (typeof(data.errorCallback === 'function')) {
				data.errorCallback(err);
			}
			else { // if (typeof(self.i_errorCallback === 'string')) {
				alert(data.errorCallback);
			}
			
		} else {
			
			if ( err.code ) {
				alert("Error processing SQL [" + err.code + "]: " + err.message);
			}
			else {
				alert("Error processing SQL: " + err.message);
			}
			
		}
	};
	
	/* ************************************************************************ */
	this._successCallback = function (tx, results, offset) {
		if (debug_database === true && debug_database_callback === true) {
			alert("Resultado de SELECT: SUCCESS");
		}
		
		var data = self._getData(offset);
		
		if ( ! (data.successCallback === undefined || data.successCallback == null ) ) {
			
			if (typeof(data.successCallback === 'function')) {
				
				if (data.queryType.toLowerCase() == 'insert') {
					data.successCallback(results.insertId);
				} 
				
				else if (data.queryType.toLowerCase() == 'update') {
					if (results.rows != null) {
					//	data.successCallback(results.rows.item(0));
						data.successCallback(results);
					}
					else {
						data.successCallback();
					}
				} 
				
				else { // 'select', 'delete', ...
					data.successCallback(tx, results);
				}
				
			}
			else if (typeof(data.successCallback === 'string')) {
				alert(data.successCallback);
			}
		}
	};
	
	
	/**************************/
	/**************************/
	
//	this.selectById = function (successCallback, errorCallback) {
//		self.i_successCallback = successCallback;
//		self.i_errorCallback = errorCallback;
//		
//		openDataBase();
//		db.transaction(function(tx){self._selectAllQuery(tx);}, function(err){self._errorCallback(err);});
//	};
//	
//	
//	this._selectByIdQuery = function (tx,conditions) {
//		tx.executeSql(
//				'SELECT * FROM vino where idVino = ?',
//				conditions,
//				function(tx, results){self._successCallback(tx, results);},
//				function(err){self._errorCallback(err);}
//		);
//	};
//	
//	
	
	
	this.init();
};