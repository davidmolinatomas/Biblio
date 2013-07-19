
LiteWinery.WineManager = {
/*	
	var defaults = {
		start: '1'
	};

	options = $.extend(defaults, options);

	this.doSomething = function () {
		console.log('BOO');
		console.log(options.start);
	};
	*/
	
	data : {
		successCallback : null,
		errorCallback : null,
	},
	
	/*_this : this,*/
	
	selectAll : function (successCallback1, errorCallback1) {
		var self = this;
		
		openDataBase();
		
		this.data.successCallback = successCallback1;
		this.data.errorCallback = errorCallback1;
		
		db.transaction(function(tx){self._selectAllQuery(tx);}, function(err){self._errorCallback(err);});
	},
	
	_errorCallback : function (err) {
		/*if ( successCallback ) {
			errorCallback(err);
		} else {*/
		if ( err.code ) {
			alert("Error processing SQL [" + err.code + "]: " + err.message);
		}
		else {
			alert("Error processing SQL: " + err.message);
		}
		//}
	},
	
	_successCallback : function (tx, results) {
		alert('tt');
		alert(this);
		alert(this.data.successCallback);
		if ( ! (this.data.successCallback === undefined || this.data.successCallback == null ) ) {
		//if ( this.successCallback != null ) {
			alert('tt2');
			this.data.successCallback(tx, results);
		}
		alert("tt3");
	},
	
	_selectAllQuery : function (tx) {
		//var self = this;
		
		alert(this._successCallback);
		alert(this.data);
		alert(self);
		alert(tx);
		alert(tx.executeSql);
		tx.executeSql(
				'SELECT * FROM vino',
				[],
				function(tx, results){self._successCallback(tx, results);},
				function(err){self._errorCallback(err);}
		);
	},
};

//var wineMng = new wineManager({id:1, text:'pepe'});
