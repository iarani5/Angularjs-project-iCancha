/**************************************** CONTROLLER INICIAR SESION ***************************************/
 
iCancha.controller("modalCtrl", function ($location,$http,$scope,$window,$routeParams) {

	id("es_modal").style.display="none";
	$scope.showModal=function(){
		id("es_modal").style.display="inline-block";
	}
	$scope.cancel=function(){
		id("es_modal").style.display="none";
	}
	
	$scope.submitForm=function(claves){
		console.log(claves);
		var item = [];
		for(var i in claves){
			item.push( i+'='+claves[i] ); 
		}
		var union = item.join('&');	
		
		//CAMBIAR CLAVE
		$http({
			method: 'POST',
			url: enlace,
			data: union,	
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
		})
		.then(function (response){//EXITO se establecio la conexion
			if(response.data=="existe"){
				//mensaje de mail ya existe
			}
			else{
				if(response.data.constructor != Object){ //error no se guardo en la bdd
					// mensaje de error. vuelva a intentarlo mas tarde.
				}
				else{ //exito
					//redirijo a home porque ya me loguea en el sistema una vez creado el usuario.
					
					//paso el objeto a formato json para almacenarlo en la memoria local del browser
					localStorage.setItem("dts_user",angular.toJson(response.data));
					
					//redirecciono a home.
					sacar_botones("sacar");
					$location.path("/");
				}
			}
			
		},function (error){ //ERROR no se pudo establecer la conexion

		});
		
	}
	

});