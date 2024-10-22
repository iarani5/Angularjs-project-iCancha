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

//VARIABLES GLOBALES
 var esta_cancha;
 
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

////////// MENU 

function toggle(element) {
	element.classList.toggle("change");
  }

  
////////// MODAL MENSAJE
function modal_msj(mensaje,boton1){
	var div=document.createElement("div");
	div.className="modal";
	var caja_modal=document.createElement("div");
	var di=document.createElement("div");
	di.className="modal-dialog";
	div.appendChild(di);
	var d=document.createElement("div");
	d.className="modal-content";

	/**cargo mensaje**/
		var p=ce("p");
		p.innerHTML=mensaje;
	//
	
	var btn2=document.createElement("button");
	btn2.type="button";
	btn2.id="cerrar_modal";
	btn2.className="btn btn-lg btn-danger";
	btn2.innerHTML="X";
	btn2.id="cerrar_modal";
	ac(caja_modal,btn2);
	
	d.id="ventana_modal";
	var div2=document.createElement("div");
	div2.className="form-group botones";
	var h4=document.createElement("h4");
	h4.className="modal-header";
	h4.style.textAlign='center';
	caja_modal.className="modal-body";
	d.appendChild(caja_modal);
	di.appendChild(d);
	ac(caja_modal,p);
	/**cargo botones**/
	if(boton1!=undefined){
		var btn1=document.createElement("button");
		btn1.type="button";
		btn1.className="btn btn-lg btn-success";
		btn1.innerHTML=boton1;
		ac(caja_modal,btn1);
	}
	else{
		caja_modal.style.paddingBottom="1em";
	}
	document.getElementsByTagName("body")[0].appendChild(div);
	
	//cerrar modal
	id("cerrar_modal").onclick=function(){
		document.getElementsByTagName("body")[0].removeChild(div);
	} 
}


////////// MODAL HORARIOS
function modal_horarios(horarios){

	var div=document.createElement("div");
	div.className="modal";
	var caja_modal=document.createElement("div");
	var di=document.createElement("div");
	di.className="modal-dialog";
	div.appendChild(di);
	var d=document.createElement("div");
	d.className="modal-content";

	/**cargo horarios**/
	var ul=ce("ul");
	ul.style.paddingLeft="3em";
	for(var i=0; i<horarios.length; i++){
		var li=ce("li");
		li.style.borderBottom="solid 1px #eee";
		li.style.padding=".5em";
		li.innerHTML=horarios[i]["DIA_VALOR"]+" "+horarios[i]["HORA_VALOR"];
		if(horarios[i].ESTADO==="Desocupado"){
			li.className="libre";
			var radio=ce("input");
			radio.type="radio";			
			radio.name="este_horario";
			ac(li,radio);
		}
		else{
			li.className="Ocupado";
		}
		ac(ul,li);
	}

	if(horarios.length===0){
		var p=ce("p");
		p.innerHTML="Aún no hay horarios cargados para esta cancha.";
		ac(caja_modal,p);

	}
	var btn2=document.createElement("button");
	btn2.type="button";
	btn2.id="cerrar_modal";
	btn2.className="btn btn-lg btn-danger";
	btn2.innerHTML="X";
	ac(caja_modal,btn2);
	
	d.id="ventana_modal";
	var div2=document.createElement("div");
	div2.className="form-group botones";
	var h4=document.createElement("h4");
	h4.innerHTML="Listado de horarios";
	h4.className="modal-header";
	h4.style.textAlign='center';
	caja_modal.className="modal-body";
	d.appendChild(caja_modal);
	di.appendChild(d);
	ac(caja_modal,ul);
	
	document.getElementsByTagName("body")[0].appendChild(div);
	
	//cerrar modal
	btn2.onclick=function(){
		rc(div.parentNode,div);
	} 
	
}

