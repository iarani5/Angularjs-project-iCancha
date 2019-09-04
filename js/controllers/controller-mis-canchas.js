/**************************************** CONTROLLER MIS CANCHAS ***************************************/
 
iCancha.controller("misCanchasCtrl", function ($location,$http,$scope,$window,$routeParams) {

		var map; 
		var markers = [];
		var marker_usuario;
		
		//**** MAPA ****//
		
		window.initMap = function() { 
		
			/*Creacion del mapa*/
			map = new google.maps.Map(id('map'), { 
				center: {lat: -34.568101 , lng: -58.470378499999995},
				zoom: 13,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			/* Buscador */
			var input=id('pac-input');
			var searchBox = new google.maps.places.SearchBox(input);

			map.addListener('bounds_changed', function() {
				searchBox.setBounds(map.getBounds());
			});
			
			
			/* Detalles del lugar */
		searchBox.addListener('places_changed', function() {
			var places = searchBox.getPlaces(); //Objeto con datos de direccion Google Maps

			if (places.length == 0) {
			  return;
			}

			/* Borrado de markers anteriores */
			markers.forEach(function(marker) {
			  marker.setMap(null);
			});
			markers = [];
			var infowindow = [];

			/* Por cada lugar pedir el icono, nombre y location */
			var bounds = new google.maps.LatLngBounds();
			
		places.forEach(function(place) {
			 //TRAER LOS GRUPOS
			  for(var i=0;i<grupos.length;i++){
				//creo el lugar del grupo
				var lugar = {lat: parseFloat(grupos[i]["LATITUD"]), lng: parseFloat(grupos[i]["LONGITUD"])};

				//creo el icono del grupo
				 var icon = {
					url: "../img/icons/png/marker-map-grupo.png",
					size: new google.maps.Size(100, 100),
					origin: new google.maps.Point(0, 0),
					anchor: new google.maps.Point(17, 34),
					scaledSize: new google.maps.Size(50, 60)
				  };
				  
				  // crear un marker para el lugar donde esta el grupo
				  markers.push(new google.maps.Marker({
					map: map,
					icon: icon,
					title: titulo_grupo,
					mas: markers.length, //numero de array que ocupa el objeto
					position: lugar
				  }));
				  
				  //informacion de grupo
				  var cantidad_usuarios=grupos[i]["CANTIDAD_USUARIOS"];
				  var titulo_grupo=grupos[i]["NOMBRE"];
				  var estado_grupo=grupos[i]["ESTADO"];
				  var foto_grupo=grupos[i]["FKMULTIMEDIA"]; 
				  if(!isNaN(foto_grupo)){
						foto_grupo="../img/icons/png/grupo.png";
				  }
				  var id_grupo=grupos[i]["ID"]; 
				  
				  var ya_se_unio=0;
					for(var j=0;j<grupos_ya_unido.length;j++){
						if(grupos[i]["ID"]==grupos_ya_unido[j]["ID"]){
							ya_se_unio=1;
						}
					}
				  
				  
					
					if(!ya_se_unio){
						 /* modal de mapa */
						  infowindow.push(new google.maps.InfoWindow({ 
							content: '<div class="informacion"><img alt="'+estado_grupo+'" src="../img/icons/png/'+estado_grupo.toLowerCase()+'-mini.png"></img><img alt="imagen de grupo" src="'+foto_grupo+'"></img><h3>'+titulo_grupo+'</h3><p>Usuarios: '+cantidad_usuarios+'</p><input type="button" id="'+id_grupo+'" value="Unirme" class="form-control btn btn-default"></input></div>'
						  }));  
					}
					else{ //ya pertenece a este grupo, saco el input para que no se pueda unir nuevamente
						  /* modal de mapa */
						  infowindow.push(new google.maps.InfoWindow({ 
							content: '<div class="informacion_ya_unido"><img alt="'+estado_grupo+'" src="../img/icons/png/'+estado_grupo.toLowerCase()+'-mini.png"></img><img alt="imagen de grupo" src="'+foto_grupo+'"></img><h3>'+titulo_grupo+'</h3><p>Usuarios: '+cantidad_usuarios+'</p></div>'
						  }));  
					}
				  
			  }
			  
			  //DONDE ESTA EL USUARIO
			  var icon = {
				url: "../img/icons/png/marker-map-orange-mas-2.png", 
				size: new google.maps.Size(100, 100),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(60, 60)
			  };
			  
  
			/* Crear un marker para el lugar donde esta el usuario*/
			  markers.push(new google.maps.Marker({
				map: map,
				icon: icon,
				draggable:true, //el usuario  puede arrastrar el marker
				mas: markers.length,
				title: place.name,
				position: place.geometry.location
			  }));
			  marker_usuario=markers[markers.length];			 
			
			 //boton crear grupo en mapa
			  infowindow.push(new google.maps.InfoWindow({ 
					content: '<div class="informacion"><input type="button" id="0" value="CREAR GRUPO" class="form-control btn btn-default nuevo_grupo"></input></div>'
				}));  
			  
			  if (place.geometry.viewport) {
				bounds.union(place.geometry.viewport);
			  } 
			  else {
				bounds.extend(place.geometry.location);
			  }
		});
			
			map.fitBounds(bounds);
			map.setZoom(15); 
			
			//recorrer todos los markers y generar en el onclick la ventana de informacion de cada grupo
			for(var j=0;j<markers.length;j++){ 
				markers[j].addListener('click', function() {

					marker=this;
					//toggle si es el marker del usuario
					if(this.mas==markers.length-1){
						toggleBounce(this);
					}
					if(infowindow[this.mas]!=undefined){
						//abrir la ventana de informacion 
						infowindow[this.mas].open(map, markers[this.mas]); 
						
						//guardo todas las ventanas de informacion abiertas para ver cual elige el usuario
						var ventana_info=document.getElementsByClassName("informacion");
						for(var i=0;i<ventana_info.length;i++){
							tn(ventana_info[i],"input",0).onclick=function(){
							
								/****************** CREAR GRUPO **********************/
								if(this.id=="0"){					
									/* Saco la lat y la long del marker*/
										var lat=marker.getPosition().lat();
										var lng=marker.getPosition().lng();
										
									/*Guardo todo en un objeto*/
										var position={
											LATITUD : lat,
											LONGITUD : lng
										}
									localStorage.setItem("nuevo_grupo_position",JSON.stringify(position));
									
									/*-------------REDIRECCION A INEDX newGrupo para guardado de datos en bdd---------------*/
									if(localStorage.getItem("nuevo_grupo_position")!=null){
										localStorage.setItem("en_proceso","true");
										window.location.href="/urban-app/index.html#/newGrupo";
									}
								}
								
								/******************** UNIRSE A GRUPO *******************/
								else{
									unir_a_grupo_id=this.id;
									localStorage.setItem("unir_a_grupo_id", unir_a_grupo_id);
									
									/*-------------REDIRECCION A INEDX para guardado de datos en bdd---------------*/
									if(localStorage.getItem("unir_a_grupo_id")!=null){
										window.location.href="/urban-app/index.html#/";
									}
								}
								
								
							}
						
						}
					}
				});
			}

		  });
	  }
	  
	  function toggleBounce(marker) {
		  if (marker.getAnimation() !== null) {
			marker.setAnimation(null);
		  } else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		  }
		}
});
	
