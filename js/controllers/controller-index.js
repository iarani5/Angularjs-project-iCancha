/**************************************** CONTROLLER INDEX ***************************************/

iCancha.controller("indexCtrl", function ($location,$http,$scope,$window,$routeParams) {

	$scope.no_user=true;

	$scope.$watch('no_user', function() {

	});

	$http({
		method: 'POST',
		url:"php/abm/logueado.php",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}
	})
	.then(function (response){
		if(response.data!==""&&localStorage.getItem("dts_user")!==undefined&&localStorage.getItem("dts_user")!==null){
			var usuario=angular.fromJson(localStorage.getItem("dts_user"));
			$scope.nombre_usuario=usuario.NOMBRE;
			$scope.no_user=false;
		}

	},function (error){

	});

//************************************* LOGOUT
	$scope.logout=function(){
		$http({
			method: 'POST',
			url:"php/abm/logout.php",
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.then(function (data){ //EXITO se establecio la conexion
				if(data.data==="1"){
					localStorage.removeItem("dts_user");
					$scope.no_user=true;
					$window.location.href="#!/";
				}
				else{
					// mensaje de error. vuelva a intentarlo mas tarde.
				}

			},function (error){ //ERROR no se pudo establecer la conexion

			});
	};

//************************************* LOGIN

	//envio del form
	$scope.login = function (usuario){
		var datos_login=tn(tn(document,'form',0),'input'); //para validacion de datos, lo usamos despues

		var item = [];
		for(var i in usuario){ //recorre objeto y crea un array
			item.push( i+'='+usuario[i] );
		}

		//validar inputs en el submit
		/*var ban=0;
		for(var i=0;i<datos_login.length;i++)
			/*datos_login[i].style.borderBottom='none';
			var p=datos_login[i].nextSibling;
			if(p.className=="mensaje-validacion"){
				rc(p.parentNode,p);
			}
				validar_form(datos_login[i]);
			var p=datos_login[i].nextSibling;
			if(p.className=="mensaje-validacion"){
				ban=1;
			}
		}
		if(!ban){*/
		var union = item.join('&');	//me une el array con un &
		//ABM: login
		$http({ //esto conecta a php
			method: 'POST', //tambien existe GET
			url:"php/abm/login.php",
			data: union,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.then(function (data){//EXITO se establecio la conexion
				if(data.data.ID_USUARIO!==undefined&&data.data!==""){ //exito
					localStorage.setItem("dts_user", angular.toJson(data.data));
					var usuario=angular.fromJson(localStorage.getItem("dts_user"));
					$scope.nombre_usuario=usuario.NOMBRE;
					$scope.no_user=false;

					$window.location.href="#!/perfil";
				}

			},function (error){ //ERROR no se pudo establecer la conexion

			});
		//}
	}

});
