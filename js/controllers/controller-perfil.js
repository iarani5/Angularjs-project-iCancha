/**************************************** CONTROLLER REGISTRO ***************************************/

iCancha.controller("perfilCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 

	if(localStorage.getItem("dts_user")!=null){ 
		var usuario=[];
		usuario=angular.fromJson(localStorage.getItem("dts_user"));
		$scope.nombre=usuario.NOMBRE;
		$scope.apellido=usuario.APELLIDO;
	}
 
 //*******************************************************************
  //PARA IMPLEMENTACIONES FUTURAS con upload de imagen para usuario
	//OBJETO CON DATOS TRAIDOS DE LA VISTA registro.html
			/* datos_usuario={
				EMAIL: usuario.EMAIL,
				NOMBRE: usuario.NOMBRE,
				APELLIDO: usuario.APELLIDO,
				CLAVE: usuario.CLAVE,
				TIPO_USUARIO : usuario.TIPO_USUARIO,
				FOTO_PERFIL : usuario.FOTO_PERFIL,
			} */
			
			//PARSEAR EL CONENIDO DEL OBJETO A FORMATO PARA SER PASADO POR POST A ARCHIVO PHP
			/* for(var i in datos_usuario){
				item.push( i+'='+datos_usuario[i] ); 
			}
			var union = item.join('&');	
		 *
***********************************************************************/

}]);