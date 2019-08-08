/**************************************** CONTROLLER INDEX ***************************************/
 
iCancha.controller("indexCtrl", function ($location,$http,$scope,$window,$routeParams) {
	
	//me fijo si el usuario ya esta logueado.
	if(localStorage.getItem("dts_user")!=null){ //si ya existen sus datos almacenados en la web. esta logueado.
		var usuario=[];
		usuario=angular.fromJson(localStorage.getItem("dts_user"));
		
		//creo boton en nav-bar con el nombre de usuario
		if(id("nombre_usuario")==undefined){
			li=ce("li");
			li.className="scroll";
			nombre_usuario=ce("a");
			ac(li, nombre_usuario);
			nombre_usuario.href="#!/perfil"; //si se aprieta lo lleva al perfil del usuario.
			nombre_usuario.innerHTML=usuario.NOMBRE;
			nombre_usuario.id="nombre_usuario";
			ac(tn(id("navbar-menu"),"ul",0), li);
		}
		
	}
	else{
		//no hay usuario logueado
	}

});