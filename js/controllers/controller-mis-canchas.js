/**************************************** CONTROLLER MIS CANCHAS ***************************************/
 iCancha.controller("misCanchasCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout','$window', function  ($scope, $http, $location, Upload, $timeout, $window) { 
 
	//********************* LISTAR CANCHAS
	
	$http({
		method: 'POST',
		url: "php/abm/listar.canchas.php",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.then(function (response){//EXITO se establecio la conexion
		if(response.data.length){
			for(var i in response.data){
				var foto=response.data[i].FOTO.substring(24,response.data[i].FOTO.length);
				response.data[i].FOTO=foto;
			}
			
			$scope.mis_canchas=angular.fromJson(response.data);
		}
		else{
			$scope.mensaje="Aún no tenes canchas cargadas";
		}
		
	},function (error){ //ERROR no se pudo establecer la conexion

	});
	
	//ELIMINAR CANCHA
	$scope.eliminar_cancha=function(id){
		$http({
			method: 'POST',
			url: "php/abm/eliminar.cancha.php",
			data: "ID_CANCHA="+id,			 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function (response){
			if(response.data=="1"){
				alert("cancha eliminada con éxito");
				$window.location.reload();
			}
		},function (error){ //ERROR no se pudo establecer la conexion

		});
	}
	
	$scope.titulo_formulario="Crear cancha";
	//EDITAR CANCHA
	$scope.editar_cancha=function(cancha){
		$scope.titulo_formulario="Editar cancha";
		window.scrollTo(300, 0);
		
		//la guardo en variable global para acceder a su posicion con google maps
		localStorage.setItem("esta_cancha",angular.toJson(cancha));
		
		//parsear fecha
		var parts = cancha.FECHA_VENCIMIENTO_TARJETA.split('-');
		var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 

		//direccion
		id("pac-input").value=cancha.DIRECCION;
				
		$scope.cancha={
			NOMBRE: cancha.NOMBRE_CANCHA,
			//FOTO: cancha.FOTO,
			TIPO_CANCHA: cancha.TIPO_CANCHA,
			//LONGITUD: cancha.LONGITUD,
			//LATITUD: cancha.LATITUD,
			//DIRECCION: cancha.DIRECCION,
			TARJETA: parseInt(cancha.TARJETA, 10),
			CLAVE: parseInt(cancha.CLAVE_TARJETA, 10),
			FECHA_VENCIMIENTO_TARJETA: mydate,
			PRECIO: parseInt(cancha.PRECIO, 10)
		}
		
			
		/*$http({
			method: 'POST',
			url: "php/abm/editar.cancha.php",
			//data: "ID_CANCHA="+id,			 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function (response){
			if(response.data=="1"){
				alert("cancha eliminada con éxito");
				$window.location.reload();
			}
		},function (error){ //ERROR no se pudo establecer la conexion

		});*/
	}
	
	//*************************** CREAR CANCHA
	
	var search =id("pac-input");
	var map =id("map");

	rc(id("map").parentNode,id("map"));
	rc(id("pac-input").parentNode,id("pac-input"));
	
	ac(id("direccion"),search);
	ac(id("direccion"),map);
	
	
	$scope.tipo_cancha=[
		{
			TITULO: "Futbol"
		},
		{
			TITULO: "Basket"
		},
		{
			TITULO: "Hockey"
		},
		{
			TITULO: "Tenis"
		},
		{
			TITULO: "Rugby"
		}
	];
	
	$scope.dia=[
		{
			DIA: "Lunes"
		},
		{
			DIA: "Martes"
		},
		{
			DIA: "Miercoles"
		},
		{
			DIA: "Jueves"
		},
		{
			DIA: "Viernes"
		},
		{
			DIA: "Sabado"
		},
		{
			DIA: "Domingo"
		}
	];
	
	/******** CREAR CANCHA Y HORARIO ********/
	$scope.crear_cancha=function(cancha){
				
		//location
		var posicion=angular.fromJson(localStorage.getItem("posicion_cancha"));
		var direccion=localStorage.getItem("direccion_cancha");
			
		//horario
		
		var horarios=[];
			if(cancha.horario1){
				horarios.push("7:00am a 8:00am");
			}
			if(cancha.horario2){
				horarios.push("8:00am a 9:00am");
			}
			if(cancha.horario3){
				horarios.push("9:00am a 10:00am");
			}
			if(cancha.horario4){
				horarios.push("10:00am a 11:00am");
			}
			if(cancha.horario5){
				horarios.push("11:00am a 12:00pm");
			}
			if(cancha.horario6){
				horarios.push("12:00pm a 1:00pm");
			}
			if(cancha.horario7){
				horarios.push("1:00pm a 2:00pm");
			}
			if(cancha.horario8){
				horarios.push("2:00pm a 3:00pm");
			}
			if(cancha.horario9){
				horarios.push("3:00pm a 4:00pm");
			}
			if(cancha.horario10){
				horarios.push("4:00pm a 5:00pm");
			}
			if(cancha.horario11){
				horarios.push("5:00pm a 6:00pm");
			}
			if(cancha.horario12){
				horarios.push("6:00pm a 7:00pm");
			}
			if(cancha.horario13){
				horarios.push("7:00pm a 8:00pm");
			}
			if(cancha.horario14){
				horarios.push("8:00pm a 9:00pm");
			}
			if(cancha.horario15){
				horarios.push("9:00pm a 10:00pm");
			}
			if(cancha.horario16){
				horarios.push("10:00pm a 11:00pm");
			}
			if(cancha.horario17){
				horarios.push("11:00pm a 12:00am");
			}
			if(cancha.horario18){
				horarios.push("12:00am a 1:00am");
			}
			
			
		//cancha
		if(posicion!=null&&posicion!=undefined&&direccion!=undefined&&direccion!=null&&
			cancha.TIPO_CANCHA!=undefined&&
			cancha.NOMBRE!=undefined&&
			cancha.TARJETA!=undefined&&
			cancha.CLAVE!=undefined&&
			cancha.PRECIO!=undefined&&
			cancha.FOTO!=undefined&&
			cancha.FECHA_VENCIMIENTO_TARJETA!=undefined&&
			horarios.length>0
		){
			
			var datos_cancha={
				NOMBRE_CANCHA: cancha.NOMBRE,
				FOTO: cancha.FOTO,
				TIPO_CANCHA: cancha.TIPO_CANCHA,
				LONGITUD: posicion.LONGITUD,
				LATITUD: posicion.LATITUD,
				DIRECCION: direccion,
				TARJETA: cancha.TARJETA,
				CLAVE_TARJETA: cancha.CLAVE,
				FECHA_VENCIMIENTO_TARJETA: cancha.FECHA_VENCIMIENTO_TARJETA,
				PRECIO: cancha.PRECIO,
				PUNTAJE: "0",
				HORARIOS: horarios
			}
			
			if(cancha.FOTO!=undefined){
				cancha.FOTO.upload = Upload.upload({
					method: 'POST',
					url:"php/abm/crear.cancha.php",
					data: datos_cancha,
				})
				.then(function(response){
					console.log(response);
				}
				,function(response){
					//modal error
					console.log(response);
					
				});
			}				
		}
		else{
			alert("Formulario incompleto, todos los datos son requeridos");
		} 
	}
}]);
	