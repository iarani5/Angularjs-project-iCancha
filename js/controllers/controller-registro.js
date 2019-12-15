/**************************************** CONTROLLER REGISTRO ***************************************/


 iCancha.controller("registroCtrl", function ($location,$http,$scope,$window,$routeParams) {
 
$scope.titulo="Registro";

// ****** DISEÑO FORM ****//
var fileInputTextDiv = document.getElementById('file_input_text_div');
var fileInput = document.getElementById('file_input_file');
var fileInputText = document.getElementById('file_input_text');

function changeInputText() {
  var str = fileInput.value;
  var i;
  if (str.lastIndexOf('\\')) {
    i = str.lastIndexOf('\\') + 1;
  } else if (str.lastIndexOf('/')) {
    i = str.lastIndexOf('/') + 1;
  }
  fileInputText.value = str.slice(i, str.length);
}

function changeState() {
  if (fileInputText.value.length != 0) {
    if (!fileInputTextDiv.classList.contains("is-focused")) {
      fileInputTextDiv.classList.add('is-focused');
    }
  } else {
    if (fileInputTextDiv.classList.contains("is-focused")) {
      fileInputTextDiv.classList.remove('is-focused');
    }
  }
}
	$scope.valor="Cliente";


//**** TIPO DE USUARIO ****//
	
	$scope.tipo_usuario=[
		{TITULO: "Cliente"},
		{TITULO: "Propietario"},
	];

//***** ENVIO DE FORM *****//

	$scope.submit=function(usuario){		
	
		//guardo los datos del usuario en formato especifico para pasarlo por el metodo POST a php
		var item = [];
		for(var i in usuario){
			item.push( i+'='+usuario[i] ); 
		}
		var union = item.join('&');	
		
		//Pregunto si el usuario esta editando sus datos
		if($location.path().search("editar")!="-1"){
			var enlace = "php/abm/editar.usuario.php";
		}
		else{
			var enlace = "php/abm/crear.usuario.php";
		}

		//ABM USUARIO
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
					if(enlace == "php/abm/editar.usuario.php"){
						localStorage.setItem("dts_user",angular.toJson(response.data));

						if(tn(tn(document,"form",0),"input",3).value!=""){
							function mensaje() {
								modal_msj("Datos editados con éxito"); 
							} setTimeout(mensaje,3000); 
							mensaje();
						}						
						$window.location.reload();
					}
					else{
						//paso el objeto a formato json para almacenarlo en la memoria local del browser
						localStorage.setItem("dts_user",angular.toJson(response.data));
						sacar_botones("sacar");
						//redirijo a home porque ya me loguea en el sistema una vez creado el usuario.
						$location.path("/");
					}
				}
			
		},function (error){ //ERROR no se pudo establecer la conexion

		});
	}
		
	if($location.path().search("editar")!="-1"){

		$scope.titulo="Editar datos";

		var usuario_local=angular.fromJson(localStorage.getItem("dts_user")); 
		
		$scope.usuario = { 
			NOMBRE: usuario_local.NOMBRE,
			APELLIDO: usuario_local.APELLIDO,
			EMAIL: usuario_local.EMAIL,
		};
		
		//hago que los inputs de emial y nivel de usuario no sean editables
		document.getElementById("defaultForm-email").readOnly = true;
		var select=tn(document,"select",0);
		var tipo_usr=ce("p");
		tipo_usr.innerHTML=usuario_local.TIPO_USUARIO;
		select.parentNode.style.width="100%";
		tipo_usr.style.cssFloat="right";
 		ac(select.parentNode,tipo_usr);
		select.style.display="none";
		
		tn(tn(document,"form",0),"input",3).placeholder="Nueva clave";
		tn(tn(document,"form",0),"input",3).required = false;
		
		//cambiar nombre de boton a editar
 		tn(tn(document,"form",0),"button",0).innerHTML="Guardar";
		
		var divs=tn(tn(document,"form",0),"div");
		rc(divs[divs.length-1].parentNode,divs[divs.length-1]);	
	}


	/***** EDIA CLAVE *****/
	 $scope.mostrar_formulario = function() {
		 $scope.mostrar_form = true;
	 };

	 $scope.cambiar_clave = function(claves) {
		 // ver si coincide la clave actual
		 var usuario_local=angular.fromJson(localStorage.getItem("dts_user"));


		 if(usuario_local.CLAVE==claves.CLAVE_ACTUAL){
			 var ban=0;
			 id("clave_futura").style.borderBottom='none';
			 var p=id("clave_futura").nextSibling;
			 if(p.className==="mensaje-validacion"){
				 rc(p.parentNode,p);
			 }
			 validar_form(id("clave_futura"));
			 var p=id("clave_futura").nextSibling;
			 if(p.className==="mensaje-validacion"){
				 ban=1;
			 }
			 if(!ban) {
				 $http({
					 method: 'POST',
					 url: "php/abm/editar.clave.php",
					 data: "CLAVE="+id("clave_futura").value,
					 headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				 })
					 .then(function (response) {
					 	console.log(response.data);
						 if(response.data === "1"){
							 var user_actual = angular.fromJson(localStorage.getItem("dts_user"));
							 user_actual.CLAVE = id("clave_futura").value;
							 localStorage.setItem("dts_user", angular.toJson(user_actual));
							 $scope.mostrar_form = false;
							 modal_msj("Clave actualizada con exito");
						 }

					 }, function (error) { //ERROR no se pudo establecer la conexion

					 });
			 }
		 }
		 else{
			 modal_msj("La clave actual no coincide");
		 }
	 };
});











