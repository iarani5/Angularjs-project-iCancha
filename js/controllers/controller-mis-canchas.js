/**************************************** CONTROLLER MIS CANCHAS ***************************************/
 iCancha.controller("misCanchasCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout','$window', function  ($scope, $http, $location, Upload, $timeout, $window) {

	 var lista_horarios_seleccionados;

	 //********************* LISTAR CANCHAS
	
	$http({
		method: 'POST',
		url: "php/abm/listar.canchas.php",
		headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
	})
	.then(function (response){ //EXITO se establecio la conexion
		if(response.data.length){
			for(var i in response.data){

				//puntaje
				var sum=0;

				for(var j in response.data[i].PUNTAJE){
					sum+=parseInt(response.data[i].PUNTAJE[j].PUNTUACION, 10);
				}
				if(sum) response.data[i].PUNTAJE = (sum/response.data[i].PUNTAJE.length).toFixed(2);
				else response.data[i].PUNTAJE=0;

				//foto
			/*	var foto=response.data[i].FOTO.substring(24,response.data[i].FOTO.length);
				response.data[i].FOTO=foto;*/
			}
			
			$scope.mis_canchas=angular.fromJson(response.data).reverse();
		}
		else{
			$scope.mensaje="Aún no tenes canchas cargadas";
		}

	},function (error){ //ERROR no se pudo establecer la conexion

	});

	 //************ LISTAR HORARIOS CANCHA
	 $scope.listar_horarios=function (id) {

		 $http({
			 method: 'POST',
			 url: "php/abm/listar.horarios.cancha.php",
			 data: "FK_ID_CANCHA="+id,
			 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		 })
			 .then(function (response){//EXITO se establecio la conexion
					modal_horarios(angular.fromJson(response.data));
			 },function (error){ //ERROR no se pudo establecer la conexion

			 });

	 };

	//************* ELIMINAR CANCHA
	$scope.eliminar_cancha=function(id){
		$http({
			method: 'POST',
			url: "php/abm/eliminar.cancha.php",
			data: "ID_CANCHA="+id,			 
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.then(function (response){
			if(response.data==="1"){
				alert("cancha eliminada con éxito");
				$window.location.reload();
			}
		},function (error){ //ERROR no se pudo establecer la conexion

		});
	};
	
	$scope.titulo_formulario="Crear cancha";

	//************************ EDITAR CANCHA
	$scope.editar_cancha=function(cancha){

		$scope.titulo_formulario="Editar cancha";
		window.scrollTo(300, 0);

		//la guardo en variable global para acceder a su posicion con google maps
		localStorage.setItem("esta_cancha",angular.toJson(cancha));

		// LISTA HORARIOS

		$http({
			method: 'POST',
			url: "php/abm/listar.horarios.cancha.php",
			data: "FK_ID_CANCHA="+cancha.ID_CANCHA,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.then(function (response){ //EXITO se establecio la conexion

				$scope.cancha_editar={
					ID_CANCHA: cancha.ID_CANCHA,
					NOMBRE: cancha.NOMBRE_CANCHA,
					TIPO_CANCHA: cancha.TIPO_CANCHA,
					BARRIO: cancha.BARRIO,
					DIRECCION: cancha.DIRECCION,
					PRECIO: parseInt(cancha.PRECIO, 10),
				};

				var lis = tn(tn(id("horarios_de_cancha"),"ul",0),"li");
				for(var i=0; i < lis.length; i++){
					for (const val in response.data) {
						if(response.data[val]["DIA"]+""+response.data[val]["HORA"]==tn(lis[i],"input",0).id) tn(lis[i],"input",0).checked = true;
					}
				}

			},function (error){ //ERROR no se pudo establecer la conexion

			});


	};

	 $scope.editar_esta_cancha=function(cancha_editar){

		 //validar inputs en el submit
		 var datos_registro=tn(id('editar'),'input');

		 var ban=0;

		 for(var i=0;i<datos_registro.length;i++){

			 datos_registro[i].style.borderBottom='none';
			 var p=datos_registro[i].nextSibling;

			 if(p.className==="mensaje-validacion"){
				 rc(p.parentNode,p);
			 }
			 validar_form(datos_registro[i]);
			 var p=datos_registro[i].nextSibling;
			 if(p.className==="mensaje-validacion"){
				 ban=1;
			 }
		 }

		 if(!ban) {
			 var lunes = [], martes = [], miercoles = [], jueves = [], viernes = [], sabado = [], domingo = [];

			 var lis = tn(tn(id("horarios_de_cancha"), "ul", 0), "li");

			 for (var i = 0; i < lis.length; i++) {
				 if (tn(lis[i], "input", 0).checked === true) {
					 var hora = tn(lis[i], "input", 0).id.substring(1, tn(lis[i], "input", 0).id.length);
					 switch (tn(lis[i], "input", 0).id[0]) {
						 case "1":
							 lunes.push(hora);
							 break;
						 case "2":
							 martes.push(hora);
							 break;
						 case "3":
							 miercoles.push(hora);
							 break;
						 case "4":
							 jueves.push(hora);
							 break;
						 case "5":
							 viernes.push(hora);
							 break;
						 case "6":
							 sabado.push(hora);
							 break;
						 case "7":
							 domingo.push(hora);
							 break;
					 }
				 }
			 }


			 //cancha

			 //guardo los datos del usuario en formato especifico para pasarlo por el metodo POST a php
			 var item = [];
			 for (var i in cancha_editar) {
				 item.push(i + '=' + cancha_editar[i]);
			 }

			 var horas_dias=[];
			 item.push("1" + '=' + lunes);
			 item.push("2" + '=' + martes);
			 item.push("3" + '=' + miercoles);
			 item.push("4" + '=' + jueves);
			 item.push("5" + '=' + viernes);
			 item.push("6" + '=' + sabado);
			 item.push("7" + '=' + domingo);

			 var datos_cancha = item.join('&');

			 $http({
				 method: 'POST',
				 url: "php/abm/editar.cancha.php",
				 data: datos_cancha,
				 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			 })
				 .then(function (response) {
					 if (response.data == "1") {
						 alert("cancha editada con éxito");
						 $window.location.reload();
					 }
				 }, function (error) { //ERROR no se pudo establecer la conexion

				 });
		 }
	 };


	 //*********************** HORARIOS

	 $(document).ready(function () {
		 "use strict";
		 var pluginName = "selectionator";
		 var defaults = {
			 propertyName: "selectionator",
			 src: null,
			 orgElement: null,
			 checkedItems: [],
			 // custom callback events
			 onError: function(error) {}
		 };
		 function Plugin(element, options) {
			 this.element = element;
			 this.selector = null;
			 this.options = $.extend({}, defaults, options);
			 this._defaults = defaults;
			 this._name = pluginName;
			 this.init();
		 }
		 Plugin.prototype = {
			 init: function () {
				 var that = this;
				 var self = $(that.element);
				 that.options.src = that.element.getAttribute('data-src');
				 that.selector = that.createFromJson(that.options.data);
				 that.options.orgElement = that.element.parentNode.replaceChild(that.selector, that.element);
				 $(that.selector).addClass(that._name);
			 },
			 createFromJson: function(options) {
				 var that = this;
				 var select = document.createElement('select');
				 var popup = document.createElement('div');
				 var header = document.createElement('div');
				 var search = document.createElement('span');
				 var overlay = document.createElement('span');
				 overlay.className = 'overlay';
				 var shadow = document.createElement('span');
				 shadow.className = 'shadow';
				 var placeholder = document.createTextNode('Dias y horas');
				 search.className = 'search';
				 search.appendChild(shadow);
				 search.appendChild(overlay);
				 search.appendChild(placeholder);
				 popup.appendChild(search);
				 var menu = document.createElement('ul');
				 select.style.display = 'none';
				 menu.className = 'list';
				 var box = document.createElement('div');
				 box.className = 'menu';
				 box.appendChild(menu);
				 popup.appendChild(box);
				 options.optgroups.forEach(function(optgroup, index) {

					 var menuItem = document.createElement('li');
					 //menuItem.className('header');
					 var header = document.createElement('span');
					 header.className = 'header';
					 var caption = document.createTextNode(optgroup.label);
					 header.appendChild(caption);
					 menuItem.appendChild(header);
					 var menuItems = document.createElement('ul');
					 menuItems.className = 'optgroup';
					 menuItem.appendChild(menuItems);
					 menu.appendChild(menuItem);

					 optgroup.options.forEach(function(option, index) {
						 var opt = new Option(option.HORA, option.ID, option.defaultSelected, option.selected);
						 select.options.add(opt);
						 var item = document.createElement('li');
						 var label = document.createElement('label');
						 label.setAttribute("for", option.ID);
						 var checkbox = document.createElement('input');
						 $(checkbox).data(option);
						 checkbox.setAttribute('type', 'checkbox');

						 checkbox.addEventListener('change', function(event){
							 var checkbox = event.target;
							 var $el = $(event.srcElement);
							 if (checkbox.checked) {
								 that.options.checkedItems.push(event.srcElement);
								// placeholder.nodeValue = "Cantidad: " + that.options.checkedItems.length + " de " + $(that.selector).find('input[type="checkbox"]').length;

							 } else {
								 that.options.checkedItems.pop();
								 that.options.checkedItems = that.options.checkedItems.filter(function(items, index){
									 return items.value != $el.data().value;
								 });
								 //placeholder.nodeValue = "Cantidad: " + that.options.checkedItems.length + " de " + $(that.selector).find('input[type="checkbox"]').length;
							 }
							 lista_horarios_seleccionados=that.options.checkedItems;
						 });
						 checkbox.id = option.ID;
						 var caption = document.createTextNode(option.HORA);
						 label.appendChild(caption);
						 item.appendChild(checkbox);
						 item.appendChild(label);
						 menuItems.appendChild(item);
					 });
				 });
				 return popup;
			 },
			 onAddFriend: function(data) {
				 var that = this;
				 return that.options.onAddFriend(that, data);
			 },
			 onRemoveFriend: function(data){
				 var that = this;
				 var self = $(that.element);
				 return that.options.onRemoveFriend(data);
			 },
			 destroy: function() {
				 var that = this;
				 $(that.element).unbind("destroyed", that.teardown);
				 that.teardown();
			 },
			 teardown: function() {
				 var that = this;
				 $(that.element).removeClass(that._name);
				 $(that.selector).replaceWith(that.options.orgElement);
				 $(that.element).removeData(that._name);
				 that.unbind();
				 that.element = null;
			 },
			 bind: function() { },
			 unbind: function() { }
		 };
		 $.fn[pluginName] = function (options) {
			 return this.each(function () {
				 if (!$.data(this, pluginName)) {
					 $.data(this, pluginName, new Plugin(this, options));
				 }
			 });
		 };
	 });
	 $(document).ready(function () {
		 $('#select').selectionator({
			 data: {
				 optgroups: [{
					 label: 'Lunes',
					 options: [
						 { ID: 1_1, HORA: "7:00am a 8:00am"},
						 { ID: 1_2, HORA: "8:00am a 9:00am"},
						 { ID: 1_3, HORA: "9:00am a 10:00am"},
						 { ID: 1_4, HORA: "10:00am a 11:00am"},
						 { ID: 1_5, HORA: "11:00am a 12:00pm"},
						 { ID: 1_6, HORA: "12:00pm a 1:00pm"},
						 { ID: 1_7, HORA: "1:00pm a 2:00pm"},
						 { ID: 1_8, HORA: "2:00pm a 3:00pm"},
						 { ID: 1_9, HORA: "3:00pm a 4:00pm"},
						 { ID: 1_10, HORA: "4:00pm a 5:00pm"},
						 { ID: 1_11, HORA: "5:00pm a 6:00pm"},
						 { ID: 1_12, HORA: "6:00pm a 7:00pm"},
						 { ID: 1_13, HORA: "7:00pm a 8:00pm"},
						 { ID: 1_14, HORA: "8:00pm a 9:00pm"},
						 { ID: 1_15, HORA: "9:00pm a 10:00pm"},
						 { ID: 1_16, HORA: "10:00pm a 11:00pm"},
						 { ID: 1_17, HORA: "11:00pm a 12:00am"},
						 { ID: 1_18, HORA: "12:00am a 1:00am"}
					 ]
				 }, {
					 label: 'Martes',
					 options: [
						 { ID: 2_1, HORA: "7:00am a 8:00am"},
						 { ID: 2_2, HORA: "8:00am a 9:00am"},
						 { ID: 2_3, HORA: "9:00am a 10:00am"},
						 { ID: 2_4, HORA: "10:00am a 11:00am"},
						 { ID: 2_5, HORA: "11:00am a 12:00pm"},
						 { ID: 2_6, HORA: "12:00pm a 1:00pm"},
						 { ID: 2_7, HORA: "1:00pm a 2:00pm"},
						 { ID: 2_8, HORA: "2:00pm a 3:00pm"},
						 { ID: 2_9, HORA: "3:00pm a 4:00pm"},
						 { ID: 2_10, HORA: "4:00pm a 5:00pm"},
						 { ID: 2_11, HORA: "5:00pm a 6:00pm"},
						 { ID: 2_12, HORA: "6:00pm a 7:00pm"},
						 { ID: 2_13, HORA: "7:00pm a 8:00pm"},
						 { ID: 2_14, HORA: "8:00pm a 9:00pm"},
						 { ID: 2_15, HORA: "9:00pm a 10:00pm"},
						 { ID: 2_16, HORA: "10:00pm a 11:00pm"},
						 { ID: 2_17, HORA: "11:00pm a 12:00am"},
						 { ID: 2_18, HORA: "12:00am a 1:00am"}
					 ]
				 }, {
					 label: 'Miercoles',
					 options: [
						 { ID: 3_1, HORA: "7:00am a 8:00am"},
						 { ID: 3_2, HORA: "8:00am a 9:00am"},
						 { ID: 3_3, HORA: "9:00am a 10:00am"},
						 { ID: 3_4, HORA: "10:00am a 11:00am"},
						 { ID: 3_5, HORA: "11:00am a 12:00pm"},
						 { ID: 3_6, HORA: "12:00pm a 1:00pm"},
						 { ID: 3_7, HORA: "1:00pm a 2:00pm"},
						 { ID: 3_8, HORA: "2:00pm a 3:00pm"},
						 { ID: 3_9, HORA: "3:00pm a 4:00pm"},
						 { ID: 3_10, HORA: "4:00pm a 5:00pm"},
						 { ID: 3_11, HORA: "5:00pm a 6:00pm"},
						 { ID: 3_12, HORA: "6:00pm a 7:00pm"},
						 { ID: 3_13, HORA: "7:00pm a 8:00pm"},
						 { ID: 3_14, HORA: "8:00pm a 9:00pm"},
						 { ID: 3_15, HORA: "9:00pm a 10:00pm"},
						 { ID: 3_16, HORA: "10:00pm a 11:00pm"},
						 { ID: 3_17, HORA: "11:00pm a 12:00am"},
						 { ID: 3_18, HORA: "12:00am a 1:00am"}
					 ]
				 }, {
					 label: 'Jueves',
					 options: [
						 { ID: 4_1, HORA: "7:00am a 8:00am"},
						 { ID: 4_2, HORA: "8:00am a 9:00am"},
						 { ID: 4_3, HORA: "9:00am a 10:00am"},
						 { ID: 4_4, HORA: "10:00am a 11:00am"},
						 { ID: 4_5, HORA: "11:00am a 12:00pm"},
						 { ID: 4_6, HORA: "12:00pm a 1:00pm"},
						 { ID: 4_7, HORA: "1:00pm a 2:00pm"},
						 { ID: 4_8, HORA: "2:00pm a 3:00pm"},
						 { ID: 4_9, HORA: "3:00pm a 4:00pm"},
						 { ID: 4_10, HORA: "4:00pm a 5:00pm"},
						 { ID: 4_11, HORA: "5:00pm a 6:00pm"},
						 { ID: 4_12, HORA: "6:00pm a 7:00pm"},
						 { ID: 4_13, HORA: "7:00pm a 8:00pm"},
						 { ID: 4_14, HORA: "8:00pm a 9:00pm"},
						 { ID: 4_15, HORA: "9:00pm a 10:00pm"},
						 { ID: 4_16, HORA: "10:00pm a 11:00pm"},
						 { ID: 4_17, HORA: "11:00pm a 12:00am"},
						 { ID: 4_18, HORA: "12:00am a 1:00am"}
					 ]
				 }, {
					 label: 'Viernes',
					 options: [
						 { ID: 5_1, HORA: "7:00am a 8:00am"},
						 { ID: 5_2, HORA: "8:00am a 9:00am"},
						 { ID: 5_3, HORA: "9:00am a 10:00am"},
						 { ID: 5_4, HORA: "10:00am a 11:00am"},
						 { ID: 5_5, HORA: "11:00am a 12:00pm"},
						 { ID: 5_6, HORA: "12:00pm a 1:00pm"},
						 { ID: 5_7, HORA: "1:00pm a 2:00pm"},
						 { ID: 5_8, HORA: "2:00pm a 3:00pm"},
						 { ID: 5_9, HORA: "3:00pm a 4:00pm"},
						 { ID: 5_10, HORA: "4:00pm a 5:00pm"},
						 { ID: 5_11, HORA: "5:00pm a 6:00pm"},
						 { ID: 5_12, HORA: "6:00pm a 7:00pm"},
						 { ID: 5_13, HORA: "7:00pm a 8:00pm"},
						 { ID: 5_14, HORA: "8:00pm a 9:00pm"},
						 { ID: 5_15, HORA: "9:00pm a 10:00pm"},
						 { ID: 5_16, HORA: "10:00pm a 11:00pm"},
						 { ID: 5_17, HORA: "11:00pm a 12:00am"},
						 { ID: 5_18, HORA: "12:00am a 1:00am"}
					 ]
				 }, {
					 label: 'Sabado',
					 options: [
						 { ID: 6_1, HORA: "7:00am a 8:00am"},
						 { ID: 6_2, HORA: "8:00am a 9:00am"},
						 { ID: 6_3, HORA: "9:00am a 10:00am"},
						 { ID: 6_4, HORA: "10:00am a 11:00am"},
						 { ID: 6_5, HORA: "11:00am a 12:00pm"},
						 { ID: 6_6, HORA: "12:00pm a 1:00pm"},
						 { ID: 6_7, HORA: "1:00pm a 2:00pm"},
						 { ID: 6_8, HORA: "2:00pm a 3:00pm"},
						 { ID: 6_9, HORA: "3:00pm a 4:00pm"},
						 { ID: 6_10, HORA: "4:00pm a 5:00pm"},
						 { ID: 6_11, HORA: "5:00pm a 6:00pm"},
						 { ID: 6_12, HORA: "6:00pm a 7:00pm"},
						 { ID: 6_13, HORA: "7:00pm a 8:00pm"},
						 { ID: 6_14, HORA: "8:00pm a 9:00pm"},
						 { ID: 6_15, HORA: "9:00pm a 10:00pm"},
						 { ID: 6_16, HORA: "10:00pm a 11:00pm"},
						 { ID: 6_17, HORA: "11:00pm a 12:00am"},
						 { ID: 6_18, HORA: "12:00am a 1:00am"}
					 ]
				 }, {
					 label: 'Domingo',
					 options: [
						 { ID: 7_1, HORA: "7:00am a 8:00am"},
						 { ID: 7_2, HORA: "8:00am a 9:00am"},
						 { ID: 7_3, HORA: "9:00am a 10:00am"},
						 { ID: 7_4, HORA: "10:00am a 11:00am"},
						 { ID: 7_5, HORA: "11:00am a 12:00pm"},
						 { ID: 7_6, HORA: "12:00pm a 1:00pm"},
						 { ID: 7_7, HORA: "1:00pm a 2:00pm"},
						 { ID: 7_8, HORA: "2:00pm a 3:00pm"},
						 { ID: 7_9, HORA: "3:00pm a 4:00pm"},
						 { ID: 7_10, HORA: "4:00pm a 5:00pm"},
						 { ID: 7_11, HORA: "5:00pm a 6:00pm"},
						 { ID: 7_12, HORA: "6:00pm a 7:00pm"},
						 { ID: 7_13, HORA: "7:00pm a 8:00pm"},
						 { ID: 7_14, HORA: "8:00pm a 9:00pm"},
						 { ID: 7_15, HORA: "9:00pm a 10:00pm"},
						 { ID: 7_16, HORA: "10:00pm a 11:00pm"},
						 { ID: 7_17, HORA: "11:00pm a 12:00am"},
						 { ID: 7_18, HORA: "12:00am a 1:00am"}
					 ]
				 }]
			 }

		 });
		 setTimeout(function(){
			 $(".selectionator").addClass('opened');
		 }, 500);
		 setTimeout(function(){
			 $(".selectionator").removeClass('opened');
		 }, 1250);
	 });

	 $scope.listado_horarios=[
		 { ID: 1, HORA: "7:00am a 8:00am"},
		 { ID: 2, HORA: "8:00am a 9:00am"},
		 { ID: 3, HORA: "9:00am a 10:00am"},
		 { ID: 4, HORA: "10:00am a 11:00am"},
		 { ID: 5, HORA: "11:00am a 12:00pm"},
		 { ID: 6, HORA: "12:00pm a 1:00pm"},
		 { ID: 7, HORA: "1:00pm a 2:00pm"},
		 { ID: 8, HORA: "2:00pm a 3:00pm"},
		 { ID: 9, HORA: "3:00pm a 4:00pm"},
		 { ID: 10, HORA: "4:00pm a 5:00pm"},
		 { ID: 11, HORA: "5:00pm a 6:00pm"},
		 { ID: 12, HORA: "6:00pm a 7:00pm"},
		 { ID: 13, HORA: "7:00pm a 8:00pm"},
		 { ID: 14, HORA: "8:00pm a 9:00pm"},
		 { ID: 15, HORA: "9:00pm a 10:00pm"},
		 { ID: 16, HORA: "10:00pm a 11:00pm"},
		 { ID: 17, HORA: "11:00pm a 12:00am"},
		 { ID: 18, HORA: "12:00am a 1:00am"},
	 ];

	 //*************************** CREAR CANCHA

	 $scope.barrios=[
		 { TITULO: "Agronomía" },
		 { TITULO: "Almagro" },
		 { TITULO: "Balvanera" },
		 { TITULO: "Barracas" },
		 { TITULO: "Belgrano" },
		 { TITULO: "Boedo" },
		 { TITULO: "Caballito" },
		 { TITULO: "Chacarita" },
		 { TITULO: "Coghlan" },
		 { TITULO: "Colegiales" },
		 { TITULO: "Constitución" },
		 { TITULO: "Flores" },
		 { TITULO: "Floresta" },
		 { TITULO: "La Boca" },
		 { TITULO: "La Paternal" },
		 { TITULO: "Liniers" },
		 { TITULO: "Mataderos" },
		 { TITULO: "Monte Castro" },
		 { TITULO: "Monserrat" },
		 { TITULO: "Nueva Pompeya" },
		 { TITULO: "Núñez" },
		 { TITULO: "Palermo" },
		 { TITULO: "Parque Avellaneda" },
		 { TITULO: "Parque Chacabuco" },
		 { TITULO: "Parque Chas" },
		 { TITULO: "Parque Patricios" },
		 { TITULO: "Puerto Madero" },
		 { TITULO: "Recoleta" },
		 { TITULO: "Retiro" },
		 { TITULO: "Saavedra" },
		 { TITULO: "San Cristóbal" },
		 { TITULO: "San Nicolás" },
		 { TITULO: "San Telmo" },
		 { TITULO: "Vélez Sársfield" },
		 { TITULO: "Versalles" },
		 { TITULO: "Villa Crespo" },
		 { TITULO: "Villa del Parque" },
		 { TITULO: "Villa Devoto" },
		 { TITULO: "Villa General Mitre" },
		 { TITULO: "Villa Lugano" },
		 { TITULO: "Villa Luro" },
		 { TITULO: "Villa Ortúzar" },
		 { TITULO: "Villa Pueyrredón" },
		 { TITULO: "Villa Real" },
		 { TITULO: "Villa Riachuelo" },
		 { TITULO: "Villa Santa Rita" },
		 { TITULO: "Villa Soldati" },
		 { TITULO: "Villa Urquiza" }

	 ];

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

		//validar inputs en el submit
		var datos_registro=tn(id('crear'),'input');

		var ban=0;
		for(var i=0;i<datos_registro.length;i++){

			datos_registro[i].style.borderBottom='none';
			var p=datos_registro[i].nextSibling;

			if(p.className==="mensaje-validacion"){
				rc(p.parentNode,p);
			}
			validar_form(datos_registro[i]);
			var p=datos_registro[i].nextSibling;
			if(p.className==="mensaje-validacion"){
				ban=1;
			}
		}

		if(!ban) {

			var lunes=[], martes=[],miercoles=[],jueves=[],viernes=[],sabado=[],domingo=[];

			if(lista_horarios_seleccionados===undefined){
				alert("Completa el horario de disponiblidad de la cancha");
			}
			else {
				for (var i = 0; i < lista_horarios_seleccionados.length; i++) {

					var hora = lista_horarios_seleccionados[i].id.substring(1, lista_horarios_seleccionados[i].id.length);
					switch (lista_horarios_seleccionados[i].id[0]) {
						case "1":
							lunes.push(hora);
							break;
						case "2":
							martes.push(hora);
							break;
						case "3":
							miercoles.push(hora);
							break;
						case "4":
							jueves.push(hora);
							break;
						case "5":
							viernes.push(hora);
							break;
						case "6":
							sabado.push(hora);
							break;
						case "7":
							domingo.push(hora);
							break;
					}
				}

				var horas_dias = [lunes, martes, miercoles, jueves, viernes, sabado, domingo];

				//cancha
				var datos_cancha = {
					NOMBRE_CANCHA: cancha.NOMBRE,
					FOTO: cancha.FOTO,
					TIPO_CANCHA: cancha.TIPO_CANCHA,
					DIRECCION: cancha.DIRECCION,
					BARRIO: cancha.BARRIO,
					PRECIO: cancha.PRECIO,
					PUNTAJE: "0",
					HORARIOS: horas_dias
				};

				var url;

				if ($scope.titulo_formulario === "Editar cancha") {
					url = "php/abm/editar.cancha.php";
				} else {
					url = "php/abm/crear.cancha.php";
				}
				if (cancha.FOTO !== undefined) {
					cancha.FOTO.upload = Upload.upload({
						method: 'POST',
						url: url,
						data: datos_cancha,
					})
						.then(function (response) {
							if (response.data === "1") {
									modal_msj("Cancha creada con éxito!");
									window.location.reload();
								}
							}
							, function (response) {
								//modal error
							});
				}
			}
		}
	}

}]);
