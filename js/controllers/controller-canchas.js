/**************************************** CONTROLLER CANCHAS ***************************************/
 
iCancha.controller("canchasCtrl", function ($location,$http,$scope,$window,$routeParams) {
	
	/****** LISTAR CANCHAS *****/
	
	$scope.mostrar=false;
	
	$http({
		method: 'POST',
		url: "php/abm/listar.todas.canchas.php",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.then(function (response){ //EXITO se establecio la conexion
		if(response.data.length){
			$scope.cantidad_futbol=0;
			$scope.cantidad_basket=0;
			$scope.cantidad_hockey=0;
			$scope.cantidad_tenis=0;
			$scope.cantidad_rugby=0;
			
			for(var i in response.data){

				if(response.data[i].BORRADO==="No"){
					
					switch(response.data[i].TIPO_CANCHA){
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
			}

			/*********** LISTAR POR TIPO DE CANCHA **********/
			$scope.listar_canchas=function(cancha){
				$scope.mostrar=true;
				$scope.titulo = cancha;
				var canchas=[];

				for(var i in response.data){

					//puntuar
					//$scope.calificaciones = response.data.reverse();
					var sum=0;

					for(var j in response.data[i].PUNTAJE){
						sum+=parseInt(response.data[i].PUNTAJE[j].PUNTUACION, 10);
					}
					if(sum) response.data[i].PUNTAJE = (sum/response.data[i].PUNTAJE.length).toFixed(2);
					else response.data[i].PUNTAJE=0;

					if(response.data[i].TIPO_CANCHA==cancha&&response.data[i].BORRADO=="No"){
						canchas.push(response.data[i]);
					}
				}
				$scope.canchas = canchas.reverse();
			};

			/******** MOSTRAR HORARIO DE ESA CANCHA *********/
			$scope.mostrar_horarios=function(id){
				$http({
					method: 'POST',
					url: "php/abm/listar.horarios.php",
					data: "FK_ID_CANCHA="+id,
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
				})
				.then(function (response){ //EXITO se establecio la conexion
					modal_horarios(response.data);
					
				},function (error){ //ERROR no se pudo establecer la conexion

				});
				
				//modal_horarios("horarios","reservar");
			}
		}
		
	},function (error){ //ERROR no se pudo establecer la conexion

	});
	
	

});
