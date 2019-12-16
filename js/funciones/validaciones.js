
	function validar_nombre(val){
		var exp=/^[a-záéíóúñ\s]{3,15}$/i;
		return exp.test( val);
	}
	function validar_direccion(val){
		var exp=/^[a-záéíóúñ\s]{3,15}\s[0-9]{1,4}$/i;
		return exp.test( val);
	}
	function validar_precio(val){
		var exp=/^[0-9]{3,4}$/i;
		return exp.test(val);
	}
	function validar_fecha(val){
		var exp=/^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])(\/|\-)(0?[1-9]|1[0-2])(\/|\-)(20[2-9][0-9])$/;
		return exp.test(val);
	}
	function validar_foto(val){
		var exp=/^.+(.jpe?g|.png)$/i;
		return exp.test(val); 
	}
	function validar_email(val){
		var exp=/^([a-zA-Z\d\-\_\.]{3,25}@[a-z]{3,15}\.[a-z]{2,4})?$/;
		return exp.test( val);
	}
	function validar_clave(val){
		var exp=/^([a-zA-Z\d_#,;~@%&\\\!\$\^\*\(\)\-\+\=\{\}\[\]\:\'\\<\>\.\?\|]{3,15})?$/;
		return exp.test( val);
	}

	function validar_form(e){
		switch(e.name){
			case 'nombre': case 'apellido':
				if(!validar_nombre(e.value)){
					if(e.value!==''){
						var tx=txt('Solo letras y espacios. Minimo 3, maximo 15.');
					}
				}
				break;
			case 'direccion':
				if(!validar_direccion(e.value)){
					var tx=txt('La direccion es invalida.');
				}
				break;
			case 'precio':
				if(!validar_precio(e.value)){
					var tx=txt('De 3 a 4 numeros.');
				}
				break;
			case 'email':
				if(!validar_email(e.value)){
					var tx=txt('El email es invalido.');
				}
				break;
			case 'clave':
				if(!validar_clave(e.value)){
					var tx=txt('Minimo 3 caracteres, maximo 15. Sin espacios. No permite <,>,\',",;');
				}
				break;
			case 'clave_nueva':
				if(!validar_clave(e.value)){
					var tx=txt('Minimo 3 caracteres, maximo 15. Sin espacios. No permite <,>,\',",;');
				}
				break;
			case 'telefono':
				if(!validar_telefono(e.value)){
					var tx=txt('El numero es invalido. minimo 8 maximo 15, solo numeros.');
				}
				break;
			case 'dni':
				if(!validar_dni(e.value)){
					var tx=txt('El numero de dni es invalido.');
				}
				break;
			case 'file':
				if(!validar_foto(e.value)){
					var tx=txt('Solo formato jpg, jpeg y png.');
				}
				break;
		}
		if(tx){
			e.style.borderBottom='solid red 1px';
			p=ce('p');
			p.style.color="red";
			p.className='mensaje-validacion';


			if(tx==='Solo formato jpg, jpeg y png.'){
				p.style.float="right";
				p.style.marginTop="3em";
				p.style.paddingRight="1em";
				p.style.display="inline-block";
			}

			ac(p,tx);
			e.parentNode.insertBefore(p,e.nextSibling);
		}
		else{
			e.style.borderBottom='1px solid #aaa';
			var p=e.nextSibling;
			if(p!=null&&p.className==="mensaje-validacion"){
				rc(p.parentNode,p);
			}
		}
	}

