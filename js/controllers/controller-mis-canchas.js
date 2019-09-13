/**************************************** CONTROLLER MIS CANCHAS ***************************************/
 iCancha.controller("misCanchasCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { 
 
	
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
	
	$scope.crear_cancha=function(cancha){
		
		//location
		var posicion=angular.fromJson(localStorage.getItem("posicion_cancha"));
		var direccion=localStorage.getItem("direccion_cancha");
			
		//cancha
		if(posicion!=null&&posicion!=undefined&&direccion!=undefined&&direccion!=null&&
			cancha.TIPO_CANCHA!=undefined&&
			cancha.NOMBRE!=undefined&&
			cancha.TARJETA!=undefined&&
			cancha.CLAVE!=undefined&&
			cancha.PRECIO!=undefined&&
			cancha.FOTO!=undefined&&
			cancha.FECHA_VENCIMIENTO_TARJETA!=undefined){
		 
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
				PUNTAJE: "0"
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
	
	
	
	/*var cities = [
              {
                  city : 'India',
                  desc : 'This is the best country in the world!',
                  lat : 23.200000,
                  long : 79.225487
              },
              {
                  city : 'New Delhi',
                  desc : 'The Heart of India!',
                  lat : 28.500000,
                  long : 77.250000
              },
              {
                  city : 'Mumbai',
                  desc : 'Bollywood city!',
                  lat : 19.000000,
                  long : 72.90000
              },
              {
                  city : 'Kolkata',
                  desc : 'Howrah Bridge!',
                  lat : 22.500000,
                  long : 88.400000
              },
              {
                  city : 'Chennai  ',
                  desc : 'Kathipara Bridge!',
                  lat : 13.000000,
                  long : 80.250000
              }
          ];
		  
			var mapOptions = {
                  zoom: 12,
                  center: new google.maps.LatLng(-34.568101,-58.4709995),
                  mapTypeId: google.maps.MapTypeId.TERRAIN
              }

              $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

              $scope.markers = [];
			  
			
              
              var infoWindow = new google.maps.InfoWindow();
              
              var createMarker = function (info){
                  
                  var marker = new google.maps.Marker({
                      map: $scope.map,
                      position: new google.maps.LatLng(info.lat, info.long),
                      title: info.city
                  });
                  marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
                  
                  google.maps.event.addListener(marker, 'click', function(){
                      infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                      infoWindow.open($scope.map, marker);
                  });
                  
                  $scope.markers.push(marker);
                  
              }  
              
              for (i = 0; i < cities.length; i++){
                  createMarker(cities[i]);
              }

              $scope.openInfoWindow = function(e, selectedMarker){
                  e.preventDefault();
                  google.maps.event.trigger(selectedMarker, 'click');
              }*/
}]);
	