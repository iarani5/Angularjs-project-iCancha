/**************************************** CONTROLLER REGISTRO ***************************************/
 
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
	
	
	/*
	ID_USUARIO INT(9) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	EMAIL VARCHAR(50) NOT NULL UNIQUE,
	NOMBRE VARCHAR(45) NOT NULL,
	APELLIDO VARCHAR(45) NOT NULL,
	CLAVE VARCHAR(255) NOT NULL,
	TIPO_USUARIO ENUM ('Cliente','Duenio','Propietario','Administrador') DEFAULT 'Cliente',
	FOTO_PERFIL VARCHAR(250) NOT NULL DEFAULT 'iCancha/.img',
	BANNEADO ENUM('Si','No') NOT NULL DEFAULT 'No',
	BORRADO ENUM('Si','No') NOT NULL DEFAULT 'No'
	*/
			datos_usuario={
				EMAIL: usuario.EMAIL,
				NOMBRE: usuario.NOMBRE,
				APELLIDO: usuario.APELLIDO,
				CLAVE: usuario.CLAVE,
				TIPO_USUARIO : usuario.TIPO_USUARIO,
				FOTO_PERFIL : usuario.FOTO_PERFIL,
			}
			
			//falta validacion de datos en onblur y onsubmit
			
				var nombre=datos_usuario["NOMBRE"];
				if(nombre!=undefined){
					nombre.upload = Upload.upload({ //envio de form con file. 
						method: 'POST',
						url:"php/abm/crear.usuario.php", //archivo php para creacion de usuario
						data: datos_usuario,
					})
					.then(function(response){
						if(response.data=="1"){
							
						}
						//valido datos php
						else if(typeof(response.data)=="object"){
							for (var error in response.data){
								for(var i=0;i<inputs_publicacion.length;i++){
									inputs_publicacion[i].style.borderBottom='none';
									var p=inputs_publicacion[i].nextSibling;
									if(p.className=="mensaje-validacion"){
										rc(p.parentNode,p);
									}
									
									if(inputs_publicacion[i].name==error.toLowerCase()){
										validar_publicacion(inputs_publicacion[i]);
									}
								}
							}
						}
						else if(response.data=="formato"){
							for(var i=0;i<inputs_publicacion.length;i++){
								var p=inputs_publicacion[i].nextSibling; 
								if(p.className=="mensaje-validacion"){
									rc(p.parentNode,p);
								}
								if(inputs_publicacion[i].name=="file"){
									validar_publicacion(inputs_publicacion[i]);
								}
							}
						}
						else{
							//modal error
						}
					}
					,function(response){
						//modal error
						
					});
				}
			}
});