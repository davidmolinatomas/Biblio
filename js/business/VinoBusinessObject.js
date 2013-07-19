
function VinoBusinessObject(database) {
	var self = this;
	
	var i_database = null;
	var i_queries = null;
	var i_successCallback = null;
	var i_errorCallback = null;
	
	var i_container = null;
	
	
	/* **************************************************************************
	 * Constructor
	 * **************************************************************************/
	
	/* ************************************************************************ */
	this.init = function (database) {
		this.self = this;
		this._defineQueries();
		this.i_database = database;
	};
	
	/* ************************************************************************ */
	this._defineQueries = function () {
		self.i_queries = {};
		self.i_queries.selectTodo = "SELECT * FROM vino";
		self.i_queries.selectByIdVino = "SELECT * FROM vino WHERE idVino=?";
		self.i_queries.selectByPalabra = "SELECT * FROM vino WHERE nombre LIKE ? ORDER BY idVino";
		self.i_queries.insert = "INSERT INTO vino (nombre, tipoVino, anada, alcohol, maduracion, paisOrigen, dOrigen, bodega) VALUES (?,?,?,?,?,?,?,?)";
		self.i_queries.remove = "DELETE FROM vino where idVino = ?";
		self.i_queries.update = "UPDATE vino SET nombre = ? , tipoVino = ? , anada = ? , alcohol = ? , maduracion = ? , paisOrigen = ? , dOrigen = ? , bodega = ? WHERE idVino= ?";
	};
	
	
	/* **************************************************************************
	 * Funciones INSERT
	 * **************************************************************************/
	
	/* ************************************************************************ */
	this.insertVino = function (vino, successCallback, errorCallback) {
		
		var conditions = new Array();
		
		if (vino.nombre != null && vino.nombre != "") {
			conditions[0] = vino.nombre;
		} else {
			conditions[0] = "";
		}
		
		if (vino.tipoVino != null && vino.tipoVino != "") {
			conditions[1]= vino.tipoVino;
		} else {
			conditions[1] = "";
		}
		
		if (vino.anada != null && vino.anada != "") {
			conditions[2]= vino.anada;
		} else {
			conditions[2] = "";
		}
		
		if (vino.alcohol != null && vino.alcohol != "") {
			conditions[3]= vino.alcohol;
		} else {
			conditions[3] = "";
		}
		
		if (vino.maduracion != null && vino.maduracion != "") {
			conditions[4]= vino.maduracion;
		} else {
			conditions[4] = "";
		}
		
		if (vino.paisOrigen != null && vino.paisOrigen != "") {
			 conditions[5]= vino.paisOrigen;
		} else {
			conditions[5] = "";
		}
		
		if (vino.dOrigen != null && vino.dOrigen != "") {
			conditions[6]= vino.dOrigen;
		} else {
			conditions[6] = "";
		}
		
		if (vino.bodega != null && vino.bodega != "") {
			conditions[7]= vino.bodega;
		} else {
			conditions[7] = "";
		}
		
		self.i_database.insert(self.i_queries.insert, conditions, successCallback, errorCallback);
	};
	
	
	/* **************************************************************************
	 * Funciones SELECT
	 * **************************************************************************/
	
	/* ************************************************************************ */
	/*this.getNextIdVino = function (successCallback, errorCallback) {
		self.i_database.getNextId(TABLA_Vino, successCallback, errorCallback);
	};*/
	
	/*
	 * 
	 * container Referencia al objeto contenedor
	 */
	/* ************************************************************************ */
	this.selectByIdVino = function (idVino, successCallback, errorCallback) {
		self.i_successCallback = successCallback;
		self.i_errorCallback = errorCallback;
		
		self.i_database.select(
				self.i_queries.selectByIdVino,
				new Array(idVino),
				function(tx, results) {self._selectByIdVinoSuccess(tx,results);},
				null);
	};
	
	/* ************************************************************************ */
	this._selectByIdVinoSuccess = function (tx, results) {
		if ( ! (self.i_successCallback === undefined || self.i_successCallback == null) ) {
			self.i_successCallback(results.rows.item(0));
		}
	};
	
	/* ************************************************************************ */
	
	this.selectByPalabra = function (palabra, successCallback, errorCallback) {
		self.i_successCallback = successCallback;
		self.i_errorCallback = errorCallback;
		self.i_palabra = palabra;
		self.i_database.select(
				self.i_queries.selectByPalabra,
				new Array("%" +self.i_palabra+ "%"),
				function(tx, results) {self._selectByPalabraSuccess(tx,results);},
				null);
	};
	
	/* ************************************************************************ */
	this._selectByPalabraSuccess = function (tx, results) {
		if ( ! (self.i_successCallback === undefined || self.i_successCallback == null) ) {
			self.i_successCallback(results);
		}
	};
	/*
	 * 
	 * container Referencia al objeto contenedor
	 */
	/* ************************************************************************ */
	this.loadList = function (container) {
		alert("7");
		self.i_container = container;
		self.i_database.select(self.i_queries.selectTodo, [], function(tx, results) {self._createList(tx,results);}, null);
	};
	
	/* ************************************************************************ */
	this._createList = function (tx, results) {
		var html = '';
		var len = results.rows.length;
		
		if ( debug_vino === true ) {
			alert("Se han encontrado " + len + " vinos en la base de datos");
		}
		
		html += '<ul data-role="listview" data-inset="true" id="listaVinosOrdenada" >';
		for (var i = 0; i < len; i++){
			html += '<li>';
			html += '	<a href="product_info.html?' + PARAM_IdVino + '=' + results.rows.item(i).idVino + '">';
			html += '		<img src="images/habla-del-silencio-2010.jpg" class="wine-list"> ';
			html += '		<span class="nombre-vino-anada">' + results.rows.item(i).nombre + '&nbsp;' + results.rows.item(i).anada + '</span><br>';
			html += '		<span class="tipo-vino">' + results.rows.item(i).tipoVino + '</span><br>';
			html += '		<span class="denominacion">' + results.rows.item(i).dOrigen + '</span>';
			html += '	</a>';
			html += '</li> ';
		}
		html += '</ul>';
		
		self.i_container.html(html);
		self.i_container.trigger('create');
	};
	
	
	
	/* **************************************************************************
	 * Funciones DELETE
	 * **************************************************************************/
	
	/* ************************************************************************ */
	this.deleteVino = function (idVino, successCallback, errorCallback) {
		var conditions = new Array(idVino);
		
		self.i_database.remove(self.i_queries.remove, conditions, successCallback, errorCallback);
	};
	
	
	
	/* **************************************************************************
	 * Funciones UPDATE
	 * **************************************************************************/
	
	/* ************************************************************************ */
	
	this.updateVino = function (vino, successCallback, errorCallback ) {
		var conditions = new Array();
		
		if (vino.nombre != null && vino.nombre != "") {
			conditions[0] = vino.nombre;
		} else {
			conditions[0] = "";
		}
		
		if (vino.tipoVino != null && vino.tipoVino != "") {
			conditions[1]= vino.tipoVino;
		} else {
			conditions[1] = "";
		}
		
		if (vino.anada != null && vino.anada != "") {
			conditions[2]= vino.anada;
		} else {
			conditions[2] = "";
		}
		
		if (vino.alcohol != null && vino.alcohol != "") {
			conditions[3]= vino.alcohol;
		} else {
			conditions[3] = "";
		}
		
		if (vino.maduracion != null && vino.maduracion != "") {
			conditions[4]= vino.maduracion;
		} else {
			conditions[4] = "";
		}
		
		if (vino.paisOrigen != null && vino.paisOrigen != "") {
			 conditions[5]= vino.paisOrigen;
		} else {
			conditions[5] = "";
		}
		
		if (vino.dOrigen != null && vino.dOrigen != "") {
			conditions[6]= vino.dOrigen;
		} else {
			conditions[6] = "";
		}
		
		if (vino.bodega != null && vino.bodega != "") {
			conditions[7]= vino.bodega;
		} else {
			conditions[7] = "";
		}
		
		conditions[8] = vino.idVino;
		
		if(debug_vino == true){
			alert("Realizando update, del vino: "+conditions[0] +" con id: "+conditions[8]);
		}
		self.i_database.update(self.i_queries.update, conditions, successCallback, errorCallback); 
	};
	
	
	/* **************************************************************************
	 * Funciones SCHEMA
	 * **************************************************************************/
	
	/* ************************************************************************ */
	this.createTable = function (tx) {
		alert("creamos vinos");
		tx.executeSql("CREATE TABLE IF NOT EXISTS vino (idVino,nombre,tipoVino,anada,alcohol,maduracion,paisOrigen,dOrigen,bodega)");
		/*		"idVino INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, " +
				"nombre VARCHAR(50), " +
				"tipoVino VARCHAR(50), " +
				"anada VARCHAR(50), " +
				"alcohol VARCHAR(50), " +
				"maduracion VARCHAR(50), " +
				"paisOrigen VARCHAR(30), " + 
				"dOrigen VARCHAR(30), " +
				"bodega VARCHAR(30))");*/
	};
	
	/* ************************************************************************ */
	this.initTable = function (tx) {
		// NOOP
	};
	
	
	/* ************************************************************************ */
	this.init(database);
};

