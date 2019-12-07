/**************************************** CONTROLLER REGISTRO ***************************************/

iCancha.controller("perfilCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) {

	$scope.eliminar_cuenta=function(){
		$http({
			method: 'POST',
			url:"php/abm/eliminar.cuenta.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function (response){
			if(response.data==="1"){
				alert("cuenta eliminada con éxito!");
				$scope.logout();
			}
			else{
				alert("Ups! Hubo un error, vuela a intentarlo más tarde");
			}

		},function (error){

		});

	};

	if(localStorage.getItem("dts_user")!==null){
		var usuario=angular.fromJson(localStorage.getItem("dts_user"));
		$scope.nombre=usuario.NOMBRE;
		$scope.apellido=usuario.APELLIDO;
		
		if(usuario.TIPO_USUARIO==="Propietario"){
			$scope.es_propietario=true;
		}

	}
	else{
		$location.path("#!/home");  //usuario no logueado, redireccion a home
	}

}]);
