/**
* Funciones comunes a las vistas
*/


/**
 * 
 */
function getURLParam(param) {
	return decodeURI(
			(RegExp(param + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
	);
}

/**
* Calcula la fecha actual
*/
function calcularFechaActual()
{
	var dt = new Date();
	// Display the month, day, and year. getMonth() returns a 0-based number.
	var month = dt.getMonth()+1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var hour = dt.getHours();
	var fecha = day+"/"+month+"/"+year+ "  "+hour;
	
	return fecha;
}


function navigateToProductList (params) {
	navigateTo("product_list.html", params);
}

function navigateToProductNew (params) {
	navigateTo("product_new.html", params);
}

function navigateToProductInfo (params) {
	navigateTo("product_info.html", params);
}

function navigateToProductEdit (params) {
	navigateTo("product_edit.html", params);
}

function navigateToProductSearch (params) {
	navigateTo("product_search.html", params);
}

function navigateTo (page, params) {
	alert("5");
	if ( params === undefined || params == null) {
		
		jQuery.mobile.changePage(page, {
			allowSamePageTransition: true,
			transition: 'none',
			reloadPage: false
		});
	}
	else {
		
		if(params.substring(0, 1) != '?') {
			
			params = '?' + params;
		}
		
		jQuery.mobile.changePage(page + params, {
			allowSamePageTransition: true,
			transition: 'none',
			reloadPage: false
		});
		
	}
alert("6");	
}
