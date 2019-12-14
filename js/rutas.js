/////RUTEO

iCancha.config(function($routeProvider) {
	$routeProvider
		.when('/', { //HOME, BUSCADOR DE CANCHAS. CÓMO FUNCIONA LA WEB
			templateUrl : 'vistas/home.html',
			controller : 'homeCtrl'
		})
		.when('/iniciar-sesion', { // LOGIN
			templateUrl : 'vistas/iniciar-sesion.html',
			controller : 'iniciarSesionCtrl'
		})
		.when('/registro', { // REGISTRO
			templateUrl : 'vistas/registro.html',
			controller : 'registroCtrl'
		})
		.when('/registro/editar', { // EDITAR DATOS DE USURIO
			templateUrl : 'vistas/registro.html',
			controller : 'registroCtrl'
		})
		.when('/perfil', { // PERFIL USUARIO
			templateUrl : 'vistas/perfil.html',
			controller : 'perfilCtrl'
		})
		.when('/como-funciona', { //COMO FUNCIONA
			templateUrl : 'vistas/como-funciona.html',
		})
		.when('/contacto', { // CONTACTO
			templateUrl : 'vistas/contacto.html',
			controller : 'contactoCtrl'
		})
		.when('/canchas', { //LISTADO DE CANCHAS. API GOOGLE MAPS. 
			templateUrl : 'vistas/canchas.html',
			controller : 'canchasCtrl'
		})
		.when('/mis-canchas', { //LISTADO DE CANCHAS. API GOOGLE MAPS. 
			templateUrl : 'vistas/mis-canchas.html',
			controller : 'misCanchasCtrl'
		})
		.when('/verCancha/:id', { //VER UNA CANCHA
			templateUrl : 'vistas/una-cancha.html',
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
