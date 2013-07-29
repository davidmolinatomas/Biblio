

	LiteWinery.Database.openDataBase();
	LiteWinery.Installer.review(liteWinery_installer_success, liteWinery_installer_error);


function liteWinery_installer_success () {
	alert("1");
	navigateToProductList();
}


function liteWinery_installer_error (error) {
	alert("Se ha producido un error en la inicialización de la aplicación... cómpratela para no ver los errores");
}
