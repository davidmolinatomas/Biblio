
function InstallerObject (liteWinery) {
	var self = this;
	
	var i_liteWinery = null;
	var i_databaseManager = null;
	var i_queries = null;
	var i_successCallback = null;
	var i_errorCallback = null;
	
	
	
	/* **************************************************************************
	 * Constructor
	 * **************************************************************************/
	
	/* ************************************************************************ */
	this.init = function (liteWinery) {
		this.self = this;
		this.i_liteWinery = liteWinery;
		this.i_databaseManager = liteWinery.Database;
	};
	
	/* ************************************************************************ */
	this.review = function (successCallback, errorCallback) {
		this.createSchema(successCallback, errorCallback);
	};
	
	/* ************************************************************************ */
	this.createSchema = function (successCallback, errorCallback) {
		self.i_successCallback = successCallback;
		self.i_errorCallback = errorCallback;
		
		if (debug_installer === true) {
			alert("Iniciando la creación de esquemas");
			alert("hola");
			alert(self.i_databaseManager);
		}
		self.i_databaseManager.transaction(
				function(tx, results){self._createSchemaTransaction(tx, results);},
				self._errorCallback);
	};
	
	/* ************************************************************************ */
	this._createSchemaTransaction = function (tx, results) {
		if (debug_installer === true) {
			alert("Creando todos los esquemas");
		}
		alert("creamos vinos");
		self.i_liteWinery.VinoManager.createTable(tx);
		alert("iniciamos vinos");
		self.i_liteWinery.VinoManager.initTable(tx);
		//self.i_liteWinery.NotasManager.createTable(tx);
		//self.i_liteWinery.CataManager.createTable(tx);
		//self.i_liteWinery.VinoManager.createTable(tx);
		
		
		if (debug_installer === true) {
			alert("Esquemas creados");
		}
		
		if ( ! (self.i_successCallback === undefined || self.i_successCallback == null ) ) {
			
			if (typeof(self.i_successCallback === 'function')) {
				self.i_successCallback(tx, results);
			}
			else if (typeof(self.i_successCallback === 'string')) {
				alert(self.i_successCallback);
			}
		}
	};
	
	
	
	/* **************************************************************************
	 * Funciones de soporte callback
	 * **************************************************************************/
	
	/* ************************************************************************ */
	this._errorCallback = function (err) {
		if (debug_installer === true && debug_installer_callback === true) {
			alert("Resultado de la operación: ERROR");
		}
		
		if ( ! (self.i_errorCallback === undefined || self.i_errorCallback == null ) ) {
			
			if (typeof(self.i_errorCallback === 'function')) {
				self.i_errorCallback(err);
			}
			else { // if (typeof(self.i_errorCallback === 'string')) {
				alert(self.i_errorCallback);
			}
			
		} else {
			
			if ( err.code ) {
				alert("Error al procesar la operación [" + err.code + "]: " + err.message);
			}
			else {
				alert("Error al procesar la operación: " + err.message);
			}
			
		}
	};
	
	/* ************************************************************************ */
	this._successCallback = function (tx, results) {
		if (debug_installer === true && debug_installer_callback === true) {
			alert("Resultado de la operación: SUCCESS");
		}
		
		if ( ! (self.i_successCallback === undefined || self.i_successCallback == null ) ) {
			
			if (typeof(self.i_successCallback === 'function')) {
				self.i_successCallback(tx, results);
			}
			else if (typeof(self.i_successCallback === 'string')) {
				alert(self.i_successCallback);
			}
		}
	};
	
	
	
	
	/* ************************************************************************ */
	this.init(liteWinery);
}