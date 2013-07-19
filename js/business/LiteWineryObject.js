
/*
function LiteWineryObject() {
	var Database = null;
	var Installer = null;
	var VinoManager = null;
	var listaDeNotas = null;
	var idLastVino = null;
	
	
	
	this.init = function() {
		this.Database = new DatabaseObject();
		this.VinoManager = new VinoBusinessObject(this.Database);
		this.listaDeNotas = new Array();
//		this.idLastVino = 0;
		
		this.Installer = new InstallerObject(this);
	};
	
	this.init();
};

var LiteWinery = new LiteWineryObject();

*/

var LiteWinery =  (function () {
		var my = {}	;

		my.Database = new DatabaseObject();
		my.VinoManager = new VinoBusinessObject(my.Database);
		my.Installer = new InstallerObject(my);

		return my;
	}());