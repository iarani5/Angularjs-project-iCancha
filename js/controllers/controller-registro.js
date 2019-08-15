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
		$scope.valor="Cliente";


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
	
		//Pregunto si el usuario esta editando sus datos
		if($location.path().search("editar")!="-1"){
			union+="&edicion=1";
		}
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
					sacar_botones("sacar");
					$location.path("/");
				}
			}
			
		},function (error){ //ERROR no se pudo establecer la conexion

		});
	}	
			
		
	if($location.path().search("editar")!="-1"){
/* 		rc(document.getElementsByClassName("p-t-115").parentNode,document.getElementsByClassName("p-t-115"));
 */		var usuario_local=angular.fromJson(localStorage.getItem("dts_user")); 
		var datos_registro=tn(tn(document,'form',0),'input');
		
		
		//creo string de * segun cantidad de digitos de clave. Como esta guardado en string lo paso a int al nunmero que busco en el almacenamiento local de la web.
		var cantidad_digitos=parseInt(localStorage.getItem("largo_clave"), 10);
		var largo_clave="";
		for(var i=0;i<cantidad_digitos;i++){
			largo_clave+="*";
		}
		
		$scope.usuario = { 
			NOMBRE: usuario_local.NOMBRE,
			APELLIDO: usuario_local.APELLIDO,
			EMAIL: usuario_local.EMAIL,
			CLAVE: largo_clave,
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
		
		//cambiar nombre de boton a editar
 		tn(tn(document,"form",0),"button",0).innerHTML="Editar";
		
		var divs=tn(tn(document,"form",0),"div");
		rc(divs[divs.length-1].parentNode,divs[divs.length-1]);
		
	} 
});











