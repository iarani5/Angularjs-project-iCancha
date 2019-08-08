/****************************************FUNCIONES GLOBALES****************************************/

function ce(e){ //crea elemento
	return document.createElement(e);
}
function ac(p,e){ //lo hace aparecer en la vista
	return p.appendChild(e);
}
function rc(p,e){ //lo elimina de la vista
	return p.removeChild(e);
}
function tn(p,e,n){ //trae elementos de la vista (si no pones ningun numero en los corchetes te trae una array)
	if(!isNaN(n)){
		return p.getElementsByTagName(e)[n];
	}
	return p.getElementsByTagName(e);
}
function id(e){
	return document.getElementById(e);
}
function txt(s){
	return document.createTextNode(s);
}

// FUNCION PARA ITEMS DEL MENU

function sacar_botones(estado){
	if(estado=="sacar"){
		//saco los botones de login, registrarse y como funciona
		var botones=document.getElementsByClassName("sin_usuario");
		for(var i=0;i<botones.length;i++){
			botones[i].style.display="none";
		}
	}
	else{
		var botones=document.getElementsByClassName("sin_usuario");
		for(var i=0;i<botones.length;i++){
			botones[i].style.display="inline-block";
		}
		//elimino boton perfil
		rc(id("nombre_usuario").parentNode,id("nombre_usuario"));
	}
		
}