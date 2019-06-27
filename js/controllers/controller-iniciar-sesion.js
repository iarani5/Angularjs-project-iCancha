/**************************************** CONTROLLER INICIAR SESION ***************************************/
 
iCancha.controller("iniciarSesionCtrl", function ($location,$http,$scope,$window,$routeParams) {
	
	//validar inputs en el onblur
	/*var datos_login=tn(tn(document,'form',0),'input');
	for(var i=0;i<datos_login.length;i++){
		datos_login[i].onblur=function(){
			this.style.borderBottom='none';

			var p=this.nextSibling;
			if(p.className=="mensaje-validacion"){
				rc(p.parentNode,p);
			}
			validar_form(this);
		}
	}*/
	
	//envio del form
	$scope.login = function (usuario){
	/*	var datos={
			EMAIL : usuario.EMAIL,
			CLAVE : usuario.CLAVE
		};*/ 
		var item = [];
		var datos_login=tn(tn(document,'form',0),'input');
		for(var i in usuario){
			item.push( i+'='+usuario[i] ); 
		}

		//validar inputs en el submit
		/*var ban=0;
		for(var i=0;i<datos_login.length;i++)
			/*datos_login[i].style.borderBottom='none';
			var p=datos_login[i].nextSibling;
			if(p.className=="mensaje-validacion"){
				rc(p.parentNode,p);
			}
				validar_form(datos_login[i]);
			var p=datos_login[i].nextSibling;
			if(p.className=="mensaje-validacion"){
				ban=1; 
			}
		}
		if(!ban){*/
			var union = item.join('&');	
			//ABM: login
			$http({
				method: 'POST',
				url:"php/abm/login.php",
				data: union,	
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}  
			})
			.then(function (data){//EXITO se establecio la conexion
				if(response.data.constructor != Object){ //error no se guardo en la bdd
					// mensaje de error. vuelva a intentarlo mas tarde.
				}
				else{ //exito
					localStorage.setItem("dts_user",angular.toJson(response.data));
					
				}
				/*if(data.BORRADO=="Si"){
					var p=ce('p');
					p.className='mensaje-validacion';
					p.innerHTML='Usuario Eliminado';
					datos_login[0].parentNode.insertBefore(p,datos_login[0]);
				}
				else if(data.BANNEADO=="Si"){
					var p=ce('p');
					p.className='mensaje-validacion';
					p.innerHTML='Usuario Banneado';
					datos_login[0].parentNode.insertBefore(p,datos_login[0]);
				}
				else if(!isNaN(data.ID)){
					delete data["CLAVE"];
					delete data["DIRECCION"];
					localStorage.setItem("user_urban",JSON.stringify(data));
					//redireccion a home de usuario
					$window.location.href = '/urban-app/index.html';
				}
				else if(data==='Usuario no existente'){
					var p=ce('p');
					p.className='mensaje-validacion';
					p.innerHTML='Mail o contraseĂ±a incorrectos';
					datos_login[0].parentNode.insertBefore(p,datos_login[0]);
				}*/
				console.log(data);
		},function (error){ //ERROR no se pudo establecer la conexion

		});
		//}
	}


});