/**************************************** CONTROLLER REGISTRO ***************************************/

//PARA UPLOAD DE IMAGENES
/* iCancha.controller("registroCtrl",  ['$scope', '$http', '$location', 'Upload', '$timeout', function  ($scope, $http, $location, Upload, $timeout) { */  
 
 //*******************************************************************
  //PARA IMPLEMENTACIONES FUTURAS con upload de imagen para usuario
	//OBJETO CON DATOS TRAIDOS DE LA VISTA registro.html
			/* datos_usuario={
				EMAIL: usuario.EMAIL,
				NOMBRE: usuario.NOMBRE,
				APELLIDO: usuario.APELLIDO,
				CLAVE: usuario.CLAVE,
				TIPO_USUARIO : usuario.TIPO_USUARIO,
				FOTO_PERFIL : usuario.FOTO_PERFIL,
			} */
			
			//PARSEAR EL CONENIDO DEL OBJETO A FORMATO PARA SER PASADO POR POST A ARCHIVO PHP
			/* for(var i in datos_usuario){
				item.push( i+'='+datos_usuario[i] ); 
			}
			var union = item.join('&');	
		 *
***********************************************************************/


 iCancha.controller("registroCtrl", function ($location,$http,$scope,$window,$routeParams) {
 

// ****** DISEÑO FORM ****//
var fileInputTextDiv = document.getElementById('file_input_text_div');
var fileInput = document.getElementById('file_input_file');
var fileInputText = document.getElementById('file_input_text');

/* 
fileInput.addEventListener('change', changeInputText);
fileInput.addEventListener('change', changeState);
 */
 
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

//**** TIPO DE USUARIO ****//
	
	$scope.tipo_usuario=[
		{TITULO: "Cliente"},
		{TITULO: "Propietario"},
	];
				

//***** ENVIO DE FORM *****//

	$scope.submit=function(usuario){

		//falta validacion de datos en onblur y onsubmit
		
		//guardo los datos del usuario en formato especifico para pasarlo por el metodo POST a php
		var item = [];
		for(var i in usuario){
			item.push( i+'='+usuario[i] ); 
		}
		var union = item.join('&');	
   
		//REGISTRO USUARIO
		$http({
			method: 'POST',
			url:"php/abm/crear.usuario.php",
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
					$location.path("/");
				}
			}
			
		},function (error){ //ERROR no se pudo establecer la conexion

		});
	}
});