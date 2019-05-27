	function validar_nombre_apellido(val){
		var exp=/^[a-zαινσϊρ\s]+$/i;
		return exp.test( val);
	}
	function validar_fecha(val){
		var exp=/^(0?[1-9]|1[0-9]|2[0-9]|3[0-1])(\/|\-)(0?[1-9]|1[0-2])(\/|\-)(19[2-9][0-9]|2000)$/;
		return exp.test(val);
	}
	function validar_foto(val){
		var exp=/^.+(.jpe?g|.png)$/i;
		return exp.test(val); 
	}
	function validar_email(val){
		var exp=/^([a-zA-Z\d\-\.]{3,25}@[a-z]{3,15}\.[a-z]{2,4})?$/;
		return exp.test( val);
	}
	function validar_clave(val){
		var exp=/^([a-zA-Z\d_#,;~@%&\\\!\$\^\*\(\)\-\+\=\{\}\[\]\:\'\\<\>\.\?\|]{3,15})?$/;
		return exp.test( val);
	}
	function validar_titulo(val){
		var exp=/^([a-zA-Z\d\s_#,;@%&\\\!\$\*\(\)\-\+\=\{\}\[\]\:\'\\<\>\.\?\|]{3,200})?$/;
		return exp.test( val);
	}