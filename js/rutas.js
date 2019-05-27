/////RUTEO

iCancha.config(function($routeProvider) {
	$routeProvider
		.when('/', { //HOME, BUSCADOR DE CANCHAS. CÓMO FUNCIONA LA WEB
			templateUrl : 'vistas/home.html',
			controller : 'indexCtrl'
		})
		.when('/iniciar-sesion', { //MODAL LOGIN
			templateUrl : 'vistas/iniciar-sesion.html',
			controller : 'iniciarSesionCtrl'
		})
		.when('/registro', { //MODAL REGISTRO
			templateUrl : 'vistas/registro.html',
			controller : 'registroCtrl'
		})
		.when('/canchas', { //LISTADO DE CANCHAS. API GOOGLE MAPS. 
			templateUrl : 'vistas/canchas-listado.html',
			controller : 'canchasListadoCtrl'
		})
		.when('/verCancha/:id', { //VER UNA CANCHA
			templateUrl : 'vistas/cancha-ver.html',
			controller : 'canchaVerCtrl'
		})
		.when('/modal', { //MODAL PARA MENSAJES DE INTERACCION CON LA WEB
			templateUrl : 'vistas/overlay.html',
			controller : ''
		})
		.otherwise({ 
			redirectTo: '/'
		});
});
