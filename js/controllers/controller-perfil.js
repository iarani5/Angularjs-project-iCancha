/**************************************** CONTROLLER REGISTRO ***************************************/

iCancha.controller("perfilCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 

	if(localStorage.getItem("dts_user")!=null){
							sacar_botones("sacar"); //Funcion. no recibe nada, vuelve a cargar los botones del menu.
		
		var usuario=[];
		usuario=angular.fromJson(localStorage.getItem("dts_user"));
		$scope.nombre=usuario.NOMBRE;
		$scope.apellido=usuario.APELLIDO;
		
		if(usuario.TIPO_USUARIO=="Propietario"){
			$scope.es_propietario=true;
		}
			
		//************************************* LOGOUT
		$scope.logout=function(){
				$http({
						method: 'POST',
						url:"php/abm/logout.php",
						headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
					})
					.then(function (data){ //EXITO se establecio la conexion
						if(data.data=="1"){
							localStorage.removeItem("dts_user");
							sacar_botones(); //Funcion. no recibe nada, vuelve a cargar los botones del menu.
							$location.path("#!/home"); 
						}
						else{
							// mensaje de error. vuelva a intentarlo mas tarde.
						}
						
				},function (error){ //ERROR no se pudo establecer la conexion

				});
		}
	}
	else{
		$location.path("#!/home");  //usuario no logueado, redireccion a home
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