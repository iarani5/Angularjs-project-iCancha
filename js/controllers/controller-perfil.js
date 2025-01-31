/**************************************** CONTROLLER REGISTRO ***************************************/

iCancha.controller("perfilCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout','$window', function  ($scope, $http, $location, Upload, $timeout, $window) {

	$scope.eliminar_cuenta=function(){
		$http({
			method: 'POST',
			url:"php/abm/eliminar.cuenta.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function (response){
			if(response.data==="1"){
				modal_msj("cuenta eliminada con éxito!");
				$scope.logout();
			}
			else{
				modal_msj("Ups! Hubo un error, vuela a intentarlo más tarde");
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

		if(usuario.TIPO_USUARIO==="Administrador"){
			$scope.es_admin=true;


			//************* DENUNCIAS - BLOQUEO DE USUARIOS


			//LISTAR DENUNCIAS
			$http({
				method: 'POST',
				url: "php/abm/listar.denuncias.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.then(function (response){
					$scope.lista_denuncias = response.data;
				},function (error){ //ERROR no se pudo establecer la conexion

				});

			//BLOQUEAR USUARIO
			$scope.bloquear_usuario=function(id) {
				$http({
					method: 'POST',
					url: "php/abm/bloquear.usuario.php",
					data: "ID_USUARIO="+id,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})
					.then(function (response){
						if(response.data==="1"){
							modal_msj("Usuario bloqueado con éxito!");
							$window.location.reload();
						}
						else{
							modal_msj("Ups! Hubo un error vuelva a intentarlo más tarde.");
						}

					},function (error){ //ERROR no se pudo establecer la conexion

					});
			};

			//************** CUPON

			//LISTAR CUPONES
			$http({
				method: 'POST',
				url: "php/abm/listar.cupones.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.then(function (response){
					$scope.lista_cupones = response.data;
					console.log($scope.lista_cupones);
				},function (error){ //ERROR no se pudo establecer la conexion

				});

			//ELIMINAR CUPON
			$scope.eliminar_cupon=function(id) {
				$http({
					method: 'POST',
					url: "php/abm/eliminar.cupon.php",
					data: "ID_CUPON="+id,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})
					.then(function (response){
						if(response.data==="1"){
							modal_msj("Cupon eliminado con éxito!");
							$window.location.reload();
						}
						else{
							modal_msj("Ups! Hubo un error vuelva a intentarlo más tarde.");
						}

					},function (error){ //ERROR no se pudo establecer la conexion

					});
			};

			//CREAR CUPON
			$scope.crear_cupon=function(cupon){

				console.log(cupon);

				$http({
					method: 'POST',
					url: "php/abm/crear.cupon.php",
					data: "NOMBRE_CUPON="+cupon.NOMBRE_CUPON+"&CODIGO="+cupon.CODIGO+"&PORCENTAJE="+cupon.PORCENTAJE,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				})
				.then(function (response){
					if(response.data==="1"){
						modal_msj("Cupon creado con éxito!");
						$window.location.reload();
					}
					else{
						modal_msj("Ups! Hubo un error vuelva a intentarlo más tarde.");
					}

				},function (error){ //ERROR no se pudo establecer la conexion

				});
			};

			//************** ESTADISTICAS

			$http({
				method: 'POST',
				url: "php/abm/traer.stats.php",
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			})
				.then(function (response){
					$scope.usuario_stats=response.data[0];
					$scope.cancha_stats=response.data[1];

					$scope.admin = 0;
					$scope.client = 0;
					$scope.prop=0;

					for(let i in $scope.usuario_stats){
						switch ($scope.usuario_stats[i].TIPO_USUARIO) {
								case "Administrador":
									$scope.admin++;
								break;
								case "Cliente":
									$scope.client++;
								break;
								case "Propietario":
									$scope.prop++;
								break;
						}
					}

					$scope.cantidad_futbol=0;
					$scope.cantidad_basket=0;
					$scope.cantidad_hockey=0;
					$scope.cantidad_tenis=0;
					$scope.cantidad_rugby=0;

					for(let i in $scope.cancha_stats) {
						switch ($scope.cancha_stats[i].TIPO_CANCHA) {
							case "Futbol":
								$scope.cantidad_futbol++;
								break;
							case "Basket":
								$scope.cantidad_basket++;
								break;
							case "Hockey":
								$scope.cantidad_hockey++;
								break;
							case "Tenis":
								$scope.cantidad_tenis++;
								break;
							case "Rugby":
								$scope.cantidad_rugby++;
								break;
						}
					}



				},function (error){ //ERROR no se pudo establecer la conexion

				});
		}

	}
	else{
		$location.path("#!/home");  //usuario no logueado, redireccion a home
	}

}]);
